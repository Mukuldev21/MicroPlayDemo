import { test, expect } from "@playwright/test";

test.describe("End-to-End User Journey", () => {

    test("TC001: Should display users and orders", { tag: ["@E2E", "@Smoke"] }, async ({ page }) => {
        await page.goto("http://localhost:3003"); // UI server
        await page.click("text=Load Data");
        await expect(page.locator("ul >> text=Mukul")).toBeVisible();
        await expect(page.locator("ul >> text=Laptop")).toBeVisible();
        await expect(page.locator("ul >> text=Keyboard")).toBeVisible();
        await expect(page.locator("ul >> text=Paid")).toBeVisible();
        await expect(page.locator("ul >> text=Awesome!")).toBeVisible();
    });

    test("TC033: UI - Mobile Viewport Responsiveness", async ({ page }) => {
        // Set viewport to iPhone SE dimensions
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto("http://localhost:3003");

        // Verify title is visible without scrolling issues (basic sanity)
        await expect(page.locator("h1")).toBeVisible();

        // Load data and check visibility in narrow view
        await page.click("text=Load Data");
        await expect(page.locator("h2 >> text=Users")).toBeVisible();
        await expect(page.locator("ul").first()).toBeVisible();
    });

    test("TC034: Data - Cross-Service Integrity", async ({ page }) => {
        // Scenario: Verify related data (User + Order) appears together.
        // We mock to ensure we have a controlled "User" and "Order".
        await page.route("http://localhost:3000/data", async route => {
            const json = {
                users: [{ id: 1, name: "Integrity Bob" }],
                orders: [{ id: 101, item: "Bob's Order" }],
                products: [],
                payments: [],
                reviews: []
            };
            await route.fulfill({ json });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        await expect(page.locator("li:has-text('Integrity Bob')")).toBeVisible();
        await expect(page.locator("li:has-text(\"Bob's Order\")")).toBeVisible();
    });

    test("TC035: Reliability - Idempotency (Reload Data)", async ({ page }) => {
        // Scenario: Clicking "Load Data" multiple times should not duplicate data.
        await page.goto("http://localhost:3003");

        // First click
        await page.click("text=Load Data");
        await expect(page.locator("h2 >> text=Users")).toBeVisible();

        // Count items (real app has predefined number of mock items? 
        // We can just rely on the count of specific known items not increasing).
        // Let's count "Mukul" instances.
        const firstCount = await page.locator("li:has-text('Mukul')").count();
        expect(firstCount).toBeGreaterThan(0);

        // Second click
        await page.click("text=Load Data");

        // Wait a small bit to ensure UI had time to react if it was going to duplicate
        await page.waitForTimeout(500);

        const secondCount = await page.locator("li:has-text('Mukul')").count();
        expect(secondCount).toBe(firstCount); // Should be same, not doubled
    });

});