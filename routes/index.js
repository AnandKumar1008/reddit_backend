const router = require("express").Router();
// router.use("/user", require("./userRouters"));
router.use("/user", require("./userRoutes"));

router.use("/post", require("./postRoutes"));

router.use("/comment", require("./commentRoutes"));

module.exports = router;
