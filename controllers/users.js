const Users = require("../models/users");
const HttpError = require("../helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchenas } = require("../shemas/users");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const userRegistration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const user = await Users.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }
    const hasPassword = await bcrypt.hash(password, 10);

    const newUsers = await Users.create({ ...req.body, password: hasPassword });
    res.status(201).json({
      email: newUsers.email,
      password: newUsers.password
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchenas.validate(req.body);
  if (error) {
    HttpError(400, error.message);
  }
  const user = await Users.findOne({ email });
  if (!user) {
    HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token
  });
};

module.exports = {
  userRegistration,
  userLogin
};
