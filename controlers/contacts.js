const Contacts = require("../models/contact");
const HttpError = require("../helpers/httpEror");
const {
  updateSchemas,
  addSchemas,
  updateFavoriteSchemas
} = require("../shemas/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contacts.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getCotactId = async (req, res, next) => {
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
};

const createContact = async (req, res, next) => {
  const body = req.body;

  try {
    const { error } = addSchemas.validate(body);
    if (error) {
      HttpError(400, error.message);
    }
    const result = await Contacts.create(body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
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
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateSchemas.validate(req.body);

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
};

const favoriteContacts = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchemas.validate(req.body);

    if (error) {
      HttpError(400, error.message);
    }
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
};

module.exports = {
  getAllContacts,
  createContact,
  getCotactId,
  deleteContact,
  updateContact,
  favoriteContacts
};
