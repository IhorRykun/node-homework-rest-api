const express = require("express");
const Users = require("../../models/users");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newUsers = await Users.create(req.body);
    res.status(201).json({
      email: newUsers.email,
      password: newUsers.password
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
