const {
  postComment,
  uploadCommnet,
  countComment,
} = require("../controllers/commetControllers");

const router = require("express").Router();

router.post("/upload", uploadCommnet);
router.get("/post/:id", postComment);
router.get("/:id", countComment);
module.exports = router;
