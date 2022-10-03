const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
//connect to DB
mongoose
  .connect("mongodb://localhost/blog")
  .then(() => console.log("db connected"))
  .catch((e) => console.log("error"));

app.listen(3000, () => console.log("Server up at port 3000"));
