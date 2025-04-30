const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Add doctor
router.post("/add-doctor", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.delete("/delete-doctor/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

// List doctors with filter and pagination
router.get("/list-doctor-with-filter", async (req, res) => {
  const { page = 1, limit = 10, mode, experience, fee } = req.query;

  const query = {};

  if (mode) query.modeOfConsult = mode;
  if (experience) {
    const [min, max] = experience.split("-").map(Number);
    query.experience = { $gte: min, $lte: max };
  }
  if (fee) {
    const [minFee, maxFee] = fee.split("-").map(Number);
    query.fees = { $gte: minFee, $lte: maxFee };
  }

  const doctors = await Doctor.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(doctors);
});

module.exports = router;
