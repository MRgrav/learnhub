const express = require('express')
const mongoose = require('mongoose')

const app = express();

require('dotenv').config();

app.use(express.json());

const port = process.env.PORT;
//app.listen(port, () => console.log(`running ${port}`));

//mongodb connection url
const db = process.env.MONGO_URL;

//database connestion i.e MongoDB
mongoose.
connect(db)
.then(() => {
    console.log("connected")
    app.listen(port, () => {
        console.log("api")
        
    });
    
}).catch(() => {
    console.log(errors)
})