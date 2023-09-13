require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs/promises");

const productArr = [];
// console.log(productArr);

fs.readFile("./products.json", "utf-8")
  .then((output) => {
    const parsedData = JSON.parse(output);
    productArr.push(...parsedData);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to my Homepage" });
});

app.get("/product", (req, res) => {
  res.json(productArr);
});

app.get("/product?page=:p&limit=:l", (req, res) => {
  const { p, l } = req.params;
  console.log(p, l);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server is ready on port", port));
