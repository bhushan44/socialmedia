const express = require("express");
const app = express();
const router = express.Router();
const getdeatils = (req, res) => {
  res.send("vvddgdf");
};
router.get("/f", getdeatils);
module.exports = router;
