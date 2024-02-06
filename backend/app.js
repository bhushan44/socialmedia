const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const userrouter = require("./routes/userroutes");
// app.get("/", (req, res) => {
//   res.send("hello i love you");
// });
app.use("/api/v1/users", userrouter);
module.exports = app;
