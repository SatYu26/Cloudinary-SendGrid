const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

emailFeedback = (req, res) => {
  console.log(req.body);
};

module.exports = { emailFeedback };
