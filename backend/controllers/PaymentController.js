const { v4: uuidv4 } = require('uuid');
const uniqueTransactionID = uuidv4(); // Generates a unique ID
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const orderPayment = async (req, res) =>
    {
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
    }

const verifyPayment = async (req, res) => {
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
            //return res.status(200).json({message: "Payment verified successfully"});
            return res.status(200).json({ message: 'Payment verified successfully', transactionID: uniqueTransactionID });
        } else {
            return res.status(400).json({message: "Invalid signature sent!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error!"});
    }
}

module.exports = {orderPayment, verifyPayment}