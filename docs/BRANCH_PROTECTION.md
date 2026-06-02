# Branch Protection Setup (Instructor, Once Per Cohort)

Run this once when you publish the FitForge template to GitHub. It locks `main`, makes `dev` the integration branch, and forces the PR flow the cohort teaches.

## 1. Create the repo

```bash
# From the fitforge_starter folder
git init
git add .
git commit -m "chore: FitForge starter for IC Stack cohort"
gh repo create stemplicity/fitforge-ic-stack --public --source=. --remote=origin --push
```

## 2. Create the dev branch

```bash
git checkout -b dev
git push -u origin dev
```

## 3. Make it a template repo

GitHub → repo → Settings → check **"Template repository"**.
(Lets students click "Use this template" if you prefer that over fork. For the cohort we use fork + PR, but template is a nice fallback.)

## 4. Protect `main`

GitHub → Settings → Branches → Add branch ruleset (or classic protection) for `main`:
- ☑ Require a pull request before merging
- ☑ Require approvals (1)
- ☑ Require status checks to pass → select the `verify` CI job
- ☑ Require branches to be up to date before merging
- ☑ Do not allow bypassing the above settings
- ☑ Restrict who can push to matching branches → maintainers only
- ☑ Block force pushes

## 5. Protect `dev` (lighter)

Add a ruleset for `dev`:
- ☑ Require a pull request before merging
- ☑ Require status checks to pass → `verify`
- ☐ Approvals optional (you review the top 5 live; the rest can stay open)
- ☑ Block force pushes

## 6. Update CODEOWNERS

Edit `.github/CODEOWNERS`, replace `@stemplicity-maintainers` with the real maintainer team or handles.

## 7. Verify

```bash
# As a student would: this should be REJECTED
git checkout main
echo "test" >> README.md
git commit -am "test"
git push origin main     # ← blocked by branch protection. Good.
```

## Per-cohort reset

After a cohort:
- Merge the top 5 PRs into `cohort-N-showcase` (not main).
- Close the rest (they live in students' forks as portfolio).
- Re-seed is automatic (the seed is deterministic). `main` is untouched, ready for cohort N+1.

## The CI gate

The `verify` workflow runs typecheck + lint + build + Playwright. The starter ships ONE failing Playwright test (the transcript-1 gap). That means CI is red on a fresh clone, by design. A student's PR turns it green when they close the gap. If a student picks a different transcript, they update the test suite for their own slice. Document this in the cohort kickoff so red CI on clone doesn't alarm anyone.
