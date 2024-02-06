const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");

// const app = express();
app.listen("5000", () => {
  console.log("app listenening to the port ");
});
mongoose
  .connect(
    "mongodb+srv://bhushan:bhushan@socialmedia.2quvrxg.mongodb.net/socialmedia"
  )
  .then(() => {
    console.log("connected successful");
  })
  .catch(() => {
    console.log("not conncted");
  });
// app.get("/", (req, res) => {
//   res.send("hello i love you");
// });
