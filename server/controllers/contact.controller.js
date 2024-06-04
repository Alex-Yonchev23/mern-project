import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';
import emailValidator from 'node-email-verifier';

const validatePhone = (phone) => {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(String(phone));
};

const validateEmail = async (email) => {
  try {
    const isValid = await emailValidator(email);
    return isValid;
  } catch (error) {
    console.error('Error validating email:', error);
    return false;
  }
};

export const contact = async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({ success: false, message: "Name is required and should be at least 2 characters long" });
  }

  const isEmailValid = await validateEmail(email);
  if (!email || !isEmailValid) {
    return res.status(400).json({ success: false, message: "Valid email is required" });
  }

  if (!phone || !validatePhone(phone)) {
    return res.status(400).json({ success: false, message: "Valid phone number is required" });
  }

  if (!message || message.length < 10) {
    return res.status(400).json({ success: false, message: "Message is required and should be at least 10 characters long" });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your SMTP user
        pass: process.env.SMTP_PASS, // your SMTP password
      },
    });

    const htmlContent = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    let info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: "19502@uktc-bg.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: htmlContent,
      replyTo: email // Set the "Reply-To" header to the sender's email address
    });

    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};
