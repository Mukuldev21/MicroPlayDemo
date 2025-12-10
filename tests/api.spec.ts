import { test, expect } from "@playwright/test";

test.describe("Microservices API Tests", () => {

    test("User Service should return users", async ({ request }) => {
        const response = await request.get("http://localhost:3001/users");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("name");
    });

    test("Order Service should return orders", async ({ request }) => {
        const response = await request.get("http://localhost:3002/orders");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("item");
    });

    test("Gateway should return aggregated data", async ({ request }) => {
        const response = await request.get("http://localhost:3000/data");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty("users");
        expect(body).toHaveProperty("orders");
        expect(Array.isArray(body.users)).toBeTruthy();
        expect(Array.isArray(body.orders)).toBeTruthy();
    });
});
