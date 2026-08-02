import { test, expect } from "@playwright/test";

test.describe("Dental Clinic End-to-End Booking Flow", () => {
  test("Patient completes online booking widget successfully", async ({ page }) => {
    // 1. Visit booking widget
    await page.goto("/book/smile-care-indore");

    // Verify Title / Branding
    await expect(page.locator("body")).toContainText("Smile Care Dental Clinic");

    // 2. Select Service (Teeth Cleaning)
    await page.click("text=Teeth Cleaning");
    await page.click("button:has-text('Continue to Select Date')");

    // 3. Select Date (Today or Tomorrow button)
    await page.click("button:has-text('Tomorrow')");
    await page.click("button:has-text('Continue to Select Time')");

    // 4. Select Time Slot
    await page.click("button:has-text('10:00 AM')");
    await page.click("button:has-text('Continue to Patient Details')");

    // 5. Fill Patient Information
    await page.fill("input[label='Full Name'], input[placeholder*='Ramesh']", "E2E Test Patient");
    await page.fill("input[label*='Phone'], input[placeholder*='98765']", "9876543210");

    // 6. Submit Booking
    await page.click("button:has-text('Confirm & Send WhatsApp Ticket')");

    // 7. Verify Success State
    await expect(page.locator("h2")).toContainText("Booking Confirmed!", { timeout: 10000 });
    await expect(page.locator("body")).toContainText("WhatsApp Ticket Details");
  });

  test("Clinic owner dashboard loads live feed and metrics", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page.locator("h1")).toContainText("Clinic Operations & Realtime Feed");
    await expect(page.locator("body")).toContainText("Live Bookings Feed");
    await expect(page.locator("body")).toContainText("Human Call-Back Queue");
  });
});
