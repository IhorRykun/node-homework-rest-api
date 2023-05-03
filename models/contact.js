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
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { versionKey: false }
);

contactSchema.post("save", hendleMongooseError);

const Contact = model("contacts", contactSchema);

module.exports = Contact;
