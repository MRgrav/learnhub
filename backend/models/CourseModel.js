const mongoose = require('mongoose');

// Define the Course Schema
const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  estimated:{
    type:Number,
    required: true,
    min:0,
  },
  purchased: {
    type: Number,
  },
  thumbnail: {
    public_id:String,
    url:String,
  },
  category: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    required: true,
  },
  syllabus: [
    {
      chapter: {
        type: String,
        required: true,
      },
    }
  ],
  videoContents: [
    {
      title: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
      videoDescription: {
        type: String,
        required: true,
      },
    },
  ],
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          optionText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  benefits: {
    type: String,
    trim: true,
  },
});

// Create and export the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
