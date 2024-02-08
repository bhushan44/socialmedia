const express = require("express");
const app = express();
const post = require("../models/Post");
const requirelogin = require("../middleware/requirelogin");
const router = express.Router();
const createpost = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const postedBy = req.user;
  console.log(req.user);

  const newpost = new post({
    title,
    body,
    postedBy,
  });
  newpost
    .save()
    .then((doc) => {
      res.json({
        status: " posted success",
      });
    })
    .catch((e) => {
      res.json({
        status: " posted fail",
      });
    });
};
router.post("/", requirelogin.requirelogin, createpost);
module.exports = router;
