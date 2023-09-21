const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        avatar: {
            type: String,
            default: "https://res-console.cloudinary.com/daidqbafw/thumbnails/transform/v1/image/upload/Yl9hdXRvOnByZWRvbWluYW50LGNfcGFkLGhfMzAwLHdfMzAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/YXZhdGFyNjE2L3VxNjN0bmV0Y3Ryb2F0ZnZjZnpo/template_primary",
        },
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
        dob: {
            type: Date,
            required: [true, "Please enter your date of birth"],
        },
        password:{
            type: String,
            required: [true, "Please enter a complex password"],
        }
    },
    {
        timestamp: true
    }
)

const User = mongoose.model('users', userSchema);

module.exports = User;

//it designs the schema 