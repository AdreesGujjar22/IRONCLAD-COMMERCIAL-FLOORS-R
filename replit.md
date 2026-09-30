# Ironclad Commercial Floors

Marketing website for Ironclad Commercial Floors, a 24/7 commercial flooring contractor serving Vancouver and the Lower Mainland.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ironclad-commercial-floors/src/App.tsx` — single-page marketing experience, navigation, service content, and quote interaction
- `artifacts/ironclad-commercial-floors/src/index.css` — visual system, typography, texture, motion, and responsive rules
- `artifacts/ironclad-commercial-floors/public/assets/` — official Ironclad imagery used in the page
- `artifacts/ironclad-commercial-floors/index.html` — title, social metadata, and LocalBusiness structured data

## Architecture decisions

- The site is intentionally a single scroll narrative so visitors can move from proof to services to quote without route changes.
- The quote form is currently a browser-only inquiry confirmation; it does not yet send or persist submissions.
- Official company imagery is stored locally so the public site does not depend on the source site staying available for page rendering.

## Product

Visitors can learn about commercial flooring installation, epoxy and concrete work, repair and replacement, service coverage, warranty and certification claims, then call or submit a quote inquiry.

## User preferences

The company details used in the site are sourced from the provided listing and the official Ironclad website.

## Gotchas

The quote form is not connected to a mailbox or CRM yet; a follow-up should add a real submission endpoint before launch if inquiries need to be received by the business.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
