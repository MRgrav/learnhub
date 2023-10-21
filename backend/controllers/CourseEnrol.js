const express = require('express');
const User = require('../models/NewUser');

const enrollCourse = async (req, res) => {
    const courseId = req.body.courseId;
    const transactionID = req.body.transactionID;
}

const courseProgress = async (req, res) => {
    const courseId = req.body.courseId;
}

const courseTest = async (req, res) => {

}

module.exports = {enrollCourse, courseProgress, courseTest}