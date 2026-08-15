"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import path from "node:path";
import fs from "node:fs/promises";

export async function uploadPaymentProof(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) {
    throw new Error("No payment proof file provided.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ensure target upload directory exists
  try {
    const mediaDir = path.resolve(process.cwd(), "public/media");
    await fs.mkdir(mediaDir, { recursive: true });
  } catch (e) {
    // Directory already exists or created
  }

  const payload = await getPayload({ config: configPromise });

  try {
    const media = await payload.create({
      collection: "media",
      data: {
        alt: `Payment Proof - ${file.name}`,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    });

    return {
      success: true,
      mediaId: media.id,
      url: media.url,
      filename: media.filename,
    };
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw new Error("Failed to upload payment proof file.");
  }
}
