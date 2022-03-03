const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.rugosite = require("./rugosite");
db.mesure = require("./mesure");
db.organisme = require("./organisme");
db.transformation = require("./transformation");

db.ROLES = ["USER", "ADMIN"];

module.exports = db;