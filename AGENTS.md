# AGENTS.md — FitForge (Codex)

This file orients Codex CLI when it runs against the FitForge repo.

## Project
Next.js 14 (App Router) + TypeScript + Tailwind + Prisma (SQLite). A gym class booking app.

## Setup
```
npm install && cp .env.example .env && npm run setup
```

## Run
```
npm run dev      # localhost:3000
npm run typecheck
npm run build
npm test         # Playwright
```

## Codex's role in this cohort
Codex is the **muscle** cockpit. Use Codex for:
- Raw implementation passes on a self-contained module.
- Refactor sweeps across multiple files.
- Debug loops where you re-run a focused command repeatedly.

Claude Code is the **brain** cockpit (planning, skill design, review). The IC routes each task to the right cockpit via their authored `/build` skill.

## Conventions
- Conventional commits.
- Do not touch `main`. Work on a feature branch, PR into `dev`.
- Keep changes scoped. Don't refactor unrelated files.

## Key files
- `prisma/schema.prisma` — data model
- `app/classes/[id]/page.tsx` — has the transcript-1 waitlist-position gap
- `app/staff/waitlists/page.tsx` — staff view that DOES show position
- `app/api/waitlist/route.ts` — returns position data the customer UI ignores
