const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const { DB_HOST } = process.env;

const { PORT } = process.env;

app.use(express.static("public"));

mongoose
  .connect(DB_HOST)
  .then(() => console.log("data base connect"))
  .catch((error) => console.log(error.message).process.exit(1));

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 4000");
});
