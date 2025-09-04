const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyOTPAndCreateUser } = require("../services/otpservices");
const {
  registerPendingUser,
  resendOTPForPendingUser,
} = require("../services/userservices");

const { Validateregister } = require("../services/validateregister");

//  to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userid: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//--------registration-------
exports.register = async (req, res) => {
  const { email, password, role = "user" } = req.body;
  try {
    await registerPendingUser({ email, password, role });
    const validateregister = await Validateregister(req, res);

    if (validateregister !== undefined && validateregister !== null) {
      return res.status(201).json({
        success: true,
        message: "OTP sent to email for verification",
        data: null,
      });
    }

    return res.status(200).json({
      success: false,
      message: "Validation failed",
      data: null,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// --- Verify OTP (User/Admin)
exports.verifyOTP = async (req, res) => {
  const { email, otp, role = "user" } = req.body;

  try {
    const user = await verifyOTPAndCreateUser({ email, otp, role });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

//-----resend otp---
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    await resendOTPForPendingUser(email);
    res
      .status(200)
      .json({ success: true, message: "New OTP sent to email", data: null });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

//--------login--------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials or email not verified",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    const token = generateToken(user);

    console.log("✅ User logged in:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", data: null });
  }
};

//--------- super admin get profile-------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.find({ role: { $in: ["admin"] } }).select(
      "-password"
    );
    if (!user || user.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not Found",
        data: null,
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile fetched", data: user });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get profile", data: null });
  }
};

//-------superadmin get by id------
exports.getProfilebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile fetched", data: user });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get profile", data: null });
  }
};

//----------super admin update profile----
exports.updateprofile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    if (email) user.email = email;
    if (role) user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: user,
    });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update", data: null });
  }
};

//-------super admin delete profile-----
exports.deleteprofile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "Deleted profile", data: null });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Delete", data: null });
  }
};

//--- admin get user--
exports.admingetuser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res
      .status(200)
      .json({ success: true, message: "Users fetched", data: users });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get users", data: null });
  }
};

//---- admingetuserbyid---
exports.admingetuserbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "User fetched", data: user });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get user", data: null });
  }
};

//---admin update user profile---
exports.adminupdateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    if (email) user.email = email;
    if (role) user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: user,
    });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update", data: null });
  }
};

//---admin delete user--
exports.admindeleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found", data: null });
    }

    res
      .status(200)
      .json({ success: true, message: "Deleted profile", data: null });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Delete", data: null });
  }
};
