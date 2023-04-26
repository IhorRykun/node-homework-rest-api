const express = require("express");
const router = express.Router();
const Contacts = require("../../models/contact");
const HttpError = require("../../helpers/httpEror");
const schemas = require("../../shemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await Contacts.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contacts.findById(id);
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const { error } = schemas.addSchemas.validate(body);
    if (error) {
      HttpError(400, error.message);
    }
    const result = await Contacts.create(body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const result = await Contacts.findByIdAndRemove(id, body);

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
    const { error } = schemas.updateSchemas.validate(req.body);

    if (error) {
      HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
