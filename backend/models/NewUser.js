const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter your full name"]
        },
        phone: {
            type: Number,
            required: [true, "Please enter your phone number"],
            default: 0
        },
        email: {
            type: String,
            required: [true, "Please enter your email id"],
            unique: true,
        },
        utype: {
            type: String,
            required: [true, "Please select your account type"],
        },
        password:{
            type: String,
            required: [true, "Please enter a complex password"],
        }
    },
    {
        timestamp: true
    },
    {
        collection: "users",
    }
)

const User = mongoose.model('users', userSchema);

module.exports = User;

//it designs the schema 