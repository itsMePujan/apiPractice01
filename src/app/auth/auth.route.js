const router = require("express").Router();
const authCtrl = require("./auth.controller");
const fileUploader = require("../middlewares/uploader.middlewares");
const validateRequest = require("../middlewares/validate-request.middleware");
const {
  registerSchema,
  passwordSchema,
  loginSchema,
} = require("./auth.validator");
const checkLogin = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/rbac.middleware");

const dirSetup = (req, res, next) => {
  req.uploadDir = "./public/uploads/users";
  next();
};

router.post(
  "/register",
  dirSetup,
  fileUploader.single("image"),
  validateRequest(registerSchema),
  authCtrl.register
);

router.get("/verify-token/:token", authCtrl.verifyToken);

router.post(
  "/set-password/:token",
  validateRequest(passwordSchema),
  authCtrl.setPassword
);

router.post("/login", validateRequest(loginSchema), authCtrl.login);

router.post("/forgot-password", checkLogin);
//user route
router.get("/user", checkLogin, checkPermission("user"), authCtrl.me);

//admin route
router.get("/admin", checkLogin, authCtrl.me);

router.post("logout");

module.exports = router;
