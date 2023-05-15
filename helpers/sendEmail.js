const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ihorrykun@meta.ua",
    pass: META_PASS
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const mail = {
    ...data,
    from: "ihorrykun@meta.ua"
  };
  await transport.sendMail(mail).then(() => {
    console.log("send email").cathc((error) => console.log(error));
  });
  return true;
};

module.exports = sendEmail;
