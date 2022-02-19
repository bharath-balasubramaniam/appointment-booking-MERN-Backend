const nodemailer = require("nodemailer");
const { Reset } = require("./mailTemplate");
const getEmailData = (to, name, template) => {
  let data = null;
  switch (template) {
    case "reset":
      data = {
        from: "DR.Vishalini  <bvourselves@gmail.com>",
        to,
        subject: "Password Reset",
        html: Reset(),
      };
      break;
    default:
      data;
  }
  return data;
};
const sendEmail = (to, name, type) => {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.mail.google.com",
    secure: false,
    port: 587,
    service: "Gmail",
    auth: {
      user: process.env.MAILER_USER_ID,
      pass: process.env.MAILER_PASSWORD,
    },
    debug: false,
    logger: true,
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };
