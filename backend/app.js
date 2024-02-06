const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
const userrouter = require("./routes/userroutes");
// app.get("/", (req, res) => {
//   res.send("hello i love you");
// });
app.use("/api/v1/users", userrouter);
module.exports = app;
