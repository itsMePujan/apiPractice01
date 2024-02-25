const router = require("express").Router();
const authCtrl = require("./auth.controller");
//file handling
const multer = require("multer");
const fs = require("fs");
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = "./public/users/image/";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let randomNum = Math.ceil(Math.random() * 999);
    let ext = file.originalname.split(".").pop();
    let filename = Date.now() + "-" + randomNum + "." + ext;
    cb(null, filename);
  },
});

const fileUploader = multer({
  storage: myStorage,
});
router.post("/register", fileUploader.single("image"), authCtrl.register);

router.get("/verify-token/:token");
router.post("/set-password/:token");

router.post("/login");

router.post("/forgot-password");
router.get("/me");
router.post("logout");

module.exports = router;
