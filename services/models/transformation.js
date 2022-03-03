const mongoose = require("mongoose");

const Transformation = mongoose.model(
  "Transformation",
  new mongoose.Schema({
    nbrLine: String,
    nbrColonne: String,
    binaryInf: String,
  }, {
    timestamps: true
  })
);

module.exports = Transformation;