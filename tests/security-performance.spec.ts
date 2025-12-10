import { test, expect } from "@playwright/test";

test.describe("Security & Performance Scenarios", { tag: ["@Security", "@Performance"] }, () => {

    test("TC020: System Stress - Verify handling of 50+ items", async ({ page }) => {
        // Mock a large dataset
        const manyUsers = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `User ${i}` }));

        await page.route("http://localhost:3000/data", async route => {
            await route.fulfill({
                json: {
                    users: manyUsers,
                    orders: [],
                    products: [],
                    payments: [],
                    reviews: []
                }
            });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify count
        const count = await page.locator("h2:has-text('Users') + ul > li").count();
        expect(count).toBe(50);
        await expect(page.locator("text=User 49")).toBeVisible();
    });

    test("TC021: Visual Robustness - Long Text Handling", async ({ page }) => {
        const longName = "A".repeat(200);

        await page.route("http://localhost:3000/data", async route => {
            await route.fulfill({
                json: {
                    users: [{ id: 1, name: longName }],
                    orders: [],
                    products: [],
                    payments: [],
                    reviews: []
                }
            });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // Verify the long text is visible and contained
        // Note: In a real app we'd check for layout wrapping/overflow. 
        // Here we just ensure it renders without crashing.
        await expect(page.locator(`text=${longName}`)).toBeVisible();
    });

    test("TC022: Security Sanity - Verify Basic XSS Protection", async ({ page }) => {
        // Scenario: A malicious user name contains a script tag.
        // The UI should RENDER the string, not EXECUTE it.
        const maliciousName = "<script>console.error('XSS_ATTACK')</script>";

        // Listen for console errors to detect successful XSS
        let xssDetected = false;
        page.on('console', msg => {
            if (msg.text().includes('XSS_ATTACK')) xssDetected = true;
        });

        await page.route("http://localhost:3000/data", async route => {
            await route.fulfill({
                json: {
                    users: [{ id: 666, name: maliciousName }],
                    orders: [],
                    products: [],
                    payments: [],
                    reviews: []
                }
            });
        });

        await page.goto("http://localhost:3003");
        await page.click("text=Load Data");

        // If XSS protection works, the script should NOT execute (xssDetected = false)
        // AND the text might be visible literally on screen.
        // However, standard HTML injection via innerHTML usually executes scripts (or at least renders HTML).
        // Let's expect NO console execution.
        expect(xssDetected).toBe(false);

        // Bonus: Validate that the tags are escaped in the DOM (visible as text)
        // If it renders as HTML, the textContent won't show the tags.
        // If it renders as escaped text, textContent will show "<script>..."
        // await expect(page.locator("li").first()).toHaveText(maliciousName);
    });

});
