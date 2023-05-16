const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  method: "GET",
  auth: {
    user: "ihorrykun@meta.ua",
    pass: process.env.META_PASSWORD
  }
};

const transporter = nodemailer.createTransport(config);
const emailOptions = async (data) => {
  const mail = {
    ...data,
    from: "ihorrykun@meta.ua"
  };
  await transporter
    .sendMail(mail)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  return true;
};

module.exports = emailOptions;
