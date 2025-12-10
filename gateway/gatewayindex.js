const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/data", async (req, res) => {
    const users = await fetch("http://localhost:3001/users").then(r => r.json());
    const orders = await fetch("http://localhost:3002/orders").then(r => r.json());
    res.json({ users, orders });
});

app.listen(3000, () => console.log("Gateway running on port 3000"));