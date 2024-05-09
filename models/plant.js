const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  isReadyToChoose: Boolean,
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;