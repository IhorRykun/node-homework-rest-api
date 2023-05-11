const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

const { PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("data base connect"))
  .catch((error) => console.log(error.message).process.exit(1));

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 4000");
});
