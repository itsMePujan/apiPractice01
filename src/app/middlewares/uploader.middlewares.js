//file handling
const multer = require("multer");
const fs = require("fs");
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = req.uploadDir;
    //let path = "./public/users/image/";
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

module.exports = fileUploader;
