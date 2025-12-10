const express = require("express");
const app = express();

app.get("/reviews", (req, res) => {
    res.json([
        { productId: 201, rating: 5, comment: "Awesome!" },
        { productId: 202, rating: 4, comment: "Good value" }
    ]);
});

app.listen(3006, () => console.log("Review service running on port 3006"));
