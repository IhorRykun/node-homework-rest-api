const HttpError = require("../helpers/httpEror");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Users } = require("../models/users");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.header;
  const [bearer, token] = authorization.spil(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
