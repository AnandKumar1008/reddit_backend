console.log("Hare krishna");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("../routes/index.js");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);
module.exports = app;
