const mongoose = require("mongoose")

const enrollmentSchema = mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        receiptId: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        progress: {
            type: Number,
            default: 0,
        },
        assessmentScore: {
            type: Number,
            default: 0,
        },
        AssessmentDate: {
            type: Date,
        },
    },
)

const Enrollment = mongoose.model('enrollment', enrollmentSchema);

module.exports = Enrollment;