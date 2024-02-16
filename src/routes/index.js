const router = require("express").Router();

const userRouter = require("../app/users/user.route");

//routes
router.use("/users", userRouter);

module.exports = router;
