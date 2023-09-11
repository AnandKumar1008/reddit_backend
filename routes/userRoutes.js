const express = require("express");

const {
  signup,
  login,
  firebaseLogin,
  checkToken,
  logout,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/firebase", firebaseLogin);

router.post("/token", checkToken);
router.post("/logout", logout);

module.exports = router;
