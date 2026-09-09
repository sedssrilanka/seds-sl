# SEDS Sri Lanka: Payload CMS to Keystatic + Supabase Migration Tracker

> **Active Branch:** `feat/migrate-keystatic-supabase`  
> **Last Updated:** 2026-09-09  
> **Status:** In Progress (Chunk 1 Started)

---

## 📌 Architecture Overview

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Static / Editorial Content** | **Keystatic (Git-based CMS)** | Projects, Chapters, Divisions, Pages, Products catalog (zero-cost, GitHub sync, Markdown/JSON). |
| **Content Editor UI** | `/keystatic` (Keystatic Admin) | Visual editor for non-technical team members with live preview & image uploads. |
| **Dynamic Runtime Data** | **Supabase (PostgreSQL)** | MoonRegistrations, custom form submissions, Orders, Transactions. |
| **Orders & Transactions UI** | `/admin/orders` & `/admin/transactions` | Lightweight admin dashboard for managing orders, payment status, and exports. |
| **Forms & Emails** | **Tally Forms + Resend** | Zero-maintenance embedded forms & automated transactional emails. |

---

## 📋 Master Checklist

### ✅ Step 0: Repository & Branch Setup
- [x] Create feature branch `feat/migrate-keystatic-supabase`
- [x] Initialize `MIGRATION_TRACKER.md` for live progress tracking

---

### ✅ Chunk 1: Keystatic Setup & Schema Definitions
- [x] Install `@keystatic/core` and `@keystatic/next`
- [x] Create `keystatic.config.ts` with collections:
  - [x] `projects` (title, slug, description, image, chapter, isFeatured, customLink, content)
  - [x] `chapters` (name, slug, university, logo, coverImage, description, socialLinks, content)
  - [x] `divisions` (name, slug, lead, description, content)
  - [x] `pages` (title, slug, content)
  - [x] `products` (name, slug, price, currency, description, images, inStock, content)
- [x] Create Keystatic admin page `src/app/keystatic/[[...params]]/page.tsx`
- [x] Create Keystatic API route `src/app/api/keystatic/[...params]/route.ts`

---

### ✅ Chunk 2: Content Migration & Reader Utilities
- [x] Populate `src/content/projects/` from existing seed data
- [x] Populate `src/content/chapters/` from existing seed data
- [x] Populate `src/content/divisions/` from existing seed data
- [x] Populate `src/content/products/` from existing seed data
- [x] Implement `src/lib/keystatic.ts` reader helper
- [x] Migrate `src/actions/projects.ts` to use Keystatic Reader
- [x] Migrate `src/app/(app)/projects/` and `src/app/(app)/chapters/` to Keystatic Reader
- [x] Migrate `src/app/(app)/divisions/` to Keystatic Reader
- [x] Migrate Store / Product catalog frontend to Keystatic Reader

---

### ✅ Chunk 3: Dynamic Data, Orders & Transactions Admin
- [x] Setup Supabase clients (`src/lib/supabase/client.ts` and `src/lib/supabase/server.ts`)
- [x] Define database tables/schema for `moon_registrations`, `orders`, and `transactions` (`supabase/schema.sql`)
- [x] Create `/admin/orders` management dashboard with search, filter, and payment receipt view
- [x] Wire status indicators and payment slip verification

---

### ✅ Chunk 4: Tally Forms & Resend Integration
- [x] Create reusable `TallyEmbed` component (`src/components/forms/TallyEmbed.tsx`)
- [x] Setup Tally webhook receiver (`src/app/api/webhooks/tally/route.ts`)
- [x] Setup direct Resend email utilities (`src/utilities/sendEmail.ts`) for order & registration confirmations

---

### ⏳ Chunk 5: Payload CMS Removal & Final Cleanup
- [ ] Remove `@payloadcms/*` dependencies from `package.json`
- [ ] Delete `src/payload.config.ts`, `src/app/(payload)`, `src/collections`, `src/plugins`, `src/migrations`
- [ ] Clean up `next.config.ts` (remove `withPayload` wrappers)
- [ ] Verify `next build` memory usage, build speed, and bundle size
- [ ] Run full test & type-check suite (`tsc --noEmit`, `vitest`)

---

## 📝 Activity Log

| Date & Time | Step | Description | Modified Files |
| :--- | :--- | :--- | :--- |
| 2026-09-09 | Step 0 | Created branch `feat/migrate-keystatic-supabase` and initialized `MIGRATION_TRACKER.md` | `MIGRATION_TRACKER.md` |
| 2026-09-09 | Chunk 1 | Installed Keystatic packages, defined `keystatic.config.ts`, created `/keystatic` UI and API route | `keystatic.config.ts`, `src/app/keystatic/*`, `src/app/api/keystatic/*` |
| 2026-09-09 | Chunk 2 | Seeded Markdoc content, created `src/lib/keystatic.ts` reader, migrated actions and pages | `src/content/*`, `src/lib/keystatic.ts`, `src/actions/*`, `src/app/(app)/*` |
| 2026-09-09 | Chunk 3 | Configured Supabase clients, defined database schema, created Admin Orders dashboard | `src/lib/supabase/*`, `supabase/schema.sql`, `src/app/(admin)/admin/orders/*` |
| 2026-09-09 | Chunk 4 | Created `TallyEmbed` component, Tally webhook route, and direct Resend email utility | `src/components/forms/TallyEmbed.tsx`, `src/app/api/webhooks/tally/*`, `src/utilities/sendEmail.ts` |

---

## 🔄 How to Resume if Paused
1. Ensure you are on the migration branch: `git checkout feat/migrate-keystatic-supabase`
2. Check the **Master Checklist** above to identify the first unchecked `[ ]` task.
3. Check the **Activity Log** for the most recent changes and context.
4. Continue execution from the current active Chunk.
