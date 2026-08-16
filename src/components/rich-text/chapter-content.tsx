"use client";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface ChapterContentProps {
  content: SerializedEditorState;
}

export function ChapterContent({ content }: ChapterContentProps) {
  return (
    <section className="w-full flex justify-center py-4 px-2 md:px-0">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0 prose dark:prose-invert max-w-none">
          <RichText data={content} />
        </article>
      </div>
    </section>
  );
}
