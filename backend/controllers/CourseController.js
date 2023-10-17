const express = require('express');
const Course = require('../models/CourseModel');
require('dotenv').config();

const courseData = async (req, res) => {
    await Course.find()
    .then(Course => res.json(Course))
    .catch(err => res.json(err));
}

const singleCourseData = async (req, res) => {
    const cid = req.params.id;
    const data = await Course.findById(cid)

    res.json(data);
}
 
module.exports = { courseData, singleCourseData }