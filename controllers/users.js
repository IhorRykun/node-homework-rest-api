const HttpError = require("../helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchemas, loginSchemas } = require("../schemas/users");
const Users = require("../models/users");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const userRegistration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    const { error } = registerSchemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hasPassword = await bcrypt.hash(password, 10);

    const newUsers = await Users.create({ ...req.body, password: hasPassword });
    res.status(201).json({
      user: {
        email: newUsers.email,
        subscription: "starter"
      }
    });
  } catch {
    next(HttpError(400));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const user = await Users.findOne({ email });
    console.log(user);
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
    await Users.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      seccuse: true,
      token,
      user: {
        email: user.email,
        name: user.name
      }
    });
  } catch {
    next(HttpError(400));
  }
};

module.exports = {
  userRegistration,
  userLogin
};
