const nodemailer = require('nodemailer');

// Vercel Serverless function to send email via SMTP using nodemailer.
// Expects these environment variables to be set in Vercel dashboard:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { from_name, from_email, message } = req.body || {};
  if (!from_name || !from_email || !message) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  try {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!host || !user || !pass || !to) {
      res.status(500).json({ error: 'SMTP configuration missing on server' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `${from_name} <${from_email}>`,
      to,
      subject: `Portfolio contact from ${from_name}`,
      text: `Name: ${from_name}\nEmail: ${from_email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${from_name}</p><p><strong>Email:</strong> ${from_email}</p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-email error', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
