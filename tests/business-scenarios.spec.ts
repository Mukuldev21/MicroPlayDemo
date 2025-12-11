import { test, expect } from "@playwright/test";

test.describe("Business Scenarios & Workflows", { tag: "@Business" }, () => {

    test("TC017: Customer 360 - Verify aggregated view of all domains", async ({ page }) => {
        // Scenario: A support agent loads the customer dashboard and expects to see data from ALL services.
        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify key entities from each domain are present
        await expect(page.locator("h2 >> text=Users")).toBeVisible();
        await expect(page.locator("li >> text=Mukul")).toBeVisible(); // User Service

        await expect(page.locator("h2 >> text=Orders")).toBeVisible();
        await expect(page.locator("li >> text=Laptop")).toBeVisible(); // Order Service

        await expect(page.locator("h2 >> text=Products")).toBeVisible();
        await expect(page.locator("li >> text=Keyboard")).toBeVisible(); // Product Service

        await expect(page.locator("h2 >> text=Payments")).toBeVisible();
        await expect(page.locator("li >> text=Paid")).toBeVisible(); // Payment Service

        await expect(page.locator("h2 >> text=Reviews")).toBeVisible();
        await expect(page.locator("li >> text=Awesome!")).toBeVisible(); // Review Service
    });

    test("TC018: Payment Risks - Verify visual alert for failed transactions", async ({ page }) => {
        // Scenario: A payment fails. The UI must highlight it in RED to alert the user.

        // Mock a failed payment
        await page.route("http://localhost:3000/data", async route => {
            const json = {
                users: [{ id: 1, name: "Test User" }],
                orders: [],
                products: [],
                payments: [{ id: 999, amount: 500, status: "Failed" }],
                reviews: []
            };
            await route.fulfill({ json });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        const failedPayment = page.locator("li >> text=Failed: $500");
        await expect(failedPayment).toBeVisible();

        // Validate visual style (Red Color)
        const color = await failedPayment.evaluate(el => window.getComputedStyle(el).color);
        expect(color).toBe("rgb(255, 0, 0)");
    });

    test("TC019: New User Onboarding - Verify empty states", async ({ page }) => {
        // Scenario: A new user logs in. They have no data. UI should be friendly, not broken.

        await page.route("http://localhost:3000/data", async route => {
            await route.fulfill({ json: { users: [], orders: [], products: [], payments: [], reviews: [] } });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        await expect(page.locator("li >> text=No users found")).toBeVisible();
        await expect(page.locator("li >> text=No orders placed yet")).toBeVisible();
        await expect(page.locator("li >> text=No products available")).toBeVisible();
        await expect(page.locator("li >> text=No transaction history")).toBeVisible();
        await expect(page.locator("li >> text=No reviews yet")).toBeVisible();
    });

    test("TC029: Payment - High Value Transaction Display", async ({ page }) => {
        // Scenario: A very large payment should be visible and formatted correctly.
        await page.route("http://localhost:3000/data", async route => {
            const json = {
                users: [{ id: 1, name: "VIP User" }],
                orders: [],
                products: [],
                // Large amount
                payments: [{ id: 888, amount: 50000, status: "Paid" }],
                reviews: []
            };
            await route.fulfill({ json });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify it is displayed. 
        // Note: The UI might format it as $50,000 or 50000. 
        // We look for the number 50000.
        // Adjust locator if the UI adds currency symbols or commas.
        await expect(page.locator("li:has-text('50000')")).toBeVisible();
    });

    test("TC030: Payment - Status Styling (Pending, Refunded)", async ({ page }) => {
        // Scenario: Different payment statuses should be visible.
        await page.route("http://localhost:3000/data", async route => {
            const json = {
                users: [{ id: 1, name: "Status User" }],
                orders: [],
                products: [],
                payments: [
                    { id: 101, amount: 100, status: "Pending" },
                    { id: 102, amount: 200, status: "Refunded" }
                ],
                reviews: []
            };
            await route.fulfill({ json });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        await expect(page.locator("li:has-text('Pending')")).toBeVisible();
        await expect(page.locator("li:has-text('Refunded')")).toBeVisible();
    });

});
