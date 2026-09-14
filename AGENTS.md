<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Architecture Guidelines
Always read `ARCHITECTURE.md` before making structural changes or creating new UI components.

# Payload/Puck page templates
Before creating, restoring, migrating, or repairing a document in the Payload `pages` collection, read `CMS_PAGE_TEMPLATES.md`. It documents the canonical template shape, safe idempotent recovery flow, Puck slot requirements, and verification checklist.
