const mongoose = require("mongoose");

const Organisme = mongoose.model(
  "Organisme",
  new mongoose.Schema({
    nom: String,
    adresse: String,
    localisation: String,
  }, {
    timestamps: true
  })
);

module.exports = Organisme;