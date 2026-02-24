import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "src/content/docs");

export type Doc = {
  slug: string;
  title: string;
  description?: string;
  content: string;
};

export function getDocSlugs() {
  if (!fs.existsSync(docsDirectory)) return [];
  return fs.readdirSync(docsDirectory).filter((file) => /\.mdx?$/.test(file));
}

export function getDocBySlug(slug: string[]): Doc | null {
  const realSlug = slug.join("/");
  const fullPathMDX = path.join(docsDirectory, `${realSlug}.mdx`);
  const fullPathMD = path.join(docsDirectory, `${realSlug}.md`);

  let fileContents: string;
  try {
    if (fs.existsSync(fullPathMDX)) {
      fileContents = fs.readFileSync(fullPathMDX, "utf8");
    } else if (fs.existsSync(fullPathMD)) {
      fileContents = fs.readFileSync(fullPathMD, "utf8");
    } else {
      return null;
    }
  } catch (_error) {
    return null;
  }

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || realSlug,
    description: data.description || "",
    content,
  };
}

export function getAllDocs(): Omit<Doc, "content">[] {
  const slugs = getDocSlugs();
  const docs = slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx?$/, "");
      const doc = getDocBySlug([realSlug]);
      if (!doc) return null;
      return {
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
      } as Omit<Doc, "content">;
    })
    .filter((doc): doc is Omit<Doc, "content"> => doc !== null);

  return docs;
}
