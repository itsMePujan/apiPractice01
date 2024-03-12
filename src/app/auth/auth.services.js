const dotenv = require("dotenv");
dotenv.config();

class AuthService {
  registerEmailMessage = (name, token) => {
    return `<b>Dear ${name} </b><br>
    This is Test Mail From ApiPractice01, <br>
    <a href="${process.env.FRONTED_URL}/activate/${token}"> click here to Activate your acc</a>
  `;
  };
}

const authSrv = new AuthService();

module.exports = authSrv;
