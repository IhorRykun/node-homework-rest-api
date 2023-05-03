const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactId,
  createContact,
  deleteContact,
  updateContact,
  favoriteContacts
} = require("../../controllers/contacts");
const authenticate  = require("../../middleware/auntificate");

router.get("/", authenticate, getAllContacts);

router.get("/:id", getContactId);

router.post("/", createContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);

router.patch("/:id/favorite", favoriteContacts);

module.exports = router;
