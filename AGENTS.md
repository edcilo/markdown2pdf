# AGENTS.md — edc_md2pdf

> Markdown-to-PDF converter: Astro + TypeScript + Tailwind CSS v4.
> Single-page app: edit Markdown on the left, live preview on the right, export via browser print.

---

## Build / Dev / Lint Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server (http://localhost:4321)
npm run build            # Production build (astro check + astro build)
npm run preview          # Preview production build locally
npm run check            # Astro check (component types + template diagnostics)
npm run typecheck        # tsc --noEmit (pure TypeScript checking)
npm run lint             # ESLint (report unused disable directives)
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier — write changes
npm run format:check     # Prettier — check only (CI)
```

### Tests

**No test framework configured.** If you add tests, prefer **Vitest** (bundled via Astro's Vite).

### Pre-commit check

```bash
npm run lint && npm run format:check && npm run build
```

---

## Project Structure

```
src/
├── components/           # Astro components (.astro) — PascalCase
├── layouts/MainLayout.astro
├── pages/index.astro     # Single page — all client-side <script> logic here
├── styles/
│   ├── global.css        # Tailwind import only (@import 'tailwindcss')
│   ├── preview.css       # Scoped under .preview-content
│   └── print.css         # @media print rules (A4 layout)
├── types/toolbar.ts      # ToolbarAction union, ToolbarButton interface, TOOLBAR_BUTTONS
└── utils/                # Pure TS helpers — kebab-case filenames
    ├── default-content.ts, markdown.ts, pdf.ts, toolbar-actions.ts
```

---

## TypeScript Guidelines

- **Strict mode**: tsconfig extends `astro/tsconfigs/strict`.
- **No `any`**: `@typescript-eslint/no-explicit-any` is `warn`. Use proper types instead.
- **Type-only imports required** (`error`):
  ```ts
  import type { ToolbarAction } from '@/types/toolbar'; // ✅
  import { ToolbarAction } from '@/types/toolbar'; // ❌
  ```
- **Unused variables**: Prefix with `_` (`_exhaustive`, `_event`).
- **Exhaustive switches**: `const _exhaustive: never = value` in default cases.
- **`prefer-const`**: `error`. **`no-var`**: `error`. **`eqeqeq`**: `error` (always `===`/`!==`).

### Path Aliases (always use these for `src/` imports)

| Alias           | Maps to            |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@layouts/*`    | `src/layouts/*`    |
| `@styles/*`     | `src/styles/*`     |
| `@utils/*`      | `src/utils/*`      |

Relative imports only within the same directory level (e.g. sibling components).

---

## Code Style (Prettier)

| Rule        | Value        | Rule            | Value  |
| ----------- | ------------ | --------------- | ------ |
| Semicolons  | Always       | Arrow parens    | Always |
| Quotes      | Single (`'`) | Print width     | 100    |
| Indent      | 2 spaces     | Trailing commas | All    |
| End of line | LF           | Bracket spacing | Yes    |

**Plugins**: `prettier-plugin-astro`, `prettier-plugin-tailwindcss` (auto-sorts classes).

---

## Naming Conventions

| Element            | Convention          | Example                               |
| ------------------ | ------------------- | ------------------------------------- |
| Component files    | PascalCase `.astro` | `EditorPanel.astro`                   |
| Util/type files    | kebab-case `.ts`    | `toolbar-actions.ts`                  |
| Style files        | kebab-case `.css`   | `preview.css`                         |
| Functions          | camelCase           | `parseMarkdown`, `downloadPdf`        |
| Types/Interfaces   | PascalCase          | `ToolbarAction`, `InsertionResult`    |
| Constants          | UPPER_SNAKE_CASE    | `DEFAULT_MARKDOWN`, `TOOLBAR_BUTTONS` |
| CSS scope classes  | kebab-case          | `.preview-content`                    |
| DOM IDs            | kebab-case          | `#markdown-input`, `#preview-output`  |
| data-\* attributes | kebab-case          | `data-action="bold"`                  |

---

## Component Patterns

- **Astro components** are server-rendered; all client interactivity lives in `<script>` tags in `src/pages/index.astro`.
- **Props**: type with `interface Props` in the frontmatter.
- **Event delegation**: attach one listener to a parent, match via `.closest()`.
- **DOM queries**: `document.querySelector<T>()` with explicit type param; null-check immediately.
- **Debounce** user input before expensive operations (150ms for Markdown parsing).

---

## Styling Rules

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin.
- Use **Tailwind utilities** in `.astro` files; **plain CSS** in `src/styles/` for complex/scoped styles.
- Scope custom CSS under a namespace class (e.g. `.preview-content h1 { ... }`).
- Print styles in `print.css` under `@media print { ... }`.

---

## Error Handling

- Guard DOM queries with null checks; throw descriptive errors for missing required elements.
- Sanitize all user HTML with **DOMPurify** (`USE_PROFILES: { html: true }`).
- Use `marked` in synchronous mode (`marked.use({ async: false })`), cast result as `string`.
- **No `console.log`** — only `console.warn` and `console.error` allowed.

---

## Key Libraries

| Library       | Purpose           | Notes           |
| ------------- | ----------------- | --------------- |
| `astro`       | Framework (SSG)   | v5.x, ESM-only  |
| `marked`      | Markdown → HTML   | Sync mode       |
| `dompurify`   | HTML sanitization | Prevents XSS    |
| `tailwindcss` | Utility-first CSS | v4, Vite plugin |

---

## Ignored Paths

- **ESLint**: `dist/`, `.astro/`, `node_modules/`, `.agents/`
- **Prettier**: `dist/`, `.astro/`, `node_modules/`, `.agents/`, `.opencode/`, `package-lock.json`, `pnpm-lock.yaml`
