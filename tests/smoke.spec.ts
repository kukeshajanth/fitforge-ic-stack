import { test, expect } from "@playwright/test";

// These two pass out of the box. They prove the app runs.
test("home page lists classes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Rhythm Ride")).toBeVisible();
});

test("staff view shows waitlist position", async ({ page }) => {
  await page.goto("/staff/waitlists");
  await expect(page.getByText("Priya R.")).toBeVisible();
  // The staff view DOES show position.
  await expect(page.getByText(/of 7/).first()).toBeVisible();
});

// This one FAILS on purpose. It is the transcript-1 acceptance test.
// The customer-facing class page does not show the member's waitlist
// position. Priya is on the waitlist but cannot see "Position 3 of 7".
// When an IC closes the gap, this test goes green. Until then, it stays red.
// CI is red by design. That is the slice waiting to be built.
test("customer can see their waitlist position [transcript-1 slice]", async ({ page }) => {
  // The current member (Priya) is on the Rhythm Ride waitlist.
  // Find the Rhythm Ride class and open it.
  await page.goto("/");
  await page.getByText("Rhythm Ride").first().click();
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("You are on the waitlist.")).toBeVisible();

  // The customer should see their position. Today they do not.
  // Build the slice that makes this pass.
  await expect(page.getByText(/Position 3 of 7|Position 3/)).toBeVisible();
});
