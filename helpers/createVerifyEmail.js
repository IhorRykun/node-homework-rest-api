require("dotenv").config();

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:4000/user/verify/${verificationToken}">Follow the link to verify email</a>`
  };

  return mail;
};

module.exports = createVerifyEmail;
