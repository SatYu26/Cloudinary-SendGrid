const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

emailFeedback = (req, res) => {
  const { name, email, message, phone, uploadedFiles } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: "Feedback form",
    html: `
    <h1>Customer Feedback Form</h1>
    <hr />
    <h2>Sender Name: ${name}</h2>
    <h2>Sender email: ${email}</h2>
    <h2>Sender Phone: ${phone}</h2>
    <h2>Sender Message: ${message}</h2>
    <br />
        ${uploadedFiles.map((file) => {
          return `<img src="${file.secure_url}" alt="${file.original_filename}" style="width:50%; overflow:hidden; padding:50px;" />`;
        })}

    <hr />
    <p>https://satyamgoyal.codes</p>
    `,
  };

  sgMail
    .send(emailData)
    .then((sent) => {
      console.log(sent);
      return res.json({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        success: false,
      });
    });
};

module.exports = { emailFeedback };
