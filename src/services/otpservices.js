const User = require("../model/user");
const PendingUser = require("../model/pendinguser");

exports.verifyOTPAndCreateUser = async ({ email, otp, role }) => {
  const pendingUser = await PendingUser.findOne({ email });
  if (!pendingUser) throw new Error("User not found or already verified");

  // If OTP expired → don’t delete pending user, just throw error
  if (Date.now() > pendingUser.otpexpiry) {
    throw new Error("OTP expired. Please request a new OTP.");
  }

  if (pendingUser.otp !== otp) throw new Error("Invalid OTP");

  // ✅ If OTP is valid → create permanent user
  const newUser = new User({
    email: pendingUser.email,
    password: pendingUser.password,
    isVerified: true,
    role: pendingUser.role || role,
  });

  await newUser.save();
  await PendingUser.deleteOne({ email }); // remove from pending
  return newUser;
};
