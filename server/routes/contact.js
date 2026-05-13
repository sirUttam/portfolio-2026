import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

/* =========================
   TRANSPORTER (FIXED)
========================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   VERIFY SMTP (LOG ONLY)
========================= */
transporter.verify((error, success) => {
  if (error) {
    console.log("[contact] SMTP ERROR:", error.message);
  } else {
    console.log("[contact] SMTP READY");
  }
});

/* =========================
   CONTACT ROUTE
========================= */
router.post("/send", (req, res) => {
  console.log("[contact] request received");

  const { name, email, message } = req.body;

  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  // validation
  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address."
    });
  }

  /* =========================
     SEND RESPONSE IMMEDIATELY
     (NO TIMEOUT POSSIBLE)
  ========================= */
  res.status(200).json({
    success: true,
    message: "Message received successfully."
  });

  /* =========================
     BACKGROUND EMAIL SENDING
  ========================= */
  setImmediate(async () => {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        replyTo: trimmedEmail,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${trimmedName}`,
        text: `From: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
        html: `
          <h3>New Portfolio Message</h3>
          <p><b>Name:</b> ${trimmedName}</p>
          <p><b>Email:</b> ${trimmedEmail}</p>
          <p><b>Message:</b></p>
          <p>${trimmedMessage}</p>
        `,
      });

      console.log("[contact] EMAIL SENT:", info.messageId);
    } catch (err) {
      console.log("[contact] EMAIL FAILED:", err.message);
    }
  });
});

export default router;