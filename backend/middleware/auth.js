const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const express = require('express');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(cookieParser());

const verifyUser = (req, res, next) =>{
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json({Error: `no token : ${token}`});
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({Error: 'token not okay'})
      } else {
        req.email = decoded.email;
        req.role = decoded.role;
        req.name = decoded.name;
        console.log(decoded);
        next();
      }
    })
  }
};

module.exports = verifyUser;