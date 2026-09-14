# Payload/Puck Page Templates and Recovery

This guide explains how to create, restore, and migrate editable pages in the Payload `pages` collection. Read it before changing a page template or repairing a page that is missing from the admin list.

## Architecture

Keep page recovery split across the existing layers:

- Domain defaults contain clean business content, without Payload access.
- Infrastructure converts that content into valid Puck `Data`.
- Payload scripts or route handlers find, validate, create, or update documents.
- Theme components render the data; they must not query Payload directly.

For the home page, the canonical files are:

- `src/modules/home/domain/home.defaults.ts`: default content.
- `src/modules/home/infrastructure/home-puck-data.ts`: Puck template factory and shape validator.
- `src/puck.config.tsx`: registered Puck components and fields.
- `migrate-home.ts`: command-line recovery.
- `src/app/api/migrate/route.ts`: idempotent recovery endpoint.

Do not build recovery JSON independently in several places. Create one typed template factory and reuse it everywhere.

## Required Payload document fields

A Puck page needs the following values:

```ts
{
  title: 'Page title',
  slug: 'page-slug',
  puckData: createPagePuckData(defaultPageData),
  editorVersion: 'puck',
  isHomepage: false,
  _status: 'published',
}
```

Only the real home page should use `isHomepage: true`.

Use `puckData`, not the obsolete `puck` property and not a JSON string. `puckData` must be an object with this base shape:

```ts
{
  content: [],
  root: { props: {} },
  zones: {},
}
```

Every item in `content` must have a registered component `type` and a unique string `props.id`.

## Important: Puck slots

Fields declared as `{ type: 'slot' }` cannot contain plain objects. Every child must be a complete Puck component:

```ts
// Correct
features: [
  {
    type: 'FeatureCard',
    props: {
      id: 'FeatureCard-0',
      title: 'Clear information',
      description: 'Description',
    },
  },
]

// Incorrect: this can crash the visual editor while reading props.id
features: [
  { title: 'Clear information', description: 'Description' },
]
```

The failure can be confusing: the document may exist in PostgreSQL and the REST API may return it, while the admin list says `No Results` or the visual editor throws `Cannot read properties of undefined (reading 'id')`.

Validate nested slots before deciding that an existing document is healthy. The home implementation uses `isCurrentHomePuckData` to verify:

- The expected top-level block count.
- `ExperienceBlock.scenes` contains `ExperienceSceneCard` items.
- `ExperienceBlock.features` contains `ExperienceFeatureCard` items.
- `StepsBlock.steps` contains `StepCard` items.
- Every nested item has a string `props.id`.

## Safe, idempotent recovery flow

Recovery must be safe to run more than once:

1. Build the canonical Puck data from the page defaults.
2. Find exactly one document using its stable slug.
3. If no document exists, create it.
4. If it exists and passes the current template validator, leave it unchanged.
5. If it exists but has an obsolete or invalid shape, update that same document instead of creating a duplicate.
6. Keep the document ID so Payload version history remains attached to the page.

Reference pattern:

```ts
const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: pageSlug } },
  limit: 1,
})

const puckData = createPagePuckData(defaultPageData)
const page = existing.docs[0]

if (!page) {
  await payload.create({ collection: 'pages', data: pageDocument })
} else if (!isCurrentPagePuckData(page.puckData)) {
  await payload.update({
    collection: 'pages',
    id: page.id,
    data: pageDocument,
  })
}
```

Never update every document in `pages`. Never overwrite a valid page merely because a recovery endpoint was called.

## Adding another reusable page template

For a page such as `about`, follow this layout:

```text
src/modules/about/
  domain/about.defaults.ts
  domain/about.entity.ts
  infrastructure/about-puck-data.ts
```

In `about-puck-data.ts`, export both:

```ts
export const createAboutPuckData = (about: AboutEntity): Data => ({ ... })
export const isCurrentAboutPuckData = (value: unknown): value is Data => { ... }
```

Register every top-level and slot child component in `src/puck.config.tsx`. Then add an idempotent migration script that searches only for `slug: 'about'`.

Prefer explicit validators over a version number alone. A saved document can claim the latest version while still containing malformed nested content.

## Verification checklist

After creation or repair, verify all of the following:

1. The REST API returns one document for the slug.
2. The document has `editorVersion: 'puck'` and the intended `_status`.
3. The expected number and order of top-level blocks are present.
4. Every top-level and nested slot item has a unique `props.id`.
5. `/admin/collections/pages` shows the document.
6. `/admin/collections/pages/{id}` opens normally.
7. `/admin/puck-editor/pages/{id}` loads the visual editor without a runtime overlay.
8. The public route renders the page.
9. Running the recovery a second time reports that no change was needed.

For the current home recovery, call the route with `POST /api/migrate`. Its response distinguishes `created`, `repaired`, and unchanged states. The handler must remain idempotent.

## Preserving user content

The current home repair replaces malformed template data with canonical defaults. Before extending this pattern to a page with valuable edits, add a mapper that converts legacy props into the new slot shape. Use replacement with defaults only when the user explicitly wants the original template restored or the old data cannot be mapped safely.

When changing a live template, prefer a migration that preserves compatible text, URLs, media references, and ordering while adding missing component wrappers and IDs.
