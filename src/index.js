const app = require("./app");

const mongoose = require("mongoose");

const url = "mongoose:/localhost:";

require("dotenv").config();
// Connection Establishing To DataBase
// console.log(process.env.MONGO_URI);
const port = process.env.PORT || 1080;
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://0.0.0.0/reddit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connectDb()
  .then(() => {
    console.log("DataBase Connection Successful");
  })
  .catch((err) => {
    console.log("Error", err);
  });
//
app.listen(port, () => console.log("Server is running...", port));
