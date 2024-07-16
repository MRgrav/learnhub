//still developing alpha mode
require('dotenv').config();
const multer = require('multer')
const path = require("path");
const cloudinary = require('cloudinary');

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({ 
  cloud_name: 'daidqbafw', 
  api_key: api_key, 
  api_secret: api_secret
});

const videoUploader = async (req, res) => {
    return 0;
    try {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
            return cb(null, "./uploads/")
            },
            filename: function (req, file, cb) {
            return cb(null, Date.now() + file.originalname);
            }
            });
            
            //const upload = multer({ dest: 'uploads', filename: });
            const upload = multer({storage})
// START: UPLOAD ARRAY
        // const videoFiles = req.body.map((vidElement) => vidElement.videoUrl)
          
        //   const videoUrls = [];
        //   for (const videoFile of videoFiles) {

        //     const myCloud = await cloudinary.v2.uploader
        //     .upload(videoFile,{
        //         resource_type: "video",
        //         chunk_size: 6000000,
        //         eager: {
        //             fetch_format: "webm", video_codec: "vp9", format: ""
        //         },
        //         eager_async: true,
        //         folder: 'course-video',
        //     })

        //     const responseData = {
        //         public_id: myCloud.public_id,
        //         url: myCloud.secure_url
        //     }

        //     //const uploadResult = await cloudinary.uploader.upload(videoFile);
        //     videoUrls.push(responseData);
        //   }
          
        //   console.log(videoUrls); 

        // return res.json({videoUrls})
// END: UPLOAD ARRAY
        //console.log(req.body.videoUrl)
        const videoFile = req.body.videoUrl;


        //cloudinary
        const myCloud = await cloudinary.v2.uploader
        .upload(videoFile,{
            resource_type: "video",
            chunk_size: 6000000,
            eager: {
                fetch_format: "webm", video_codec: "vp9", format: ""
            },
            eager_async: true,
            folder: 'course-video',
        })

        console.log(myCloud)

        const responseData = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
        return res.json({responseData})
    } catch (error) {
        
    }
}

module.exports = { videoUploader }