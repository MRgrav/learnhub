const bcrypt = require('bcrypt');
const User = require('../models/NewUser');

const register = async (req, res) => {
    try {
        const {
            username,
            phone,
            email,
            dob,
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
            dob: dob,
            password: passwordHash 
        });
        delete newUser.password;
        console.log(newUser);
        const savedUser = await newUser.save();
        //const savedUser = await newUser.create(newUser);
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
        // .then( (user) => {

        // }).catch((err) => {
        //     res.status(500).json({error: err.message});
        // });
        if(!user) {
            //no data
            return res.json("no data");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
        //if(user.password === password){
            //console.log(a);
            res.json(user);
            //req.session.user = sessUser; // Auto saves session data in mongo store
        } else {
            //wrong password
            res.json("wrong pwd");
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports = { register, login };
//module.exports = { login };