const express = require("express");
const app = express();
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const jstoken = (id) => {
  return jwt.sign({ _id: id }, "mandalanagabhushan");
};
const getdeatils = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const photo = req.body.url;
  if (!email || !password || !name) {
    return res.status(400).json({
      message: "please enter all fields",
      statusCode: 400,
    });
  }
  console.log("ghgh", req.body);
  const checkuser = await user.findOne({ email: email }).maxTimeMS(20000);
  console.log(checkuser);

  if (checkuser) {
    return res.status(400).json({
      userExists: true,
      statusCode: 400,
    });
  }

  const newuser = new user({
    name: name,
    email: email,
    password: password,
    photo: req.body.url,
  });
  newuser
    .save()
    .then((doc) => {
      const token = jstoken(doc._id);
      console.log("token", token);
      res.status(200).json({
        status: "successs",
        statusCode: 200,
        token: token,
        data: {
          data: doc,
        },
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
        data: {
          user: checkuser,
        },
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
const getuser = async (req, res) => {
  try {
    const result = await user.findOne({ _id: req.user._id });
    if (result) {
      res.json({
        status: "success",
        data: {
          result,
        },
      });
    }
  } catch (e) {
    res.json({
      status: "fail",
      message: e.message,
    });
  }
};
const getparticularuser = async (req, res) => {
  try {
    // console.log("pa", req.params.id);
    const result = await user.findOne({ _id: req.params.id });
    // .populate("postedBy", "name photo");
    if (result) {
      res.json({
        status: "success",
        data: {
          data: result,
        },
      });
    } else {
      res.json({
        m: "erro",
      });
    }
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
router.post("/signup", getdeatils);
router.post("/login", handlelogin);
router.get("/", requirelogin.requirelogin, getuser);
router.get("/:id", requirelogin.requirelogin, getparticularuser);
module.exports = router;
