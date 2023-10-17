const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ApiRouter = require('./routes/ApiRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");

require('dotenv').config();

app.use(bodyParser.json({limit: '50000kb'}));
app.use(bodyParser.urlencoded({limit: '50000kb', extended: true}));
app.use(express.json());
// app.use(express.json());
app.use(cors({
    //origin: ["http://localhost:3000", "http://127.0.0.1:3000", "0.0.0.0"],
    origin: 'http://localhost:3000',
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true
}));
app.use(cookieParser());

//will register using controller
app.use('/api', ApiRouter);

//port
const port = process.env.PORT;
//mongodb connection url
const db = process.env.MONGO_URL;
//database connestion i.e MongoDB


//setInterval(()=>{
    mongoose.
        connect(db)
        .then(() => {
            console.log("connected")
            app.listen(port, () => {
                console.log(`running on ${port}`) 
            });
        }).catch((errors) => {
            console.log(errors)
        })
    // try {
        
    // } catch (error) {
    //   console.log(error.message);
    //   // retry to connect after 5 seconds
    //   setTimeout(connectDB, 5000);
    // }
//},1000)
    // try {
        
    // } catch (error) {
    //   console.log(error.message);
    //   // retry to connect after 5 seconds
    //   setTimeout(connectDB, 5000);
    // }