const mongoose = require("mongoose");
// const user =re
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});
const post = mongoose.model("post", postSchema);
module.exports = post;
