const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/data", async (req, res) => {
    const users = await fetch("http://localhost:3001/users").then(r => r.json());
    const orders = await fetch("http://localhost:3002/orders").then(r => r.json());
    const products = await fetch("http://localhost:3004/products").then(r => r.json());
    const payments = await fetch("http://localhost:3005/payments").then(r => r.json());
    const reviews = await fetch("http://localhost:3006/reviews").then(r => r.json());
    res.json({ users, orders, products, payments, reviews });
});

app.listen(3000, () => console.log("Gateway running on port 3000"));