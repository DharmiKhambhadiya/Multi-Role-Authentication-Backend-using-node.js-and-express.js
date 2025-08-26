const { roleRights } = require("../config/roleconfig");

exports.permissionAuth = (...requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = roleRights.get(userRole) || [];

    const hasPermission = requiredPermissions.every((p) =>
      permissions.includes(p)
    );

    if (!hasPermission) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};
