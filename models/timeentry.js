const mongoose = require("mongoose");

const timeEntrySchema = new mongoose.Schema({
  daily: {
    type: String,
    required: true,
  },
  weekly: {
    type: Number,
    required: true,
  },
  monthly: {
    type: String,
    required: true,
  },
});

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);

module.exports = TimeEntry;
