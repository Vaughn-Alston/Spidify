# Spidify

Spidify is a small project workspace prototype. Its first workflow is:

```text
mobile UI
    ↓
backend
    ↓
deterministic parser
    ↓
design document
    ↓
phases and tasks
```

The Expo mobile app currently lets a user attach a design document. The
backend parser reads Markdown phase headings and task bullets into shared
TypeScript data. AI, GitHub, databases, authentication, and agent workflows
are future work and are intentionally not part of this reorganization.

## Folder structure

```text
mobile/       Expo React Native app
backend/      Node/TypeScript entry point and parser
shared/       TypeScript types used by both sides later
docs/         Spidify project documentation
```

The mobile app keeps only `src/components/` and `src/screens/` for now. More
folders should be added only when the project needs them.

## Mobile

```bash
cd mobile
npm install
npx expo start


if the app isnt working then run 

npx expo start --clear

then run 

npx expo start --tunnel



```

## Backend

```bash
cd backend
npm install
```

There is not currently an `npm run dev` script or a TypeScript runner in the
backend package. For a Node version that can run TypeScript directly, use:

```bash
node src/index.ts
```

If that is not supported by your Node version, add a small TypeScript runner
such as `tsx` and a `"dev": "tsx src/index.ts"` script later. No backend
framework is needed for the current parser prototype.

## Parser input

The parser reads [`docs/design-doc.md`](docs/design-doc.md). It detects lines
starting with `Phase ` and task bullets starting with `- `. It returns a
`Project` containing `Phase[]` and `Task[]` values from
[`shared/types.ts`](shared/types.ts).

Arrays are appropriate while preserving document order. If task lookup or
duplicate checking becomes important as the project grows, a `Map` or `Set`
can be added at that boundary later without redesigning the whole app.
