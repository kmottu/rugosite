const mongoose = require("mongoose");

const Mesure = mongoose.model(
  "Mesure",
  new mongoose.Schema({
    name: String
  }, {
    timestamps: true
  })
);

module.exports = Mesure;