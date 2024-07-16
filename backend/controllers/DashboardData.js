const express = require('express');
const User = require('../models/NewUser');
const Course = require('../models/CourseModel');
const Enrollment = require('../models/EnrollmentModel');
const Certification = require('../models/CertifiedModel');

const getDashboardData = async (req, res) => {
    try {
        const totalUser = await User.countDocuments();

        const totalCourse = await Course.countDocuments();

        const totalEnrollment = await Enrollment.countDocuments();

        const totalCertificate = await Certification.countDocuments();

        if (totalUser !== undefined && totalCourse !== undefined && totalEnrollment !== undefined) {
            console.log(totalCourse);
            return res.json({
                totalUser,
                totalCourse,
                totalEnrollment,
                totalCertificate,
            });
        } else {
            // Handle the case where one or more counts are undefined.
            return res.status(500).json({ error: 'Some counts are undefined' });
        }
    } catch (error) {
        // Handle other errors here.
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { getDashboardData };
