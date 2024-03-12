require("dotenv").config();
const { generateRandomString } = require("../../config/helpers");
const nodemailer = require("nodemailer");
const mailSvc = require("../../services/mail.service");
const authSrv = require("./auth.services");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
class AuthController {
  register = async (req, res, next) => {
    try {
      let payload = req.body;
      //images-files
      if (req.file) {
        payload.image = req.file.filename;
      } else if (req.files) {
        payload.image = req.files.map((items) => item.filename);
      }
      payload.status = "inactive";
      payload.token = generateRandomString(15);
      //TODO : DB Store

      //MAIL-OTP
      let mailMssg = authSrv.registerEmailMessage(payload.name, payload.token);
      const mailArc = mailSvc.emailSend(payload.email, "test second", mailMssg);

      res.json({
        payload: payload,
      });
    } catch (err) {
      next(err);
    }
  };
  //verify_Token
  verifyToken = (req, res, next) => {
    try {
      let token = req.params.token;
      //TODO : Db
      if (token) {
        res.json({
          result: {},
          message: "valid token",
          meta: null,
        });
      } else {
        res.status(400).json({
          result: {},
          message: "invalid token",
          meta: null,
        });
      }
    } catch (excpt) {
      next(excpt);
    }
  };
  //Create_Password
  async setPassword(req, res, next) {
    try {
      let data = req.body;
      let token = req.params.token;
      //encryptPassword
      let encPass = bcrypt.hashSync(data.password, 10);
      data.encpass = encPass;
      console.log(data);
      //TODO : DB
      res.json({
        result: data,
        message: "Password Saved",
        meta: null,
      });
    } catch (excpt) {
      next(excpt);
    }
  }

  async login(req, res, next) {
    //TODO : DBS

    try {
      let payload = req.body;
      console.log(payload);
      //dummydata
      let creds = {
        _id: 11,
        name: "Pujan Poudel",
        email: "pujan@email.com",
        status: "active",
        role: "admin",
        token: null,
        password: "$2a$10$3jaqnzJFN0k6LvMgnLkTdOpizoKM7SYf1pvbG89ADLmomHlZe0",
      };

      if (bcrypt.compareSync(creds.password, payload.password)) {
        let token = jwt.sign(
          {
            userId: creds.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        let refreshToken = jwt.sign(
          {
            userId: creds.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.json({
          result: {
            token: token,
            refreshToken: refreshToken,
            type: "Bearer",
          },
        });
      } else {
        next({ code: 400, message: "Credentails does not match." });
      }
    } catch (excpt) {
      next(excpt);
    }
  }
  async me(req, res, next) {
    console.log("i am here");
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl;
