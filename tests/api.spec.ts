import { test, expect } from "@playwright/test";

test.describe("Microservices API Integration", { tag: "@API" }, () => {

    test.describe("Core Services", () => {
        test("TC002: User Service should return users", { tag: "@Integration" }, async ({ request }) => {
            const response = await request.get("http://localhost:3001/users");
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeTruthy();
            expect(Array.isArray(body)).toBeTruthy();
            expect(body[0]).toHaveProperty("name");
        });

        test("TC003: Order Service should return orders", { tag: "@Integration" }, async ({ request }) => {
            const response = await request.get("http://localhost:3002/orders");
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeTruthy();
            expect(Array.isArray(body)).toBeTruthy();
            expect(body[0]).toHaveProperty("item");
        });

        test("TC004: Product Service should return products", { tag: "@Integration" }, async ({ request }) => {
            const response = await request.get("http://localhost:3004/products");
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeTruthy();
            expect(Array.isArray(body)).toBeTruthy();
            expect(body[0]).toHaveProperty("name");
        });
    });

    test.describe("Extension Services", () => {
        test("TC013: Payment Service should return payments", { tag: "@Integration" }, async ({ request }) => {
            const response = await request.get("http://localhost:3008/payments");
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeTruthy();
            expect(Array.isArray(body)).toBeTruthy();
            expect(body[0]).toHaveProperty("status");
        });

        test("TC014: Review Service should return reviews", { tag: "@Integration" }, async ({ request }) => {
            const response = await request.get("http://localhost:3006/reviews");
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeTruthy();
            expect(Array.isArray(body)).toBeTruthy();
            expect(body[0]).toHaveProperty("comment");
        });
    });

    test.describe("Gateway Aggregation", () => {
        test("TC005: Gateway should return aggregated data", { tag: ["@Gateway", "@Smoke"] }, async ({ request }) => {
            const response = await request.get("http://localhost:3000/data");
            expect(response.status()).toBe(200);
            const body = await response.json();

            expect(body).toHaveProperty("users");
            expect(body).toHaveProperty("orders");
            expect(body).toHaveProperty("products");
            expect(body).toHaveProperty("payments");
            expect(body).toHaveProperty("reviews");

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

            expect(Array.isArray(body.payments)).toBeTruthy();
            body.payments.forEach((py: any) => {
                expect(typeof py.id).toBe("number");
                expect(typeof py.amount).toBe("number");
                expect(typeof py.status).toBe("string");
            });

            expect(Array.isArray(body.reviews)).toBeTruthy();
            body.reviews.forEach((r: any) => {
                expect(typeof r.productId).toBe("number");
                expect(typeof r.rating).toBe("number");
                expect(typeof r.comment).toBe("string");
            });
        });
    });
});
