const allRoles = {
  user: [],
  admin: ["getUsers", "manageUsers"],
  superadmin: ["getUsers", "manageUsers", "deleteUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
  