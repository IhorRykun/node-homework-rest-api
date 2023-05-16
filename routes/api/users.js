const express = require("express");
const authentificate = require("../../middleware/auntificate");
const getCurrent = require("../../controllers/getCurrent");
const {
  userRegistration,
  userLogin,
  updateAvatar,
  verifyEmail,
  sendverifyEmail
} = require("../../controllers/users");
const logout = require("../../controllers/logout");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post("/register", userRegistration);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify/", sendverifyEmail);

router.post("/login", userLogin);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;
