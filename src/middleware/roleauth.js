exports.adminroleAuth = (...allow) => {
  return (req, res, next) => {
    if (!allow.includes(req.user.role))
      return res
        .status(403)
        .json({ success: false, message: "access denaied" });
    next();
  };
};
