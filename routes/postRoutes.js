const express = require("express");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const {
  uploadPost,

  allPost,
  noUserPost,
  getPost,
} = require("../controllers/postControllers");
const router = express.Router();

// const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/upload", upload.single("image"), uploadPost);
router.post("/nouser", noUserPost);
router.get("/all", allPost);
router.get("/:id", getPost);
module.exports = router;
