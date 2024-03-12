const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      //console.log(req);
      let payload = req.body;
      let token = req.params.token;
      // console.log(payload);
      const { error } = schema.validate(payload);
      if (error) {
        next(error);
      }
      next();
    } catch (excpt) {
      next(excpt);
    }
  };
};

module.exports = validateRequest;
