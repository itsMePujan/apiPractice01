const dotenv = require("dotenv");
dotenv.config();

const UserModel = require("../users/user.model");
class AuthService {
  registerEmailMessage = (name, token) => {
    return `<b>Dear ${name} </b><br>
    This is Test Mail From ApiPractice01, <br>
    <a href="${process.env.FRONTED_URL}/activate/${token}"> click here to Activate your acc</a>
  `;
  };
  registerUser = async (payload) => {
    try {
      let user = new UserModel(payload);
      let response = await user.save();
      return response;
    } catch (excpt) {
      throw excpt;
    }
  };

  getByFilter = async (filter) => {
    try {
      let userDetail = await UserModel.findOne(filter);
      return userDetail;
    } catch (excpt) {
      throw excpt;
    }
  };
}

const authSrv = new AuthService();

module.exports = authSrv;
