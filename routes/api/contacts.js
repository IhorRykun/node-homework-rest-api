const express = require("express");
const router = express.Router();
const contact = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contact.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = contact.getContactById();
  res.json(result);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
