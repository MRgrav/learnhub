
const jwt = require('jsonwebtoken');
const User = require('../models/NewUser');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const userData = async (req, res) => {
    // const [userData, setUser] = useState({
    //     email:''
    // })
    const token = req.cookies.token;
    if (!token) {
        return res.json({Status: 'back'});
    } else {
        const userData = jwt.verify(token, JWT_SECRET);
        const email = userData.email;
        await User.findOne({email: email}).then((data)=>{
            res.send({Status: "ok", data: data});
        }).catch((err)=>{
            res.send({Status: "error", data: err})
        })
    }



    //const { token } = req.cookie('token');
    // return res.send(token);
    // try {
    //     const user = jwt.verify(token, JWT_SECRET)
    //     //return res.send(token);
    //     const umail = user.email;
    //     const role = user.role;
    //     await User.findOne({email: umail}).then((data)=>{
    //         res.send({status: "ok", data: data});
    //     }).catch((err)=>{
    //         res.send({status: "error", data: err})
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return res.json(error);
    // }
}

module.exports = userData;