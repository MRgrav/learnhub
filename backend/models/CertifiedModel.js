const mongoose = require('mongoose');

// Define the Course Schema
const certificationSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  enrollmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  certifiedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  marks: {
    type: Number,
    required: true,
  }
});

// Create and export the Course model
const Certification = mongoose.model('Certification', certificationSchema);

module.exports = Certification;
