const express = require("express");
const app = express();

app.get("/users", (req, res) => {
    res.json([{ id: 1, name: "Mukul" }, { id: 2, name: "Alice" }]);
});

app.listen(3001, () => console.log("User service running on port 3001"));