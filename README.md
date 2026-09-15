# Spidify

Spidify is an early-stage TypeScript project for turning structured design documents into actionable engineering work. The current prototype parses phases and tasks from Markdown and generates GitHub-issue-ready checklists for review in the terminal.

> **Current status:** Parser foundation. AI refinement, GitHub publishing, a web interface, authentication, persistence, and collaboration are documented product goals but are not implemented in this repository snapshot.

## Overview

Students and early-career developers often spread project plans across design documents, chats, task boards, and repositories. That fragmentation makes it difficult to maintain scope, preserve decisions, and explain how a project evolved.

Spidify's long-term vision is a project documentation and execution workspace that connects those materials. This repository contains the first deterministic part of that workflow: converting a design document with a simple `Phase` and task format into structured TypeScript objects and GitHub-flavored Markdown checklists.

The prototype is intended for developers who want a repeatable way to translate project plans into reviewable implementation phases before work is published or changed.

## Key Features

- **Local Markdown ingestion:** Reads a `design-doc.md` file from the repository root.
- **Deterministic phase parsing:** Detects lines beginning with `Phase ` and represents each phase as a typed object.
- **Task extraction:** Collects `- ` bullet items under the active phase.
- **GitHub-ready formatting:** Converts each phase's tasks into Markdown checkboxes with a definition-of-done section.
- **Terminal preview:** Prints the parsed phase titles and generated issue bodies for human review.

## Current Limitations

- The input filename is fixed as `design-doc.md`.
- Headings and tasks must follow the exact `Phase ` and `- ` prefixes.
- Output is printed to the terminal; it is not written to files or sent to GitHub.
- The repository does not include AI integration, a frontend, a backend API, authentication, a database, or external-service integration.
- The current sample `design-doc.md` describes a bakery-management project and serves as parser input rather than Spidify product documentation.

## Demo / Screenshots

The repository currently contains no demo media or application screenshots. A terminal capture showing parsed phases and generated checklists would be the most representative visual for this version.

Suggested placeholder after adding the asset to the repository:

```markdown
<!-- Placeholder: this file does not exist yet. -->
![Spidify CLI output](docs/images/spidify-cli-output.png)
```

The pitch deck also contains a Spidify logo that could be exported and added as a separate repository asset.

Suggested placeholder after adding the asset:

```markdown
<!-- Placeholder: this file does not exist yet. -->
![Spidify logo](docs/images/spidify-logo.png)
```

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Input:** Local Markdown document
- **Output:** GitHub-flavored Markdown printed to the terminal
- **Package management:** npm
- **Development types:** `@types/node`
- **Configuration:** TypeScript strict-mode configuration in `tsconfig.json`

No frontend framework, backend framework, database, authentication provider, AI model, or external API is connected in the current implementation.

## System Architecture

The implemented architecture is a local, single-process pipeline:

```text
design-doc.md
      |
      v
Node.js / TypeScript entry point
      |
      v
parsePhases()
      |
      v
Phase[] { title, tasks[] }
      |
      v
createIssueBody()
      |
      v
Terminal preview of GitHub-ready Markdown
```

The design documents describe a future architecture with a React interface, a Node/TypeScript application layer, AI-provider abstraction, GitHub and Google integrations, Supabase, retrieval, and observability. Those components remain planned and are not part of this repository snapshot.

## How It Works

1. The user writes project phases in `design-doc.md`.
2. Each phase heading begins with `Phase `.
3. Tasks beneath a phase begin with `- `.
4. `src/index.ts` reads the document and processes it line by line.
5. `parsePhases()` groups task bullets into typed `Phase` objects.
6. `createIssueBody()` converts every phase's tasks into Markdown checkboxes.
7. The generated issue content is printed for review in the terminal.

Example input:

```markdown
Phase 1 - Parser Foundation
- Read a local Markdown document
- Detect phase headings
- Extract bullet tasks
```

Example generated body:

```markdown
## Tasks

- [ ] Read a local Markdown document
- [ ] Detect phase headings
- [ ] Extract bullet tasks

## Definition of Done

This phase is complete when all tasks above are finished.
```

## Getting Started

### Prerequisites

- Git
- npm
- A recent Node.js release with native TypeScript type stripping; the current source was verified with Node.js `24.19.0`

The minimum supported Node.js version is **[Needs confirmation]** because the repository does not currently declare an `engines` requirement or include a TypeScript execution dependency in its root `package.json`.

### Installation

```bash
firstly you need to clone the repository 
git clone https://github.com/Vaughn-Alston/Spidify.git

then CD -> change directory into the Spidify folder so you can run the Spidify Packages
cd Spidify

npm install
                  npm install will download the packages in pacakge.json so you can run the spidifiy app
npx expo startxs
 -> At this point you will be able to run the Spidify App Locally however you need to download 
 the package for the document uploader to work on your end

-> 
 npx expo install expo-document-picker


 Now you will be able to run the most current version of our APP


```





### Environment Variables

No environment variables are required by the current implementation.

### Running the Application

Make sure `design-doc.md` exists in the repository root, then run:

```bash
node src/index.ts
```

The command prints the source document, parser diagnostics, phase titles, and generated issue bodies to the terminal.

> If your Node.js version cannot execute `.ts` files directly, the repository needs a checked-in TypeScript runner such as `tsx` and an npm script. See [Recommended Repository Improvements](#recommended-repository-improvements).

## Input Format

The current parser uses an exact, line-based contract:

```markdown
Phase 1 - Phase Name
- First task
- Second task

Phase 2 - Next Phase
- Another task
```

- A phase is created only when a trimmed line starts with `Phase `.
- A task is captured only when a trimmed line starts with `- ` and follows a recognized phase.
- Other headings and bullet styles are ignored.

## Project Structure

```text
Spidify/
|-- src/
|   `-- index.ts          # Reads, parses, and formats the design document
|-- design-doc.md         # Sample structured document consumed by the parser
|-- tsconfig.json         # TypeScript compiler settings
|-- package.json          # Root npm dependency metadata
|-- package-lock.json     # Locked npm dependency tree
|-- Design-doc-agent      # Legacy package metadata; see notes below
|-- .package-lock.json    # Legacy/generated dependency metadata
`-- .gitignore
```

`Design-doc-agent` contains package-style metadata that references a different repository (`StoreSite`) and should not be treated as authoritative Spidify configuration.

## Testing

No automated test suite or working `npm test` script exists in the current repository.

For a manual smoke test:

1. Add at least one valid phase and task to `design-doc.md`.
2. Run `node src/index.ts`.
3. Confirm the output contains the phase title, a `## Tasks` section, task checkboxes, and a `## Definition of Done` section.

Parser unit tests, malformed-input fixtures, and error-path validation are explicitly planned for a later development phase.

## What the Team Accomplished

- Defined a focused MVP boundary that connects structured project planning to reviewable GitHub issue content.
- Implemented a deterministic TypeScript parser and issue-body formatter as the first working foundation.
- Created a phased product roadmap covering AI refinement, reliability, GitHub integration, a web interface, collaboration, and project knowledge retrieval.
- Documented target architecture, security boundaries, failure scenarios, observability strategy, and AI-provider evaluation criteria.
- Established a two-person ownership model for product/AI engineering and test/reliability engineering.

## Challenges and Design Decisions

- **Deterministic parsing for rule-based work:** Phase detection, task extraction, validation, and formatting are intended to remain predictable TypeScript operations.
- **AI reserved for reasoning tasks:** The product design assigns future LLMs to explanation, refinement, and guidance instead of basic parsing or authorization.
- **Human approval before external changes:** The planned workflow requires users to review suggested changes before GitHub Issues or authoritative documents are updated.
- **Provider independence:** Future AI integration is intended to use an internal provider interface rather than coupling the project to one model vendor.
- **Narrow MVP boundary:** The documented product plan prioritizes completing the design-document-to-approved-GitHub-Issue loop before adding broader collaboration and knowledge-management features.

## Future Improvements

| Stage | Status | Planned scope |
|---|---|---|
| Parser foundation | Partially implemented | Finish parser documentation, remove debug output, and improve input handling. |
| Local AI refinement | Planned | Expand, explain, or revise a selected task; preserve the original; preview and accept or reject suggestions. |
| Validation and reliability | Planned | Validate document structure and model output; add unit tests, fixtures, typed errors, and monitoring. |
| GitHub MVP | Planned | Add secure authentication, repository selection, approval gates, issue creation, and duplicate/partial-failure handling. |
| Web interface | Planned | Build a React and TypeScript roadmap UI with task selection and deterministic editing/reordering. |
| Multi-user foundation | Future | Add Supabase authentication, project membership, roles, row-level security, and private document storage. |
| Project knowledge platform | Future | Add a source tree, document approvals, retrieval with citations, collaboration, Google integrations, progress tracking, and project exports. |

## Contributors

- [Vaughn Alston](https://github.com/Vaughn-Alston) - repository owner and documented project contributor

The planning materials describe a two-person team, but the second contributor's name and profile were not present in the supplied files: **[Needs confirmation]**.

## License

No `LICENSE` file was found in the repository. The legacy `Design-doc-agent` metadata mentions ISC but references the unrelated `StoreSite` repository, so it is not sufficient to establish Spidify's license. The intended license is **[Needs confirmation]**.

## Recommended Repository Improvements

The most important immediate improvement is to make setup reproducible by declaring the TypeScript runtime, adding npm scripts, and documenting a supported Node.js version. See the repository's project documentation for the broader product roadmap.
