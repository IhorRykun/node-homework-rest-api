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
const authentificate = require("../../middleware/auntificate");

router.get("/", authentificate, getAllContacts);

router.get("/:id", authentificate, getContactId);

router.post("/", authentificate, createContact);

router.delete("/:id", authentificate, deleteContact);

router.put("/:id", authentificate, updateContact);

router.patch("/:id/favorite", authentificate, favoriteContacts);

module.exports = router;
