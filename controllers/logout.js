const HttpError = require("../helpers/httpError");
const Users = require("../models/users");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await Users.findByIdAndUpdate(_id, { token: "" });
    res.status(200).json({
      message: "logout success"
    });
  } catch {
    HttpError(400);
  }
};

module.exports = logout;
