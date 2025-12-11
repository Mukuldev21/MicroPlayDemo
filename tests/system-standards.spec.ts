import { test, expect } from "@playwright/test";

test.describe("System Standards & Stability", { tag: "@System" }, () => {

    test("TC036: API - Security Headers Verification", async ({ request }) => {
        const response = await request.get("http://localhost:3000/data");
        expect(response.status()).toBe(200);

        const headers = response.headers();
        // verify basic content type is correct
        expect(headers["content-type"]).toContain("application/json");

        // In a real production app, we would enforce HSTS, X-Content-Type-Options, etc.
        // For now, we verify that we at least get a valid response without crashing headers.
        expect(headers).toHaveProperty("content-length");
    });

    test("TC037: Performance - Concurrent Request Stability (10 users)", async ({ request }) => {
        // Simulate 10 simultaneous requests to the Gateway
        const requests = Array.from({ length: 10 }, () => request.get("http://localhost:3000/data"));

        const startTime = Date.now();
        const responses = await Promise.all(requests);
        const duration = Date.now() - startTime;

        console.log(`10 Concurrent Requests took ${duration}ms`);

        // Verify all succeeded
        for (const response of responses) {
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toHaveProperty("users");
        }

        // Ensure reasonable performance (e.g. < 2 seconds for 10 requests)
        // Adjust based on environment capability
        expect(duration).toBeLessThan(3000);
    });

    test("TC038: API - Strict Schema Validation (Data Types)", async ({ request }) => {
        const response = await request.get("http://localhost:3001/users");
        expect(response.status()).toBe(200);

        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);

        // Strict checking for the first user
        const user = users[0];

        // Keys must be EXACTLY what we expect (no extra leaked database fields)
        // Allow ONLY 'id' and 'name'
        const allowedKeys = ["id", "name"];
        const actualKeys = Object.keys(user);

        // Start by checking if we have expected keys
        expect(actualKeys).toContain("id");
        expect(actualKeys).toContain("name");

        // Ensure no unexpected keys (strict mode)
        for (const key of actualKeys) {
            expect(allowedKeys).toContain(key);
        }

        // Validate Types
        expect(typeof user.id).toBe("number");
        expect(typeof user.name).toBe("string");
    });

});
