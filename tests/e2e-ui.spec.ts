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

});