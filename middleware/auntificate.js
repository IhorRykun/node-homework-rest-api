const HttpError = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/users");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.header;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById(id);
    if (!user) {
      next(HttpError(401));
    }
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
