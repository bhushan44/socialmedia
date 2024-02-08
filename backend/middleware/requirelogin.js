const jwt = require("jsonwebtoken");
const user = require("../models/User");
exports.requirelogin = (req, res, next) => {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    return res.json({
      err: "you must be logged in",
    });
  }
  const token = header.split(" ")[1];
  console.log("header", token);
  jwt.verify(token, "mandalanagabhushan", (err, payload) => {
    if (err) {
      return res.json({
        message: "user must be logged in",
      });
    } else {
      const { _id } = payload;
      user
        .findOne({ _id: _id })
        .then((doc) => {
          console.log("doc", doc);
          req.user = doc;
          next();
        })
        .catch((e) => {
          return res.json({
            message: "something went wrong",
          });
        });
    }
  });
};
