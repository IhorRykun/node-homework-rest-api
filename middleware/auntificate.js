const jwt = require("jsonwebtoken");
const { Users } = require("../models/users");
const HttpError = require("../helpers/httpError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
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
   req.user = user;
   console.log(user);
    next();
  } catch {
    next(HttpError(401, "invalid token"));
  }
};

module.exports = authenticate;
