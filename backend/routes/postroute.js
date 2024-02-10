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
    const posts = await post.find().populate("postedBy", "name _id photo");
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
const getpost = async (req, res) => {
  try {
    console.log("use", req.user.email);
    const postinfo = await post
      .find({ postedBy: req.user._id })
      .populate("postedBy", "name _id photo");
    // .populate("postedBy", " ._id");
    console.log("po", postinfo);
    if (postinfo) {
      res.json({
        status: "success",
        daata: {
          postinfo,
        },
      });
    }
  } catch (er) {
    res.json({
      status: "error ",
      message: er,
    });
  }
};
router.put("/like", requirelogin.requirelogin, async (req, res) => {
  try {
    const result = await post
      .findByIdAndUpdate(
        req.body.postId,
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
      .exec();
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});
router.put("/unlike", requirelogin.requirelogin, async (req, res) => {
  try {
    const result = await post
      .findByIdAndUpdate(
        req.body.postId,
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
      .exec();
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});
const comments = async (req, res) => {
  try {
    comment = {
      text: req.body.text,
      postedBy: req.user,
    };

    const result = await post
      .findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        {
          new: true,
        }
      )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};
const getparticularuser = async (req, res) => {
  try {
    // console.log("pa", req.params.id);
    const result = await post
      .find({ postedBy: req.params.id })
      .populate("postedBy", "name photo");
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
router.put("/comments", requirelogin.requirelogin, comments);
router.post("/", requirelogin.requirelogin, createpost);
router.get("/", requirelogin.requirelogin, getposts);
router.get("/mypost", requirelogin.requirelogin, getpost);
router.get("/userposts/:id", requirelogin.requirelogin, getparticularuser);
module.exports = router;
