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

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status:'Logout successful'});
})

router.post('/payment/orders', async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const option = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString('hex'),
        }

        instance.orders.create(option, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message:"Something went wrong!"});
            }
            res.status(200).json({data: order});
        });
    } catch (error) {
        console.log(error);     
        return res.status(500).json({message: "Internal server error!"});
    }
});

//verification
router.post('/payment/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature} = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id; 
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({message: "Payment verified successfully"});
        } else {
            return res.status(400).json({message: "Invalid signature sent!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error!"});
    }
});




//course
router.post('/create-course',  uploadCourse);

router.post('/update-course', verifyUser, isAdmin, editCourse);

module.exports = router;