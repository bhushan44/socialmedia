const express = require("express");
const app = express();
const post = require("../models/Post");
const requirelogin = require("../middleware/requirelogin");
const router = express.Router();
const createpost = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const postedBy = req.user;
  const photo = req.body.imageUrl;
  console.log("photo", photo);
  console.log("url", postedBy);
  console.log(req.body);

  const newpost = new post({
    title,
    body,
    photo,
    postedBy,
  });
  newpost
    .save()
    .then((doc) => {
      res.json({
        message: " posted success",
      });
    })
    .catch((e) => {
      res.json({
        message: " posted fail",
        m: e,
      });
    });
};
const getposts = async (req, res) => {
  try {
    const posts = await post.find().populate("postedBy");
    if (posts) {
      res.json({
        status: "success",
        data: {
          posts,
        },
      });
    }
  } catch (e) {
    res.json({
      mes: e.message,
    });
  }
};
router.post("/", requirelogin.requirelogin, createpost);
router.get("/", requirelogin.requirelogin, getposts);
module.exports = router;
