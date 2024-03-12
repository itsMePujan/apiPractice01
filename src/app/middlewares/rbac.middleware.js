const checkPermission = (role) => {
  return (req, res, next) => {
    let loggedInUser = req.authUser;
    if (!loggedInUser) {
      next({ code: 401, message: "Unauthenticated!!!" });
    }

    if (
      (typeof role === "string" && loggedInUser.role === role) ||
      (typeof role !== "string" && role.includes(loggedInUser.role))
    ) {
      next();
    } else {
      next({ code: 401, message: "Permission Denied !!" });
    }
  };
};

module.exports = checkPermission;
