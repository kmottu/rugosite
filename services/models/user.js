const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    descipline: String,
    organisme: { type: mongoose.Schema.Types.ObjectId, ref: "Organisme" },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  }, {
    timestamps: true
  })
);

module.exports = User;