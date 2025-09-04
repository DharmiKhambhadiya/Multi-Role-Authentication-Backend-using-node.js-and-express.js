const jwt = require("jsonwebtoken");

exports.verifytoken = async (req, res, next) => {
  const authheader = req.headers["authorization"];
  if (!authheader)
    return res.status(403).json({ message: "Token not provided" });

  if (!authheader.startsWith("Bearer "))
    return res.status(400).json({ message: "Invaild token" });
  const token = authheader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invaild token" });
  }
};
