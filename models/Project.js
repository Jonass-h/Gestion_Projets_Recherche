const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Refers to the users collection.
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
