const express = require("express");
const { userRegistration, userLogin } = require("../../controlers/users");

const router = express.Router();

router.post("/register", userRegistration);

router.post("/login", userLogin);

module.exports = router;
