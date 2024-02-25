class AuthController {
  register = (req, res, next) => {
    try {
      let payload = req.body;
      let file = req.file;
      payload.image = file.filename;
      res.json({
        payload: payload,
      });
    } catch (err) {
      next(err);
    }
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
