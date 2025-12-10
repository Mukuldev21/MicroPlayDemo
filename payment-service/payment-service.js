const express = require("express");
const app = express();

app.get("/payments", (req, res) => {
    res.json([
        { id: 101, amount: 50, status: "Paid" },
        { id: 102, amount: 120, status: "Pending" }
    ]);
});

app.listen(3008, () => console.log("Payment service running on port 3008"));
