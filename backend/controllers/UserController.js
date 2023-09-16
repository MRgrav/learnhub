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

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            phone: phone,
            email: email,
            dob: dob,
            password: passwordHash 
        });
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
        User.findOne({email: id})
        .then( user => {

            if(user) {
                if (bcrypt.compare(password, user.password)) {
                //if(user.password === password){
                    res.json("success");
                    //req.session.user = sessUser; // Auto saves session data in mongo store
                } else {
                    //wrong password
                    res.json("wrong pwd");
                }
            } else {
                //no data
                res.json("no data");
            }
        }).catch((err) => {
            res.status(500).json({error: err.message});
        });
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports = { register, login };
//module.exports = { login };