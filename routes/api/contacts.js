const express = require("express");
const router = express.Router();
const contact = require("../../models/contacts");
const HttpError = require("../../helpers/httpEror");
const addShemas = require("../../shemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contact.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contact.getContactById(contactId);
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addShemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const result = await contact.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contact.removeContact(contactId, req.body);

    if (!result) {
      HttpError(404, "Not found");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addShemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contact.updateContact(contactId, req.body);
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
