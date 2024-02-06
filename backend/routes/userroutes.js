const express = require("express");
const app = express();
const user = require("../models/User");
const router = express.Router();

const getdeatils = (req, res) => {
  console.log("ghgh", req.body);
  const newuser = new user(req.body);
  newuser
    .save()
    .then((doc) => {
      res.json({
        status: "successs",
        // data: {
        //   data: doc,
        // },
      });
    })
    .catch((e) => {
      res.json({
        status: "failure",
        // mesg: e,
      });
    });
};
router.post("/signup", getdeatils);
module.exports = router;
