const express = require("express");
const router = express.Router();
const contact = require("../../models/contacts");
const HttpError = require("../../helpers/httpEror");
const shemas = require("../../shemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contact.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contact.getContactById(id);
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
    const body = req.body;
    const { error } = shemas.addShemas.validate(body);
    if (error) {
      HttpError(400, error.message);
    }
    const result = await contact.addContact(body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const result = await contact.removeContact(id, body);

    if (!result) {
      HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const { error } = shemas.updateShemas.validate(req.body);

    if (error) {
      HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contact.updateContact(id, name, phone, email);
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
