"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import type { Chapter } from "@/payload-types";

export const fetchChapters = async (searchQuery = ""): Promise<Chapter[]> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "chapters",
      sort: "-createdAt",
      where: searchQuery
        ? {
            name: {
              like: searchQuery,
            },
          }
        : {},
      depth: 1,
    });

    return result.docs as Chapter[];
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};
