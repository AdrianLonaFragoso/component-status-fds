const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

const writeData = (newData) => {
  fs.writeFileSync("data.json", JSON.stringify(newData, null, 2));
};

// GET route to fetch the array of objects
app.get("/api/get-data", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST route to update the array of objects
app.post("/api/update-data", (req, res) => {
  const newData = req.body;
  writeData(newData);
  res.status(200).send("Data updated successfully");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
