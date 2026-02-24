import type { Payload, PayloadRequest, File } from "payload";
import fs from "fs";
import path from "path";

const readData = (collection: string) => {
  const dataPath = path.resolve(
    process.cwd(),
    `src/endpoints/seed/data/${collection}.json`,
  );
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};

const getFileBuffer = (filename: string): File | null => {
  const filePath = path.resolve(
    process.cwd(),
    `src/endpoints/seed/images/${filename}`,
  );
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);

  return {
    name: filename,
    data: buffer,
    mimetype: `image/${filename.split(".").pop()}`,
    size: buffer.byteLength,
  };
};

const getIdMapPath = () =>
  path.resolve(process.cwd(), "src/endpoints/seed/data/id-map.json");

const readIdMap = () => {
  const p = getIdMapPath();
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf-8"));
};

const writeIdMap = (map: any) => {
  fs.writeFileSync(getIdMapPath(), JSON.stringify(map, null, 2));
};

const resolveIDs = (obj: any, idMap: any): any => {
  if (Array.isArray(obj)) return obj.map((item) => resolveIDs(item, idMap));
  if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const [key, val] of Object.entries(obj)) {
      if (val !== null && typeof val === "object") {
        newObj[key] = resolveIDs(val, idMap);
      } else if (typeof val === "number") {
        if (
          [
            "media",
            "image",
            "logo",
            "logoDark",
            "logoLight",
            "mainImage",
          ].includes(key) &&
          idMap["media"]?.[val]
        ) {
          newObj[key] = idMap["media"][val];
        } else if (
          ["chapter", "chapters"].includes(key) &&
          idMap["chapters"]?.[val]
        ) {
          newObj[key] = idMap["chapters"][val];
        } else if (
          ["form", "contactForm"].includes(key) &&
          idMap["forms"]?.[val]
        ) {
          newObj[key] = idMap["forms"][val];
        } else {
          newObj[key] = val;
        }
      } else {
        newObj[key] = val;
      }
    }
    return newObj;
  }
  return obj;
};

export const seed = async ({
  payload,
  req,
  collection,
}: {
  payload: Payload;
  req: PayloadRequest;
  collection?: string;
}): Promise<void> => {
  payload.logger.info(
    `Seeding database... Requested collection: ${collection || "all"}`,
  );

  const availableCollections = [
    "media",
    "forms",
    "pages",
    "divisions",
    "chapters",
    "projects",
  ];
  const collectionsToSeed = collection ? [collection] : availableCollections;

  // If seeding from scratch (media is first), clear the ID map
  if (collectionsToSeed.includes("media") && collectionsToSeed.length === 1) {
    writeIdMap({});
  } else if (!collection) {
    writeIdMap({});
  }

  const idMap = readIdMap();

  for (const coll of collectionsToSeed) {
    if (!availableCollections.includes(coll)) {
      payload.logger.warn(`Collection ${coll} is not supported for seeding.`);
      continue;
    }

    payload.logger.info(`— Seeding ${coll}...`);

    try {
      await payload.db.deleteMany({ collection: coll as any, req, where: {} });
    } catch (e) {
      payload.logger.error(`Error deleting ${coll}: ${e}`);
    }

    const docs = readData(coll);
    if (!docs.length) {
      payload.logger.info(`No data found for ${coll}. Skipping.`);
      continue;
    }

    if (!idMap[coll]) idMap[coll] = {};

    for (const doc of docs) {
      const {
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        id: oldId,
        ...rawDocData
      } = doc;

      // Resolve relational IDs
      const docData = resolveIDs(rawDocData, idMap);

      let fileData: File | null = null;
      if (coll === "media" && docData.filename) {
        fileData = getFileBuffer(docData.filename);
      }

      try {
        const created = await payload.create({
          collection: coll as any,
          req,
          data: docData,
          ...(fileData ? { file: fileData } : {}),
        });

        // Map old ID to new ID
        idMap[coll][oldId] = created.id;
      } catch (e) {
        payload.logger.error(`Failed to create doc ${oldId} in ${coll}: ${e}`);
      }
    }

    // Save map after each collection
    writeIdMap(idMap);
  }

  payload.logger.info("Seeding action complete!");
};
