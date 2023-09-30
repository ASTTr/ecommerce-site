const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(3030, () => {
  console.log("on port 3030");
});

mongoose.connect("mongodb://127.0.0.1:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", require("./routes/routes"));
