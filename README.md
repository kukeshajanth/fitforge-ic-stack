# FitForge

Book your class. Forge your week.

FitForge is the starter app for the **IC Stack** cohort. It is a real, runnable Next.js 14 app for a fast-growing gym chain. You clone it, run it, and ship a feature against it over the cohort.

## Tech stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Prisma + SQLite** (local, zero external database)
- **Playwright** for tests

## Quick start (5 minutes)

```bash
# 1. Clone your fork
gh repo clone <your-handle>/fitforge-ic-stack
cd fitforge-ic-stack

# 2. Install dependencies
npm install

# 3. Set up your environment
cp .env.example .env

# 4. Generate the Prisma client, create the database, seed it
npm run setup

# 5. Run it
npm run dev
```

Open `http://localhost:3000`. You should see the class list with Rhythm Ride showing a waitlist.

## What you'll see

- **`/`** — the class list. Rhythm Ride is full, with a waitlist.
- **`/classes/[id]`** — a class page. Book or join the waitlist.
- **`/my-bookings`** — your bookings and waitlists (the current member is Priya).
- **`/staff/waitlists`** — the front-desk view. **This shows waitlist position. The customer app does not.**

## The thing you'll notice

Open `/staff/waitlists`. You'll see "Priya R. — Position 3 of 7." That data is real, it's in the database. Now open `/classes/<rhythm-ride-id>` as the customer. The customer is on the waitlist but **cannot see their position.** That blind spot is why Priya texts the front desk twice a week. Closing it is one of the slices you can build.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run setup` | Generate Prisma client + create + seed the database |
| `npm run seed` | Re-seed the database |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Production build |
| `npm test` | Playwright tests |

## Contributing
You do not push to `main`. See [CONTRIBUTING.md](./CONTRIBUTING.md). Fork, branch, PR into `dev`.

## Data model
See `prisma/schema.prisma`. Members, classes, bookings, waitlists, locations, instructors, and a sparse workout log. The seed (`prisma/seed.ts`) sets up the FitForge scenario including Priya's waitlist position.
