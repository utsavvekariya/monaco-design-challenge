# Monaco Design Challenge

A preview environment built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

## Quick start

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env
npm run dev        # → http://localhost:5173
```

## Scripts

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR          |
| `npm run build`     | Type-check (project refs) and build for prod |
| `npm run preview`   | Preview the production build locally        |
| `npm run typecheck` | Type-check the whole workspace, no emit     |
| `npm run lint`      | Lint with ESLint (flat config, type-aware)  |
| `npm run lint:fix`  | Lint and auto-fix                           |
| `npm run format`    | Format the repo with Prettier               |

## Project layout

```
.
├── public/                 # Static assets served as-is (favicon, robots.txt, …)
├── src/
│   ├── app/                # App shell — providers, routing, root component
│   ├── assets/             # Imported assets (images, fonts, svg)
│   ├── components/
│   │   └── ui/             # Reusable, presentational UI primitives
│   ├── features/           # Feature modules (vertical slices)
│   ├── hooks/              # Cross-cutting custom hooks
│   ├── lib/                # Pure utilities and clients (no React)
│   ├── pages/              # Route-level views composed from features/components
│   ├── styles/             # Global CSS + Tailwind theme tokens
│   ├── types/              # Shared ambient + domain types
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite + import.meta.env typings
├── eslint.config.js        # ESLint flat config (type-aware)
├── index.html              # Vite HTML entry
├── tsconfig.json           # Solution file (project references)
├── tsconfig.app.json       # App TS config (browser)
├── tsconfig.node.json      # Tooling TS config (vite.config, eslint.config)
└── vite.config.ts          # Vite + React + Tailwind plugin
```

### Conventions

- **Path alias:** `@/*` → `src/*`. Prefer it over deep relative imports.
- **Imports order:** external → internal (`@/...`) → relative; type-only imports are inline (`import { type Foo }`).
- **Components:** PascalCase files, named exports, colocate component-specific subfiles next to the component.
- **Features:** put domain logic under `src/features/<name>/` (components, hooks, api, types). Pages compose features.
- **Styling:** Tailwind utility-first; design tokens live in `src/styles/globals.css` under `@theme`.
- **State:** lift only what's shared; reach for context or a store *after* prop-drilling actually hurts.
- **Env:** only `VITE_`-prefixed vars are exposed to the client. Type them in `src/vite-env.d.ts`.

## Tooling notes

- **Tailwind v4** uses the first-party Vite plugin (`@tailwindcss/vite`); no `postcss.config.js` or `tailwind.config.js` needed. Theme tokens are defined inline via `@theme` in CSS.
- **TypeScript** runs in strict mode with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. Project references keep app and tooling type checks isolated.
- **ESLint** uses the flat config with `typescript-eslint` recommended type-checked + stylistic rules, plus `react-hooks` and `react-refresh`.
