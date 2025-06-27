const nodemailer = require("nodemailer");
/// Transporter is configuration
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ID_FOR_NODEMAILER,
    pass: process.env.PASSWORD_FOR_NODEMAILER,
  },
});

async function sendMail (report){
      const info = await transporter.sendMail({
    from: '"Venugopal" <venugopal@gmail.email>',
    to: "venugopal.burli@masaischool.com,sumitgourav07@gmail.com,faizanrahmankhan18@gmail.com",
    subject: "Bulk Todos Updation Report",
    html: report, // HTML body
  });

}
  module.exports = sendMail;
