const { roleRights } = require("../config/roleconfig");

exports.permissionAuth = (...requiredPermissions) => {
  return (req, res, next) => {
    console.log("🔑 Decoded token payload:", req.user); 

    const userRole = req.user.role;
    const permissions = roleRights.get(userRole) || [];

    const hasPermission = requiredPermissions.every((p) =>
      permissions.includes(p)
    );

    if (!hasPermission) {
      console.log("❌ Access denied for role:", userRole);
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    console.log("✅ Access granted for role:", userRole);
    next();
  };
};
