import fs from "node:fs";
import path from "node:path";

function lexicalToMarkdown(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;

  if (node.type === "text") {
    let text = node.text || "";
    if (node.format & 1) text = `**${text}**`; // Bold
    if (node.format & 2) text = `*${text}*`; // Italic
    return text;
  }

  if (node.type === "link") {
    const text = (node.children || []).map(lexicalToMarkdown).join("");
    return `[${text}](${node.fields?.url || node.url || "#"})`;
  }

  if (node.type === "heading") {
    const level = node.tag ? parseInt(node.tag.replace("h", ""), 10) : 2;
    const prefix = "#".repeat(level || 2);
    const content = (node.children || []).map(lexicalToMarkdown).join("");
    return `\n${prefix} ${content}\n`;
  }

  if (node.type === "paragraph") {
    const content = (node.children || []).map(lexicalToMarkdown).join("");
    return `\n${content}\n`;
  }

  if (node.type === "list") {
    const isOrdered = node.listType === "number";
    return (node.children || [])
      .map((item: any, idx: number) => {
        const itemContent = (item.children || [])
          .map(lexicalToMarkdown)
          .join("");
        return isOrdered
          ? `${idx + 1}. ${itemContent}`
          : `- ${itemContent}`;
      })
      .join("\n") + "\n";
  }

  if (node.type === "listitem") {
    return (node.children || []).map(lexicalToMarkdown).join("");
  }

  if (node.type === "quote") {
    const content = (node.children || []).map(lexicalToMarkdown).join("");
    return `\n> ${content}\n`;
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(lexicalToMarkdown).join("");
  }

  if (node.root) {
    return lexicalToMarkdown(node.root);
  }

  return "";
}

function cleanSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function migrateContent() {
  const seedDir = path.join(process.cwd(), "src/endpoints/seed/data");
  const contentDir = path.join(process.cwd(), "src/content");

  // 1. Projects
  const projectsPath = path.join(seedDir, "projects.json");
  if (fs.existsSync(projectsPath)) {
    const projects = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
    const dir = path.join(contentDir, "projects");
    fs.mkdirSync(dir, { recursive: true });

    for (const proj of projects) {
      const slug = proj.slug ? cleanSlug(proj.slug.split("-")[0] || proj.name) : cleanSlug(proj.name);
      const content = proj.hero?.richText ? lexicalToMarkdown(proj.hero.richText) : (proj.description || "");
      
      const fileContent = `---
name: ${JSON.stringify(proj.name || "")}
description: ${JSON.stringify(proj.description || "")}
chapter: ""
isFeatured: ${Boolean(proj.isFeatured)}
customLink: ${JSON.stringify(proj.customLink || "")}
---

${content.trim()}
`;
      fs.writeFileSync(path.join(dir, `${slug}.mdoc`), fileContent, "utf-8");
    }
    console.log(`Migrated ${projects.length} projects.`);
  }

  // 2. Chapters
  const chaptersPath = path.join(seedDir, "chapters.json");
  if (fs.existsSync(chaptersPath)) {
    const chapters = JSON.parse(fs.readFileSync(chaptersPath, "utf-8"));
    const dir = path.join(contentDir, "chapters");
    fs.mkdirSync(dir, { recursive: true });

    for (const ch of chapters) {
      const slug = cleanSlug(ch.slug || ch.name);
      const content = ch.content ? lexicalToMarkdown(ch.content) : (ch.description || "");
      
      const fileContent = `---
name: ${JSON.stringify(ch.name || "")}
university: ${JSON.stringify(ch.university || "")}
description: ${JSON.stringify(ch.description || "")}
contactEmail: ${JSON.stringify(ch.contactEmail || "")}
socialLinks: []
---

${content.trim()}
`;
      fs.writeFileSync(path.join(dir, `${slug}.mdoc`), fileContent, "utf-8");
    }
    console.log(`Migrated ${chapters.length} chapters.`);
  }

  // 3. Divisions
  const divisionsPath = path.join(seedDir, "divisions.json");
  if (fs.existsSync(divisionsPath)) {
    const divisions = JSON.parse(fs.readFileSync(divisionsPath, "utf-8"));
    const dir = path.join(contentDir, "divisions");
    fs.mkdirSync(dir, { recursive: true });

    for (const div of divisions) {
      const slug = cleanSlug(div.slug || div.name);
      const content = div.content ? lexicalToMarkdown(div.content) : (div.description || "");
      
      const fileContent = `---
name: ${JSON.stringify(div.name || "")}
lead: ${JSON.stringify(div.lead || "")}
description: ${JSON.stringify(div.description || "")}
---

${content.trim()}
`;
      fs.writeFileSync(path.join(dir, `${slug}.mdoc`), fileContent, "utf-8");
    }
    console.log(`Migrated ${divisions.length} divisions.`);
  }

  // 4. Products (Seed sample merchandise items)
  const productsDir = path.join(contentDir, "products");
  fs.mkdirSync(productsDir, { recursive: true });
  const sampleProducts = [
    {
      title: "SEDS Sri Lanka Official T-Shirt",
      slug: "seds-sl-official-t-shirt",
      priceInLKR: 2500,
      inStock: true,
      description: "Official high-quality cotton SEDS Sri Lanka merchandise t-shirt with embroidered space crest.",
      content: "Premium breathable fabric featuring the official SEDS Sri Lanka mission logo.",
    },
    {
      title: "SEDS Mission Patch & Sticker Pack",
      slug: "seds-mission-patch-sticker-pack",
      priceInLKR: 850,
      inStock: true,
      description: "Collector edition woven mission patch and weatherproof space exploration stickers.",
      content: "High durability woven embroidery patch suitable for jackets and backpacks.",
    }
  ];

  for (const prod of sampleProducts) {
    const fileContent = `---
title: ${JSON.stringify(prod.title)}
priceInLKR: ${prod.priceInLKR}
inStock: ${prod.inStock}
description: ${JSON.stringify(prod.description)}
---

${prod.content}
`;
    fs.writeFileSync(path.join(productsDir, `${prod.slug}.mdoc`), fileContent, "utf-8");
  }
  console.log(`Seeded ${sampleProducts.length} sample products.`);
}

migrateContent().catch(console.error);
