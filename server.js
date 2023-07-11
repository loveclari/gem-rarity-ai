const express = require("express");
const app = express();

const cors = require("cors");

const port = 3000;

const XLSX = require("xlsx");
const workbook = XLSX.readFile("data/data-rarity.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(sheet);

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));

app.get("/data", (req, res) => {
    fs.readFile("data/data.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.use(
    cors({
        origin: "http://localhost:3000/data",
        optionsSuccessStatus: 200,
    })
);

app.use((req, res, next) => {
    res.header("acess-Control-Allow-Origin", "http://localhost:3000/data");
    res.header(
        "Access-Control_allow-Headers",
        "Origin, x-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.static("."));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
