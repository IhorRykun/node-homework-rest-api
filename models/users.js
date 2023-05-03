const { model, Schema } = require("mongoose");
const hendleMongooseError = require("../helpers/hendleError");

const usersSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"]
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", hendleMongooseError);

const Users = model("users", usersSchema);

module.exports = Users;
