const express = require("express");
const authentificate = require("../../middleware/auntificate");
const getCurrent = require("../../controllers/getCurrent");
const { userRegistration, userLogin } = require("../../controllers/users");
const logout = require("../../controllers/logout");

const router = express.Router();

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

module.exports = router;
