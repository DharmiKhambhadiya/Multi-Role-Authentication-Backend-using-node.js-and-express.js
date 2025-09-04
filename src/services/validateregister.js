//---- email and password formate---

exports.Validateregister = async (req, res, next) => {
  const { email, password } = req.body;

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check password strength
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  next();
};
