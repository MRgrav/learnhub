const express = require('express');
const { register } = require('../controllers/UserController');
const { login } = require('../controllers/UserController');
const { uploadCourse, editCourse } = require('../controllers/CreateCourseController');
const userData = require('../controllers/UserData');
const verifyUser = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { error } = require('console');
const { courseData, singleCourseData } = require('../controllers/CourseController');
const { orderPayment, verifyPayment } = require('../controllers/PaymentController');
require('dotenv').config();

// import Auth from '../middleware/auth';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/userdata', userData);

router.get('/',verifyUser, (req, res) =>{
    console.log(req.role);
    const email = req.email;
    const role = req.role;
    const name = req.name;
    return res.json({Status: 'ok', id: email, role: role, name: name})
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

router.get('/get-courses', courseData);

router.get('/get-course/:id', singleCourseData);

module.exports = router;