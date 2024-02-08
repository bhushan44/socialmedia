const express = require("express");
const app = express();
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jstoken = (id) => {
  return jwt.sign({ _id: id }, "mandalanagabhushan");
};
const getdeatils = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  if (!email || !password || !name) {
    return res.status(400).json({
      message: "please enter all fields",
      statusCode: 400,
    });
  }
  console.log("ghgh", req.body);
  const checkuser = await user.findOne({ email: email });
  console.log(checkuser);

  if (checkuser) {
    return res.status(400).json({
      userExists: true,
      statusCode: 400,
    });
  }

  const newuser = new user(req.body);
  newuser
    .save()
    .then((doc) => {
      const token = jstoken(doc._id);
      console.log("token", token);
      res.status(200).json({
        status: "successs",
        statusCode: 200,
        token: token,
        // data: {
        //   data: doc,
        // },
      });
    })
    .catch((e) => {
      res.json({
        status: "failure",
        message: e,
      });
    });
};
const handlelogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        statusCode: 400,
      });
    }
    const checkuser = await user.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (checkuser) {
      return res.status(200).json({
        userExists: true,
        statusCode: 200,
      });
    } else {
      return res.json({
        userExists: false,
      });
    }
  } catch (e) {
    res.json({
      statusCode: 400,
    });
  }
};
router.post("/signup", getdeatils);
router.post("/login", handlelogin);
module.exports = router;
