const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        transactionId: String,
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        progress: {
            type: Number,
        },
        assessmentScore: {
            type: Number,
        },
        AssessmentDate: {
            type: Date,
        },
    },
)

const Enrollment = mongoose.model('enrollment', userSchema);

module.exports = Enrollment;