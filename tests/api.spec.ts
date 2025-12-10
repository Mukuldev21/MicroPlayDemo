import { test, expect } from "@playwright/test";

test.describe("Microservices API Tests", () => {

    test("TC002: User Service should return users", async ({ request }) => {
        const response = await request.get("http://localhost:3001/users");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("name");
    });

    test("TC003: Order Service should return orders", async ({ request }) => {
        const response = await request.get("http://localhost:3002/orders");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("item");
    });

    test("TC004: Product Service should return products", async ({ request }) => {
        const response = await request.get("http://localhost:3004/products");
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toBeTruthy();
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("name");
    });

    test("TC005: Gateway should return aggregated data", async ({ request }) => {
        const response = await request.get("http://localhost:3000/data");
        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toHaveProperty("users");
        expect(body).toHaveProperty("orders");

        // Schema checks
        expect(Array.isArray(body.users)).toBeTruthy();
        body.users.forEach((u: any) => {
            expect(typeof u.id).toBe("number");
            expect(typeof u.name).toBe("string");
        });

        expect(Array.isArray(body.orders)).toBeTruthy();
        body.orders.forEach((o: any) => {
            expect(typeof o.id).toBe("number");
            expect(typeof o.item).toBe("string");
        });

        expect(Array.isArray(body.products)).toBeTruthy();
        body.products.forEach((p: any) => {
            expect(typeof p.id).toBe("number");
            expect(typeof p.name).toBe("string");
        });
    });
});
