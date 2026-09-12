import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const keystaticReader = createReader(process.cwd(), keystaticConfig);

export interface ProjectEntry {
  slug: string;
  name: string;
  description: string;
  image?: string | null;
  chapter?: string | null;
  isFeatured?: boolean;
  customLink?: string | null;
  content: () => Promise<any>;
}

export interface ChapterEntry {
  slug: string;
  name: string;
  university?: string | null;
  description: string;
  logoDark?: string | null;
  logoLight?: string | null;
  mainImage?: string | null;
  contactEmail?: string | null;
  socialLinks?: readonly {
    readonly platform: "facebook" | "twitter" | "instagram" | "linkedin";
    readonly url: string;
  }[];
  content: () => Promise<any>;
}

export interface DivisionEntry {
  slug: string;
  name: string;
  lead?: string | null;
  description: string;
  icon?: string | null;
  content: () => Promise<any>;
}

export interface ProductEntry {
  slug: string;
  title: string;
  priceInLKR: number;
  inStock?: boolean;
  isPreOrder?: boolean;
  category?: string | null;
  badge?: string | null;
  image?: string | null;
  gallery?: readonly string[] | null;
  sizes?: readonly string[] | null;
  features?: readonly string[] | null;
  description: string;
  tallyFormId?: string | null;
  content: () => Promise<any>;
}

export async function getAllProjects(): Promise<ProjectEntry[]> {
  try {
    const raw = await keystaticReader.collections.projects.all();
    return raw
      .filter((item) => item.slug !== "building" && item.slug !== "cansat")
      .map((item) => ({
        slug: item.slug,
        name: item.entry.name,
        description: item.entry.description,
        image: item.entry.image,
        chapter: item.entry.chapter,
        isFeatured: Boolean(item.entry.isFeatured),
        customLink: item.entry.customLink,
        content: item.entry.content,
      }));
  } catch (error) {
    console.error("Error loading projects from Keystatic:", error);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectEntry | null> {
  try {
    const entry = await keystaticReader.collections.projects.read(slug);
    if (!entry) return null;
    return {
      slug,
      name: entry.name,
      description: entry.description,
      image: entry.image,
      chapter: entry.chapter,
      isFeatured: Boolean(entry.isFeatured),
      customLink: entry.customLink,
      content: entry.content,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export async function getAllChapters(): Promise<ChapterEntry[]> {
  try {
    const raw = await keystaticReader.collections.chapters.all();
    return raw
      .filter(
        (item) =>
          item.slug !== "chapter-one" &&
          item.slug !== "chapter-two" &&
          item.slug !== "seds-uoc",
      )
      .map((item) => ({
        slug: item.slug,
        name: item.entry.name,
        university: item.entry.university,
        description: item.entry.description,
        logoDark: item.entry.logoDark,
        logoLight: item.entry.logoLight,
        mainImage: item.entry.mainImage,
        contactEmail: item.entry.contactEmail,
        socialLinks: item.entry.socialLinks,
        content: item.entry.content,
      }));
  } catch (error) {
    console.error("Error loading chapters from Keystatic:", error);
    return [];
  }
}

export async function getChapterBySlug(
  slug: string,
): Promise<ChapterEntry | null> {
  try {
    const entry = await keystaticReader.collections.chapters.read(slug);
    if (!entry) return null;
    return {
      slug,
      name: entry.name,
      university: entry.university,
      description: entry.description,
      logoDark: entry.logoDark,
      logoLight: entry.logoLight,
      mainImage: entry.mainImage,
      contactEmail: entry.contactEmail,
      socialLinks: entry.socialLinks,
      content: entry.content,
    };
  } catch (error) {
    console.error(`Error reading chapter ${slug}:`, error);
    return null;
  }
}

export async function getAllDivisions(): Promise<DivisionEntry[]> {
  try {
    const raw = await keystaticReader.collections.divisions.all();
    return raw.map((item) => ({
      slug: item.slug,
      name: item.entry.name,
      lead: item.entry.lead,
      description: item.entry.description,
      icon: (item.entry as any).icon || "Rocket",
      content: item.entry.content,
    }));
  } catch (error) {
    console.error("Error loading divisions from Keystatic:", error);
    return [];
  }
}

export async function getDivisionBySlug(
  slug: string,
): Promise<DivisionEntry | null> {
  try {
    const entry = await keystaticReader.collections.divisions.read(slug);
    if (!entry) return null;
    return {
      slug,
      name: entry.name,
      lead: entry.lead,
      description: entry.description,
      icon: (entry as any).icon || "Rocket",
      content: entry.content,
    };
  } catch (error) {
    console.error(`Error reading division ${slug}:`, error);
    return null;
  }
}

export async function getAllProducts(): Promise<ProductEntry[]> {
  try {
    const raw = await keystaticReader.collections.products.all();
    return raw.map((item) => ({
      slug: item.slug,
      title: item.entry.title,
      priceInLKR: item.entry.priceInLKR,
      inStock: item.entry.inStock,
      isPreOrder: Boolean((item.entry as any).isPreOrder),
      category: item.entry.category,
      badge: item.entry.badge,
      image: item.entry.image,
      gallery: item.entry.gallery as any,
      sizes: item.entry.sizes as any,
      features: item.entry.features as any,
      description: item.entry.description,
      tallyFormId: item.entry.tallyFormId,
      content: item.entry.content,
    }));
  } catch (error) {
    console.error("Error loading products from Keystatic:", error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductEntry | null> {
  try {
    const entry = await keystaticReader.collections.products.read(slug);
    if (!entry) return null;
    return {
      slug,
      title: entry.title,
      priceInLKR: entry.priceInLKR,
      inStock: entry.inStock,
      isPreOrder: Boolean((entry as any).isPreOrder),
      category: entry.category,
      badge: entry.badge,
      image: entry.image,
      gallery: entry.gallery as any,
      sizes: entry.sizes as any,
      features: entry.features as any,
      description: entry.description,
      tallyFormId: entry.tallyFormId,
      content: entry.content,
    };
  } catch (error) {
    console.error(`Error reading product ${slug}:`, error);
    return null;
  }
}
