import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/send", async (req, res) => {
  console.log("[contact] POST /send reached");
  console.log("[contact] request body:", req.body);

  const { name, email, message } = req.body;
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    console.error("[contact] validation failed: missing fields");
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    console.error("[contact] validation failed: invalid email");
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: trimmedEmail,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact Form Message from ${trimmedName}`,
      text: `From: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
      html: `<p><strong>From:</strong> ${trimmedName} &lt;${trimmedEmail}&gt;</p><p><strong>Message:</strong></p><p>${trimmedMessage}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[contact] Email sent successfully", { messageId: info.messageId });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("[contact] Email send failed:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message at this time. Please try again later.",
    });
  }
});

export default router;