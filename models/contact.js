const { Schema, model } = require("mongoose");
const hendleMongooseError = require("../helpers/hendleError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set email for contact"]
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact"]
    },

    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    avatar: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hendleMongooseError);

const Contact = model("contacts", contactSchema);

module.exports = Contact;
