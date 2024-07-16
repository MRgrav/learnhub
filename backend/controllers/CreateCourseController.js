const express = require('express');
const Course = require('../models/CourseModel');
require('dotenv').config();
const cloudinary = require('cloudinary');
const streamifier = require('streamifier')
const axios = require('axios');

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({ 
  cloud_name: 'daidqbafw', 
  api_key: api_key, 
  api_secret: api_secret
});

const uploadCourse = async (req, res) => {
    //console.log('Thumbnail path:', req.body.thumbnail);
    //console.log(req.body.)
    //const resb = req.body;
    //return res.json({resb})
    try {
        const courseData = req.body;
        const thumbnail = courseData.thumbnail;
        if(thumbnail){
            // const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
            //     folder:"coursesThumb"
            // });
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"coursesThumb",
                transformation: [
                    {width: 1000, crop: "scale"},
                    {quality: 59},
                    // {fetch_format: "auto"}
                ]
            })

            //console.log(myCloud)

            courseData.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        //const resVid = [];
        
        // const resVid = await courseData.videoContents.map((videoItem, index) => {
        //     console.log(videoItem)
        //     //
        //     return axios.post('/upload-video', videoItem.videos, {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //         onUploadProgress: (progressEvent) => {
        //             let precentage = Math.floor((loaded * 100) / total);
        //             if (precentage < 100) {
        //                 console.log(precentage);
        //             }else{
        //                 console.log('done')
        //             }
        //         }
        //     })
        // });
// VIDEO UPLOAD BY SENDING WHOLE ARRAY: VARRAY
        // const vidArray = courseData.videoContents;
        // const progressOption = {
        //     onUploadProgress: (progressEvent) => {
        //       const { loaded, total } = progressEvent;
        //       let precentage = Math.floor((loaded * 100) / total);
        //       console.log("options");
        //       console.log(precentage);
        //       if (precentage < 100) {
        //         console.log(precentage);
        //       }
        //     }
        //   };
        // const resVid = await axios.post('http://localhost:5003/api/video-upload', vidArray, progressOption)
// END: VARRAY


// // VIDEO UPLOAD USING MAP: VMAP
//         if (Array.isArray(courseData.videoContents)) {
//             const uploadedVideos = await Promise.all(
//                 courseData.videoContents.map(async (videoItem, index) => {
//                     return new Promise((resolve, reject) => {
//                         const cld_upload_stream = cloudinary.v2.uploader.upload_stream({
//                             resource_type: 'video',
//                             folder: 'course-video',
//                             eager: [
//                                 { fetch_format: 'webm', video_codec: 'vp9', format: '' }
//                             ]
//                         }, (error, result) => {
//                             if (error) {
//                                 console.error('Error uploading video:', error);
//                                 reject(error);
//                             } else {
//                                 resolve(result);
//                             }
//                         });

//                         // Convert ArrayBuffer to Buffer
//                         const videoBuffer = ArrayBuffer.isView(videoItem.data)
//                             ? Buffer.from(videoItem.data)
//                             : Buffer.from(new Uint8Array(videoItem.data));

//                         // Pipe the video content (Buffer) to the Cloudinary upload stream
//                         streamifier.createReadStream(videoBuffer).pipe(cld_upload_stream);
//                     });
//                 })
//             );

//             // Here, you can create an array of video URLs from the responses.
//             const videoUrls = uploadedVideos.map((video) => video.url);

//             // Now, you can update the courseData with the video URLs or do further processing.
//             courseData.videoUrls = videoUrls;
//         } else {
//             throw new Error('courseData.videoContents is not an array');
//         }

        // if (Array.isArray(courseData.videoContents)) {
        //     const resVid = await Promise.all(
        //         courseData.videoContents.map(async (videoItem, index) => {
        //             console.log(videoItem);
        //             await cloudinary.v2.uploader
        //             //videoItem.videoUrl
        //                 .upload_large_stream({
        //                     resource_type: "video",
        //                     chunk_size: 6000000,
        //                     eager: {
        //                         fetch_format: "webm", video_codec: "vp9", format: ""
        //                     },
        //                     eager_async: true,
        //                     folder: 'course-video',
        //                 })

        //                 // console.log(myCloud)

        //                 // const responseData = {
        //                 //     public_id: myCloud.public_id,
        //                 //     url: myCloud.secure_url
        //                 // }
        //             streamifier.createReadStream(videoItem).pipe(cld_upload_large_stream)
        //             })
                    
        //     );

        //     console.log(resVid)

        //     // Here, you can create an array of video URLs from the responses.
        //     const videoUrls = resVid.map((response) => response.data.publicUrl);

        //     // Now, you can update the courseData with the video URLs or do further processing.
        //     courseData.videoUrls = videoUrls;
        // } else {
        //     throw new Error('courseData.videoContents is not an array');
        // }
// END: VMAP
        //const newCourseL = {};
        //console.log(resVid)

        //return res.json({message: "done"})
        
        //newCourse.append('courseTitle') = courseData.courseTitle;

        //newCourse.append('videoContent') = resVid;

          
        const newCourse = new Course(courseData);
        const createCourse = await newCourse.save();

        //console.log(createCourse)
        res.json({Status:'course created'});

    } catch (error) {
        console.log('here', error)
        res.json(error);
    }
}

const editCourse = async (req, res) => {
    try {
        const data = req.body;
        console.log(req.body)
        //if there exist thumbnail and old thumbnail not = thumbnail url, then new image is coming
        if (data.thumbnail && (data.thumbnail.public_id !== data.oldThumbnail)) {
            await cloudinary.v2.uploader.destroy(data.oldThumbnail);
            //  cloudinary.v2.api
            //  .delete_resources([data.oldThumbnail], 
            //      { type: 'upload', resource_type: 'image' })
            //  .then(console.log);
            const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail,{
                folder:"coursesThumb",
                transformation: [
                {width: 1000, crop: "scale"},
                {quality: 50},
                {fetch_format: "jpg"}
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