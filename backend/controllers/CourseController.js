const express = require('express');
const Course = require('../models/CourseModel');
require('dotenv').config();

//public controller
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

//admin controller
const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    await Course.deleteOne({_id: courseId})
    .then((result) => {
        return res.json({message: "done"})
    }).catch((err) => {
        console.log(err)
    });
    console.log(req.params.id)
}
 
module.exports = { courseData, singleCourseData, deleteCourse}