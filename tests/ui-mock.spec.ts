import { test, expect } from "@playwright/test";

test.describe("Frontend Isolation Tests (Mocked)", { tag: ["@UI", "@Mock"] }, () => {

    test("TC011: Should display mocked data when Backend is mocked", async ({ page }) => {
        // Mock the Gateway API response
        await page.route("http://localhost:3000/data", async route => {
            const json = {
                users: [{ id: 999, name: "Mocked User 1" }, { id: 888, name: "Mocked User 2" }],
                orders: [{ id: 777, item: "Mocked Item A" }],
                products: [{ id: 666, name: "Mocked Product X" }],
                payments: [{ id: 555, amount: 999, status: "Mocked Paid" }],
                reviews: [{ productId: 666, rating: 1, comment: "Mocked Comm" }]
            };
            await route.fulfill({ json });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify that the UI displays the MOCKED data, not the real data
        await expect(page.locator("ul >> text=Mocked User 1")).toBeVisible();
        await expect(page.locator("ul >> text=Mocked Item A")).toBeVisible();
        await expect(page.locator("ul >> text=Mocked Product X")).toBeVisible();
        await expect(page.locator("ul >> text=Mocked Paid")).toBeVisible();
        await expect(page.locator("ul >> text=Mocked Comm")).toBeVisible();

        // Verify real data is NOT present
        await expect(page.locator("ul >> text=Mukul")).not.toBeVisible();
    });

    test("TC012: Should handle empty data gracefully from Backend", async ({ page }) => {
        await page.route("http://localhost:3000/data", async route => {
            await route.fulfill({ json: { users: [], orders: [], products: [], payments: [], reviews: [] } });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify headers exist but lists are empty
        await expect(page.locator("h2 >> text=Users")).toBeVisible();
        const listItems = await page.locator("li").count();
        expect(listItems).toBe(0);
    });

});
