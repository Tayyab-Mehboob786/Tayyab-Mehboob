import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { from_name, from_email, message } = req.body;

  // 1. Setup the transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Your 16-character Google App Password
    },
  });

  try {
    // 2. Send the email
    await transporter.sendMail({
      from: `"${from_name}" <${process.env.SMTP_USER}>`, // Send FROM your email
      to: process.env.CONTACT_TO_EMAIL, // Receive AT your email
      replyTo: from_email, // Reply goes to the person who filled the form
      subject: `New Portfolio Message from ${from_name}`,
      text: `Name: ${from_name}\nEmail: ${from_email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}