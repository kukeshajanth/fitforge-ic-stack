# FitForge — CLAUDE.md

## What this is
The starter repo for the IC Stack cohort. A real Next.js 14 + Prisma + SQLite gym app. You will Plan, Design, Build, and Ship a feature against it.

## The IC seat
You are not "writing code." You are the IC running the full arc. Plan, Design, Build, Ship. Claude Code is the brain. Codex is the muscle. You direct both.

## Stack
- Next.js 14 App Router (`app/`)
- Tailwind (`tailwind.config.ts`, brand colors under `forge.*`)
- Prisma + SQLite (`prisma/schema.prisma`, seeded by `prisma/seed.ts`)
- Playwright for tests

## Run it
```
npm install
cp .env.example .env
npm run setup   # generate client, create db, seed
npm run dev
```

## Where things live
- `app/page.tsx` — class list (home)
- `app/classes/[id]/page.tsx` — class detail, book or waitlist. **Contains the transcript-1 gap.**
- `app/my-bookings/page.tsx` — member's bookings + waitlists
- `app/staff/waitlists/page.tsx` — staff view, **shows waitlist position**
- `app/api/` — `classes`, `bookings`, `waitlist` routes (the waitlist route returns position; the UI just doesn't show it)
- `lib/prisma.ts` — the Prisma client singleton
- `prisma/seed.ts` — the FitForge scenario (Priya = position 3 of 7)

## The current member
For the cohort, the "logged-in member" is hardcoded to Priya (`priya@example.com`) in the page files. A real app reads this from a session. If your slice needs a different member, change the constant or build a session.

## Conventions
- Commit after each task. Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Planning artifacts live at repo root: `plan.md`, `PLAN.md`, `discovery_gate.md`, etc.
- Your authored skills live in `.claude/skills/`.
- Never push to `main`. PR into `dev`. See CONTRIBUTING.md.

## My IC arc
<!-- IC: fill this in during Module 1, prompt 1.2. One paragraph. Specific feature, specific user, specific outcome, specific surface you'll ship to. -->

## Status
- Day 1: ____
- Day 2: ____
- Shipped: ____ (URL when /ship completes)
