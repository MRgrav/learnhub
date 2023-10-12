const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ApiRouter = require('./routes/ApiRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");

require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json());
app.use(cors({
    //origin: ["http://localhost:3000", "http://127.0.0.1:3000", "0.0.0.0"],
    origin: 'http://localhost:3000',
    methods: ["POST","GET"],
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