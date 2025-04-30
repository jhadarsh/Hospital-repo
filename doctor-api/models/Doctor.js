const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  experience: Number,
  qualifications: [String],
  specialization: String,
  fees: Number,
  modeOfConsult: [String], // ['online', 'hospital']
  imageUrl: String,
  location: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
