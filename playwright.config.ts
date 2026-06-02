import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Boot the app for the test run against a PRODUCTION build.
  // /qa verifies the real built app, not a cold dev server (whose first-hit
  // compile lag causes flaky timeouts). Assumes `npm run setup` already seeded
  // the database (Module 1 / CI both do this before testing).
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
