const bcrypt = require('bcrypt');
const User = require('../models/NewUser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const {
            username,
            phone,
            email,
            utype,
            password
        } = req.body;

        User.findOne({email: email})
        .then( (resMail) => {
            if(resMail){
                res.status(202).json("email already exist");
            }
        });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            phone: phone,
            email: email,
            utype: utype,
            password: passwordHash 
        });
        console.log(newUser);
        const savedUser = await newUser.save();
        //const savedUser = await newUser.create(newUser);
        delete newUser.password;
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
};

const login = async (req, res) => {
    try {
        const {id, password} = req.body;
        const user = await User.findOne({email: id});
        if(!user) {
            //no data
            return res.json({Status:"user not found"});
        }
        const checkPass = await bcrypt.compare(password, user.password);
        if (checkPass){
            const email = user.email;
            const role = user.utype;
            const name = user.username;
            const token = jwt.sign({email,role,name}, JWT_SECRET, {expiresIn: '2d'});
            res.cookie('token', token, { httpOnly: true });
            //res.cookie('token',token);
           // if (res.status(201)) {            
                return res.json({Status: "ok", data:token, role:user.utype,email:user.email})
                //req.session.user = sessUser; // Auto saves session data in mongo store
            } else {
                //wrong password, used 222 cause I don't know
                return res.json({Status:"wrong password"});
            }
        //}

        //const checkPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};


module.exports = { register, login };
//module.exports = { login };