const jwt = require('jsonwebtoken');
const User = require('../models/NewUser');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const userData = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Status: 'back'});
    } else {
        const userData = jwt.verify(token, JWT_SECRET);
        const userId = userData.id;
        console.log('a',userData)
        await User.findOne({_id: userId}).then((data)=>{
            res.send({Status: "ok", data: data});
        }).catch((err)=>{
            res.send({Status: "error", data: err})
        })
    }
}

module.exports = userData;