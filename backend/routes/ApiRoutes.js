const express = require('express');
const { register, updateUser } = require('../controllers/UserController');
const { login } = require('../controllers/UserController');
const { uploadCourse, editCourse } = require('../controllers/CreateCourseController');
const { userData, studentsData}  = require('../controllers/UserData');
const verifyUser = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { error } = require('console');
const { courseData, singleCourseData, deleteCourse } = require('../controllers/CourseController');
const { orderPayment, verifyPayment } = require('../controllers/PaymentController');
const { enrollCourse, courseProgress, getEnrolledCourses, getResumedCourse, checkEnrollment, getCompletedCourse } = require('../controllers/CourseEnrol');
const { getDashboardData } = require('../controllers/DashboardData');
const { videoUploader } = require('../controllers/UploadController');
const multer = require('multer')
const path = require("path");
const { getQuestions, courseTest, getQuizButtonStatus } = require('../controllers/QuizController');
const { certificatePdf, checkCertificate, getCertificateview, getAvailableCertificate } = require('../controllers/CertificateController');
require('dotenv').config();

// import Auth from '../middleware/auth';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/userdata', userData);

router.get('/',verifyUser, (req, res) =>{
    console.log(req.role);
    //const email = req.email;
    const role = req.role;
    const name = req.name;
    const userId = req.id;
    return res.json({Status: 'ok', id: userId, role: role, name: name})
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    return res.json({Status:'Logout successful'});
})

router.post('/payment/orders', orderPayment);

//verification
router.post('/payment/verify', verifyPayment);

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.json({message:'Logout Done'});
});


//course
router.post('/create-course', isAdmin, uploadCourse);

router.post('/update-course', isAdmin, editCourse);

router.post('/delete-course/:id', isAdmin, deleteCourse)

router.get('/get-courses', courseData);

router.get('/get-course/:id', singleCourseData);

router.post('/buy-course', verifyUser, enrollCourse);

router.post('/progress-course', courseProgress);

router.post('/assessment', courseTest);

router.get('/check-certificate/:id', checkCertificate);

router.get('/get-certificate-view/:id', getCertificateview);

router.get('/get-available-certificate/:id', getAvailableCertificate);

router.get('/get-completed-course/:id', getCompletedCourse);

router.get('/get-dash-data', getDashboardData);

router.get('/get-enrolled-courses', verifyUser, getEnrolledCourses);

router.get('/get-enrolled-course/:id', verifyUser, getResumedCourse);

router.get('/get-quiz-questions/:id', getQuestions)

router.get('/get-quiz-button-status/:id', getQuizButtonStatus);

router.get('/check-course-enrollment/:id', checkEnrollment)

router.post('/generate-certificate', certificatePdf)

router.post('/update-profile', updateUser)

router.get('/get-students', studentsData)

//router.post('/upload-video', );

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage})

router.post('/upload-video', upload.single('video'), (req, res) => {
    const videoUrl = `http://localhost:5003/uploads/${req.file.filename}`;
    res.send(videoUrl);
})


module.exports = router;