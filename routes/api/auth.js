const express = require("express");
const Users = require("../../models/users");
const HttpError = require("../../helpers/httpEror");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const { SECRET_KEY } = process.env;

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
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
});

module.exports = router;
