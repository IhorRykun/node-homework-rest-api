const express = require("express");
const Users = require("../../models/users");
const HttpError = require("../../helpers/httpEror");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res, next) => {
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

module.exports = router;
