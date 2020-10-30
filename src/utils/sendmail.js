import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'mail.your-server.de',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async ({
  // email = 'markus.maelzer@gmail.com',
  email = 'zero@synelution.com',
  subject = '',
  text = '',
  html = '',
}) =>
  transporter.sendMail({
    from: 'noreply@synelution.com', // sender address
    to: email, // list of receivers
    subject: `facebook tool: ${subject}`,
    text, // plain text body
    html, // html body
  });
