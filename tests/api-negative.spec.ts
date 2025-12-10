import { test, expect } from "@playwright/test";

test.describe("API Negative & Performance Tests", () => {

    test("User Service should return 404 for invalid endpoint", async ({ request }) => {
        const response = await request.get("http://localhost:3001/invalid-page");
        expect(response.status()).toBe(404);
    });

    test("Order Service should return 404 for invalid endpoint", async ({ request }) => {
        const response = await request.get("http://localhost:3002/non-existent-orders");
        expect(response.status()).toBe(404);
    });

    test("Gateway should return 404 for unknown route", async ({ request }) => {
        const response = await request.get("http://localhost:3000/unknown");
        expect(response.status()).toBe(404);
    });

    test("User Service response time should be < 200ms", async ({ request }) => {
        const start = Date.now();
        const response = await request.get("http://localhost:3001/users");
        const end = Date.now();
        expect(response.ok()).toBeTruthy();
        expect(end - start).toBeLessThan(200);
    });

});
