const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const filePath = path.join(__dirname, "messages.json");

app.post("/contact", (req, res) => {
    const newMessage = req.body;

    let messages = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.get("/messages", (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
  console.log("Server running...");
});