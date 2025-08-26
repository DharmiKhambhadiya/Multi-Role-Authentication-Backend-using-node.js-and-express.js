const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//--------registration-------
exports.register = async (req, res) => {
  try {
    const { email, password, role = "user" } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    if (user) {
      console.log("user already exists");
      res.status(400).json({ success: false, message: "user already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashpassword,
      role,
    });
    res.status(200).json({
      success: true,
      data: user,
      message: "Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ success: false, message: "Failed Registration" });
  }
};

//--------login--------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });

    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch)
      return res
        .status(403)
        .json({ success: false, message: "Invaild password or Email" });

    //-----generate token
    const token = await jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ success: false, message: "login failed" });
  }
};

//--------- super admin get profile-------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.find({ role: { $in: ["user", "admin"] } }).select(
      "-password"
    );
    if (!user) return res.status(400).json({ message: "User not Found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ success: false, message: "Failed to get profile" });
  }
};

//-------superadmin get by id------

exports.getProfilebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(400).json({ messgae: "user not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

//----------super admin update profile----
exports.updateprofile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "user not found" });

    if (email) user.email = email;
    if (role) user.role = role;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Updated successfully", data: { user } });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ message: "Failed to update" });
  }
};

//-------super admin delete profile-----
exports.deleteprofile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(400).json({ message: "user not found" });

    res.status(200).json({ success: false, message: "Deleted profile" });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ messge: "Failed to Delete" });
  }
};
