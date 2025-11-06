'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface ProjectContentProps {
  content: SerializedEditorState
}

export function ProjectContent({ content }: ProjectContentProps) {
  return (
    <section className="w-full flex justify-center py-8 px-2 md:px-0">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <div className="payload-richtext bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6 md:p-10 border border-neutral-200 dark:border-neutral-800">
            <RichText data={content} />
          </div>
        </article>
        {/* Sidebar (optional, can add widgets or info here) */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-24 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow p-6 border border-neutral-200 dark:border-neutral-800">
            {/* Sidebar content placeholder */}
            <div className="text-neutral-500 text-sm">Sidebar<br/>Add widgets, author info, or related links here.</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
