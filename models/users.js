const mongoose = require("mongoose");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const marked = require("marked");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

usersSchema.pre("validate", function (next) {
  try {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    if (this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
  } catch (error) {
    next(error);
  }
  next();
});

module.exports = mongoose.model("users", usersSchema);
