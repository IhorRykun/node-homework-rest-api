const Contacts = require("../models/contact");
const HttpError = require("../helpers/httpError");
const {
  updateSchemas,
  addSchemas,
  updateFavoriteSchemas
} = require("../schemas/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { name, email } = req.body;
    const { page = 1, limit = 5, favorite = "" } = req.query;
    const skip = (page - 1) * limit;
    if (favorite === "" || name === "" || email === "") {
      const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit
      }).populate("owner", "name email");
      res.json(result);
    } else {
      const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit
      })
        .populate("owner", "name email")
        .find({ favorite: { $eq: favorite } });
      res.json(result);
    }
  } catch {
    next(HttpError(404));
  }
};
const getContactId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contacts.findById(id, owner);
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch {
    next(HttpError(404));
  }
};

const createContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = addSchemas.validate(body);
    if (error) {
      HttpError(400, error.message);
    }
    const { _id: owner } = req.user;
    const result = await Contacts.create({ ...body, owner });
    res.status(201).json(result);
  } catch {
    next(HttpError(404));
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contacts.findByIdAndRemove(id, owner);

    if (!result) {
      HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    });
  } catch {
    next(HttpError(404));
  }
};

const updateContact = async (req, res, next) => {
  const body = req.body;
  try {
    const { error } = updateSchemas.validate(body);

    if (error) {
      HttpError(400, error.message);
    }
    const { _id: owner } = req.user;
    const { id } = req.params;
    if (req.query.id !== id) {
      HttpError(404, "User not privete");
    }
    const result = await Contacts.findByIdAndUpdate(id, body, { owner });
    if (!result) {
      HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch {
    next(HttpError(404));
  }
};

const favoriteContacts = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const { _id: owner } = req.user;
    const { id } = req.params;
    if (owner !== req.user) {
      HttpError(404, "User not found");
    }
    const result = await Contacts.findByIdAndUpdate(owner, id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);
  } catch {
    next(HttpError(404));
  }
};

module.exports = {
  getAllContacts,
  createContact,
  getContactId,
  deleteContact,
  updateContact,
  favoriteContacts
};
