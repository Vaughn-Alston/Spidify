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


## Maestro Automated Testing Frame work

Spidify Maestro E2E Setup

1. Clone the repository

2. Install project dependencies
   npm install

3. Install Maestro once on your computer
   brew install maestro

4. Open an iOS Simulator

5. Build + install the native Spidify app

Run in your terminal  --> npm run ios:local

→ builds Spidify as its own native iOS app ⟶ build and install my actual app on the simulator
→ installs Spidify.app onto the simulator
→ launches it
```
<img width="500" height="750" alt="Screenshot iPhone 18 Pro 09-29-2026 at 5 48 08 PM" src="https://github.com/user-attachments/assets/d22050cd-f534-42d3-9a9e-ecd94c0fd640" />
```


6. Leave Spidify installed on the simulator

7. Run the Maestro E2E tests
   npm run e2e
   in your terminal run -->  maestro test .maestro/contacts.yaml




Important:
npm install does NOT install the Spidify native app.

The native app must already exist on the simulator before Maestro can test it.

You normally only need to rebuild with:
npm run ios:local

when:
• setting up the project for the first time
• native configuration changes
• native dependencies change
• the app was removed from the simulator


if the app isnt working when running npx expo start 

Do the following: 

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

<img width="500" height="900" alt="image" src="https://github.com/user-attachments/assets/9e64b2ab-3037-4705-a1f7-e2a9402efdf9" />








