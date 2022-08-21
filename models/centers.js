const mongoose = require("mongoose");

const CentersSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  location: {
    address: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
});

const Center = mongoose.model("Center", CentersSchema);

module.exports = Center;
