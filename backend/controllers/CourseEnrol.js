const express = require('express');
const User = require('../models/NewUser');
const Course = require('../models/CourseModel');
const Enrollment = require('../models/EnrollmentModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Certification = require('../models/CertifiedModel');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const enrollCourse = async (req, res) => {
    try {
        const {
            userId,
            courseId,
            receiptId,
            orderId,
        } = req.body;
        console.log('user : ', userId)
        console.log('course : ', courseId)
        console.log('receipt : ', receiptId)
        console.log('order : ', orderId)
        
        const newEnrollment = new Enrollment({userId, courseId, receiptId, orderId});
        const resEnroll = await newEnrollment.save();
        if(resEnroll){
            return res.json({message: "You have enrolled"})
        } else {
            return res.json({message: "no course"})
        }
    } catch (error) {
        console.log(error)
    }
}

//update latest course content viewd 
const courseProgress = async (req, res) => {
    // console.log(req.body)
    const { id, currentIndex } = req.body;
    const enrollment = await Enrollment.findOne({ _id: id })
    //console.log(enrollment)
    if(!enrollment) {
        return res.json({message: "course not yet enrolled"})
    }

    console.log(enrollment.progress, ' < ', currentIndex)

    const result = await Course.findOne({_id: enrollment.courseId}).select('videoContents');
    const totalContents = result.videoContents.length;

    // console.log(totalContents, '  ', result.videoContents)

    if(enrollment.progress < currentIndex){
        //will update progress
        console.log('plus')
        // await Enrollment.findByIdAndUpdate(id, 
        //     {progress: currentIndex},
        //     {new:true
        // });
        if (currentIndex === totalContents){
            await Enrollment.findByIdAndUpdate(id,
                { AssessmentDate: new Date(),
                    progress: currentIndex },
                { new: true }
            );
            return res.json({Status: "enabled", message: "course progressing"})
        } else {
            await Enrollment.findByIdAndUpdate(id, 
                {progress: currentIndex},
                {new:true
            });
            return res.json({message: "course progressing"})
        }
        
    }
}

//all course enrolled by the student
const getEnrolledCourses = async (req, res) => {
    try{
        const token = req.cookies.token;

        const userData = await jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({_id: userData.id});
        if(!user){
            return res.json({message: "error in user id"})
        }

        // All courses enrolled by the user
        // const enrolledCourses = await Enrollment.find({ userId: userData.id });
        const enrolledCourses = await Enrollment.find({
            userId: userData.id,
            _id: { $nin: await Certification.distinct('enrollmentId') }
        });

        // Extract course IDs from enrolledCourses
        const courseIds = enrolledCourses.map(enrollment => enrollment.courseId);
        //console.log(courseIds)

        // Fetch details for all enrolled courses
        const selectFields = ['courseTitle', 'courseDescription', 'category', 'thumbnail.url', 'courseLevel', 'videoContents'];
        const responseData = await Course.find({ _id: { $in: courseIds } }).select(selectFields);

        const certifiedCourses = await Certification.find().select('enrollmentId');

        try {
            // Map through enrolledCourses and add course details
            const enrolledCoursesData = enrolledCourses.map(enrollment => {
                const courseDetails = responseData.find(course => course._id.equals(enrollment.courseId));

                console.log(courseDetails)
                return {
                    enrollmentId: enrollment._id,
                    courseId: enrollment.courseId,
                    courseLevel: courseDetails.courseLevel,
                    thumbnail: courseDetails.thumbnail.url,
                    courseTitle: courseDetails.courseTitle,
                    category: courseDetails.category,
                    description: courseDetails.courseDescription,
                    courseProgress: enrollment.progress,
                    totalCourse: courseDetails.videoContents.length,
                };
            });
        
            // console.log(enrolledCoursesData);
            // return 
            res.json({ data: enrolledCoursesData });
        } catch (error) {
            console.error("Mapping error:", error);
        }
    

    } catch (error){
        console.log(error)
        res.json({message: 'login first bro'})
    }
}

//one course student wants to resume
const getResumedCourse = async (req, res) => {
    try{
        const token = req.cookies.token;

        const userData = await jwt.verify(token, JWT_SECRET);

        const enrollmentId = req.params.id;
        console.log(req.params.id)

        const user = await User.findOne({_id: userData.id});
        if(!user){
            return res.json({message: "error in user id"})
        }

        //check enrolled course
        const enrolledCourseAvailability = await Enrollment.findOne({_id: enrollmentId});
        if(!enrolledCourseAvailability) {
            return res.json({message: "course either not available or completed"})
        }

        // Fetch details for all enrolled courses
        const selectFields = ['courseTitle', 'courseDescription', 'category', 'thumbnail.url', 'courseLevel','syllabus', 'videoContents'];
        const courseDetails = await Course.findOne({ _id: enrolledCourseAvailability.courseId }).select(selectFields);
        //console.log(courseDetails.videoContents.length)

        if (courseDetails) {
            const responseData = {
                // ... (other properties)
                enrollmentId: enrolledCourseAvailability._id,
                courseId: enrolledCourseAvailability.courseId,
                courseLevel: courseDetails.courseLevel,
                thumbnail: courseDetails.thumbnail,
                courseTitle: courseDetails.courseTitle,
                category: courseDetails.category,
                courseDescription: courseDetails.courseDescription,
                syllabus: courseDetails.syllabus,
                videoContents: courseDetails.videoContents || [], // Use an empty array if videoContents is undefined
                courseProgress: enrolledCourseAvailability.progress,
                // totalCourse: courseDetails?.videoContents?.length || 0,
                totalCourse: courseDetails.videoContents ? courseDetails.videoContents.length : 0,
            };
            return res.json({ data: responseData });
        } else {
            // Handle the case where courseDetails is undefined
            return res.status(404).json({ message: 'Course details not found' });
        }

    } catch (error){

    }
}

const getCompletedCourse = async (req, res) => {
    const eid = req.params.id;
    // console.log('here ', eid)
    const date = await Certification.findOne({enrollmentId: eid}).select('certifiedDate');

    const newDate = formatDate(date.certifiedDate);
    const result = await Enrollment.findOne({_id: eid});
    // console.log(result);
    const selectFields = ['courseTitle', 'courseDescription', 'thumbnail.url']
    const responseData = await Course.findOne({_id: result.courseId}).select(selectFields);

    return res.json({responseData, newDate});
}

const checkEnrollment = async (req, res) => {
    const userId = req.params.id;

    await Enrollment.find({userId: { $in: userId}}).select('courseId')
    .then(response=>{
        console.log(response)
        return res.json(response)
    })
}



//extra

const formatDate = (dateString) => {
    const monthOnly = new Date(dateString).toLocaleDateString('en-us', {month: 'short'});
    const yearOnly = new Date(dateString).toLocaleDateString('en-us', {year: 'numeric'})
    const day = new Date(dateString).getDate();
    const dayWithSuffix = getDayWithSuffix(day);
  
    return `${dayWithSuffix} ${monthOnly}, ${yearOnly}`;
};
  
const getDayWithSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
};

module.exports = {enrollCourse, courseProgress, getEnrolledCourses, getResumedCourse, checkEnrollment, getCompletedCourse}