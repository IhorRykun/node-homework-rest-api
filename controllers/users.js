const HttpError = require("../helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchemas, loginSchemas } = require("../schemas/users");
const Users = require("../models/users");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

require("dotenv").config();
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;
const { PORT } = process.env;

const userRegistration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    const { error } = registerSchemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUsers = await Users.create({
      ...req.body,
      password: hasPassword,
      avatarURL
    });

    res.status(201).json({
      user: {
        email: newUsers.email,
        subscription: "starter",
        avatarURL: newUsers.avatarURL
      }
    });
  } catch {
    next(HttpError(404));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchemas.validate(req.body);
    if (error) {
      HttpError(400, error.message);
    }
    const user = await Users.findOne({ email });
    console.log(user);
    if (!user) {
      HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      HttpError(401, "Email or password invalid");
    }
    const payload = {
      id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await Users.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      seccuse: true,
      token,
      user: {
        email: user.email,
        name: user.name
      }
    });
  } catch {
    next(HttpError(400));
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id, name } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${name}_${originalname}`;

    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = `http://localhost:${PORT}/avatars/${fileName}`;
    console.log(avatarURL);

    // Jimp.read(avatarURL).then((avatar) => {
    //   return avatar.resize(250, 250).write(avatarURL);
    // });

    Jimp.read(avatarURL, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).write(`public/avatars/${fileName}`, () => {
        fs.unlink(req.file.path);
      });
    });

    await Users.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL
    });
  } catch {
    next(HttpError(500));
  }
};

module.exports = {
  userRegistration,
  userLogin,
  updateAvatar
};
