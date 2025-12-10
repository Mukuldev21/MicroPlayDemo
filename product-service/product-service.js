const express = require("express");
const app = express();

app.get("/products", (req, res) => {
    res.json([
        { id: 201, name: "Keyboard" },
        { id: 202, name: "Mouse" },
        { id: 203, name: "Monitor" }
    ]);
});

app.listen(3004, () => console.log("Product service running on port 3004"));
