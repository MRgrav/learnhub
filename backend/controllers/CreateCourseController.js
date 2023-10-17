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
        const thumbnail = courseData.thumbnail;
        if(thumbnail){
            // const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
            //     folder:"coursesThumb"
            // });
            const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail,{
                folder:"coursesThumb"
            },{transformation: [
                {width: 1000, crop: "scale"},
                {quality: 35},
                {fetch_format: "auto"}
            ]})

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
        // console.log(data);
        //const {image} = req.body.thumbnail;
        // const thumbnail = cloudinary.image(image, {transformation: [
        //     {width: 1000, crop: "scale"},
        //     {quality: 35},
        //     {fetch_format: "auto"}
        //     ]})
        //console.log(thumbnail)
        if (data.thumbnail) {
            await cloudinary.v2.uploader.destroy(data.oldThumbnail);
             cloudinary.v2.api
             .delete_resources([data.oldThumbnail], 
                 { type: 'upload', resource_type: 'image' })
             .then(console.log);
            const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail,{
                folder:"coursesThumb"
            },{transformation: [
                {width: 1000, crop: "scale"},
                {quality: 35},
                {fetch_format: "auto"}
            ]})
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }
        delete data.oldThumbnail;

        //res.json({mesData:data})

        const courseId = req.body._id;
        console.log(req.body._id)

        let checkCourse = await Course.find({_id: req.body._id});
        if(!checkCourse) {
            return res.json({Status: "no course", Mcode: checkCourse})
        }
        const course = await Course.findByIdAndUpdate(courseId, 
            {$set: data},
            {new:true
        });
        //console.log(Course.find(courseId))
        // const course = await Course.findByIdAndUpdate(courseId, 
        //     {$set: data},
        //     {new:true}
        // );
        // console.log(course);
        
        if (!course) {
            // Handle the case where the course with the given ID is not found
            return res.status(404).json({ Status: 'Course not found' });
        }
         res.json({Status:'done'});
    } catch (error) {
        res.json(error);
    }
}

module.exports = { uploadCourse, editCourse }