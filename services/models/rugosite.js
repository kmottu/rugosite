const mongoose = require("mongoose");

const Rugosite = mongoose.model(
  "Rugosite",
  new mongoose.Schema({
    nomFichier: String,
    localisationDisk: String,
    mesure: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mesure" }],
    transformation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transformation" }],
    valeur: Number,
    tags: [String],
    utilisateur: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }, {
    timestamps: true
  })
);

module.exports = Rugosite;