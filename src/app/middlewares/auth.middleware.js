require("dotenv").config();
const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  //token
  try {
    let token = null;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    }
    if (req.headers["x-xsrf-token"]) {
      token = req.headers["x-xsrf-token"];
    }
    if (req.headers["token"]) {
      token = req.query["token"];
    }

    //token =>null , "Bearer token" , "token"

    if (token === null) {
      next({ code: 400, message: "Login required" });
    } else {
      token = token.split(" ").pop();
      if (!token) {
        next({ code: 400, message: "Login required.." });
      } else {
        let data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data);

        //TODO DBS

        let creds = {
          _id: 11,
          name: "Pujan Poudel",
          email: "pujan@email.com",
          status: "active",
          role: "admin",
          token: null,
          password: "$2a$10$3jaqnzJFN0k6LvMgnLkTdOpizoKM7SYf1pvbG89ADLmomHlZe0",
        };

        if (creds) {
          req.authUser = creds;
          next();
        } else {
          next({ code: 400, message: "User does not exists anymore" });
        }
      }
    }
  } catch (excpt) {
    next({ code: 401, message: "Invalid Signature" });
  }
};

module.exports = checkLogin;
