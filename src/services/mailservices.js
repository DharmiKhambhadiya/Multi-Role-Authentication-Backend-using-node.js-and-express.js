const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // your Gmail
      pass: process.env.MAIL_PASS, // your App Password
    },
  });

  // Verify connection
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified");
  } catch (error) {
    console.error("❌ SMTP connection failed:", error.message);
    throw error;
  }

  const mailOptions = {
    from: `"Multi auth" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully:", info.messageId);
  return info;
};
