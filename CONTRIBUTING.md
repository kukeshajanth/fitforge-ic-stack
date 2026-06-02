# Contributing to FitForge

This repo runs the real team contribution flow. You will never push to `main`. You fork, branch, and open a pull request into `dev`. This is the same flow you'd use at any company or open-source project.

## The branch model

```
main   ← protected. Read-only. Nobody pushes here directly. Ever.
dev    ← integration branch. Your PRs target this.
<you>  ← your fork, your feature branch.
```

- **`main`** is the canonical starter. Branch protection blocks direct pushes and force-pushes. The only way in is a reviewed PR from `dev`, merged by a maintainer.
- **`dev`** is where cohort work lands. You open PRs here.
- Your work lives on a **feature branch in your fork**.

## The flow (what you actually do)

```bash
# 1. Fork this repo on GitHub (button: "Fork")

# 2. Clone YOUR fork
gh repo clone <your-handle>/fitforge-ic-stack
cd fitforge-ic-stack

# 3. Add the upstream remote (the original repo)
git remote add upstream https://github.com/kukeshajanth/fitforge-ic-stack.git

# 4. Create your feature branch off dev
git fetch upstream
git checkout -b feat/<your-slice> upstream/dev

# 5. Build your slice. Commit as you go.
git commit -m "feat: <what you shipped>"

# 6. Push to your fork
git push origin feat/<your-slice>

# 7. Open a PR from your fork's feature branch INTO upstream's dev branch
gh pr create --repo kukeshajanth/fitforge-ic-stack --base dev --head <your-handle>:feat/<your-slice>
```

Your `/ship` skill (built on Day 2) automates steps 6-7.

## Pull request rules

- **Target `dev`, never `main`.** A PR to main will be closed automatically.
- **One slice per PR.** Keep it focused.
- **CI must pass.** The pipeline runs `typecheck`, `lint`, and the Playwright smoke test. A red PR does not get reviewed.
- **PR body must include:** the problem statement (from your `plan.md`), the acceptance criteria, and a link to your `/qa` log.

## Commit style

Conventional commits:
- `feat:` a new capability
- `fix:` a bug fix
- `docs:` documentation only
- `chore:` tooling, deps, config
- `refactor:` no behavior change

## What the maintainer does

The instructor (maintainer) reviews PRs into `dev`. The top 5 get merged live during Day 2's Module 10. The rest stay open as your portfolio artifact, or get merged to a `cohort-N-showcase` branch. `main` stays pristine for the next cohort.

## Why this matters

Most ICs in 2026 can prompt an AI to write code. Far fewer can land that code in a real repo with branch protection, CI gates, and a review flow. That gap is the skill. This repo teaches it.
