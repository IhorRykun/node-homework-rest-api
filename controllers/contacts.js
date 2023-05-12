const Contacts = require("../models/contact");
const HttpError = require("../helpers/httpError");
const {
  updateSchemas,
  addSchemas,
  updateFavoriteSchemas
} = require("../schemas/contacts");
const gravatar = require("gravatar");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const {
      page = 1,
      limit = 5,
      favorite = "",
      name = "",
      email = ""
    } = req.query;
    const skip = (page - 1) * limit;
    if (favorite === "" && name) {
      const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit
      }).populate("owner", "name email");
      res.json(result);
    }
    if (name === "") {
      const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit
      }).populate("owner", "favorite email");
      res.json(result);
      if (email === "") {
        const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
          skip,
          limit
        }).populate("owner", "favorite name");
        res.json(result);
      }
    } else {
      const result = await Contacts.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit
      })
        .populate("owner", "name email")
        .find({
          favorite: { $eq: favorite },
          name: { $eq: name },
          email: { $eq: email }
        });
      res.json(result);
    }
  } catch {
    next(HttpError(404));
  }
};

const getContactId = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const _id = Object(req.params.id);
    const result = await Contacts.findOne({ _id, owner });
    if (result === null) {
      next(HttpError(404, "Not found"));
    }
    if (!result) {
      HttpError(404, "Not found");
    }
    res.json(result);
  } catch {
    next(HttpError(404));
  }
};

const createContact = async (req, res, next) => {
  const body = req.body;
  const { name } = req.body;
  const { error } = addSchemas.validate(body);
  if (error) {
    HttpError(400, error.message);
  }
  const avatar = gravatar.url(name);
  const { _id: owner } = req.user;
  const result = await Contacts.create({ ...body, owner, avatar });
  res.status(201).json(result);

};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contacts.findOneAndRemove({ _id: id, owner });
    if (result === null) {
      next(HttpError(404, "Not found"));
    }
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
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contacts.findByIdAndUpdate(
      { _id: id, owner },
      { ...body },
      { new: true }
    );
    console.log(result);
    if (result === null) {
      next(HttpError(404, "Not found"));
    }
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

    const result = await Contacts.findOneAndUpdate(
      { _id: id, owner },
      { ...req.body },
      { new: true }
    );
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
