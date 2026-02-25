import { getPayload } from "payload";
import config from "@payload-config";
import fs from "fs";
import path from "path";

// adjust imports
const configPath = path.resolve(process.cwd(), "src/payload.config.ts");

async function extract() {
  const payload = await getPayload({ config });

  const collections: any[] = [
    "media",
    "divisions",
    "projects",
    "chapters",
    "forms",
    "pages",
  ];

  const dataDir = path.resolve(process.cwd(), "src/endpoints/seed/data");
  const imgDir = path.resolve(process.cwd(), "src/endpoints/seed/images");

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  for (const collection of collections) {
    const result = await payload.find({
      collection,
      depth: 0,
      limit: 1000,
      pagination: false,
    });
    fs.writeFileSync(
      path.join(dataDir, `${collection}.json`),
      JSON.stringify(result.docs, null, 2),
    );
  }

  console.log("Extraction complete.");
  process.exit(0);
}

extract();
