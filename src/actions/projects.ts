"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import type { Project } from "@/payload-types";

export const fetchProjects = async (searchQuery = ""): Promise<Project[]> => {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "projects",
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

    return result.docs as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
