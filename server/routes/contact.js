import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// create transporter once (good)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT || 465),
  secure: process.env.EMAIL_SECURE !== "false",
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

// verify SMTP (non-blocking log only)
transporter.verify()
  .then(() => console.log("[contact] SMTP ready"))
  .catch((err) => console.error("[contact] SMTP error:", err.message));

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

  // ✅ IMPORTANT: respond immediately (NO WAIT)
  res.status(200).json({
    success: true,
    message: "Message received successfully."
  });

  // send email in background (NO BLOCKING)
  setImmediate(async () => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        replyTo: trimmedEmail,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${trimmedName}`,
        text: `From: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
        html: `<p><b>From:</b> ${trimmedName} &lt;${trimmedEmail}&gt;</p>
               <p><b>Message:</b></p>
               <p>${trimmedMessage}</p>`,
      });

      console.log("[contact] email sent successfully");
    } catch (err) {
      console.error("[contact] email failed:", err.message);
    }
  });
});

export default router;