const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const doctorRoutes = require("./routes/doctorRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Mongoose connection (cleaned)
mongoose.connect("mongodb+srv://adarsh:dbadarsh@cluster0.24ajbx2.mongodb.net/doctorsDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api", doctorRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
