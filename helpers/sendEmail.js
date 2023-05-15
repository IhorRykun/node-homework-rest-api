const sgEmail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KAY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KAY);

const sendEmail = async (data) => {
  const email = { ...data, from: "ihorrykun@gmail.com" };
  await sgEmail.send(email);
  return true;
};


module.exports = sendEmail;