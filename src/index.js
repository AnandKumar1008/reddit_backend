const app = require("./app");
const mongoose = require("mongoose");
console.log("hare krishna");
const url = "mongoose:/localhost:";
require("dotenv").config();
// Connection Establishing To DataBase
// console.log(process.env.MONGO_URI);
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
app.listen(1080, () => console.log("Server is running..."));
