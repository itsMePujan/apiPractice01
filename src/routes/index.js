const router = require("express").Router();

const userRouter = require("../app/users/user.route");
const authRouter = require("../app/auth/auth.route");
//routes
router.use("/users", userRouter);

router.use("/auth", authRouter);

module.exports = router;
