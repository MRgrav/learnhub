const express = require('express');
const Course = require('../models/CourseModel');
require('dotenv').config();
const cloudinary = require('cloudinary');

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({ 
  cloud_name: 'daidqbafw', 
  api_key: api_key, 
  api_secret: api_secret
});

const uploadCourse = async (req, res) => {
    console.log('Thumbnail path:', req.body.thumbnail);
    try {
        const courseData = req.body;
//         cloudinary.v2.uploader.upload("fileName",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
        const thumbnail = courseData.thumbnail;
        if(thumbnail){
            const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
                folder:"coursesThumb"
            });

            console.log(myCloud)

            courseData.thumbnail = {
                public_id: (await myCloud).public_id,
                url: (await myCloud).secure_url
            }
        }
        
          
        const newCourse = new Course(courseData);
        const createCourse = await newCourse.save();

        console.log(createCourse)
        res.json({Status:'course created'});

    } catch (error) {
        console.log('here', error)
        res.json(error);
    }
}

const editCourse = async (req, res) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = cloudinary.v2.uploader.upload(thumbnail,{
                folder:"coursesThumb"
            });
            data.thumbnail = {
                public_id: (await myCloud).public_id,
                url: (await myCloud).secure_url
            }
        }

        const courseId = req.param.id;

        const course = await Course.findByIdAndUpdate(courseId, data, {
            $set: data},
            {new:true
        });

        res.json({Status:'done'});
    } catch (error) {
        
    }
}

module.exports = { uploadCourse, editCourse }