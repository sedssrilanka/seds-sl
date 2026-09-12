# Agent Guidelines & Repository Rules

## 🌐 Official Domain & Branding (CRITICAL)
- The official domain for SEDS Sri Lanka is **`sedssl.org`** (e.g. `https://sedssl.org`).
- **NEVER** use `seds-sl.org` or `www.seds-sl.org`.
- Official email addresses use the `@sedssl.org` domain:
  - Main contact: `contact@sedssl.org` / `info@sedssl.org`
  - Automated sender: `noreply@sedssl.org`
  - Chapter emails: `<chapter>@sedssl.org` (e.g. `sedsmora@sedssl.org`, `sedskdu@sedssl.org`, etc.)
- Organization Name: **SEDS Sri Lanka** (Students for the Exploration & Development of Space).

## 🛠️ Tech Stack & Database-Free Architecture
- **CMS**: Keystatic (`storage: { kind: 'github', repo: 'sedssrilanka/seds-sl' }` / `'local'`) with Markdoc content in `src/content/`.
- **Database**: No external database is used (zero database overhead).
- **Forms & Store**: Tally Forms (`tally.so`) for merchandise orders and signups.
- **Emails**: Resend API (`resend`) with structured templates located in `src/emails/`.
- **Email Studio**: Live interactive preview available at `/admin/emails` or `/api/emails/preview?template=<id>`.
