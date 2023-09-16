const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const ApiRouter = require('./routes/ApiRoutes');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

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