const Certification = require("../models/CertifiedModel");
const Course = require("../models/CourseModel");
const Enrollment = require("../models/EnrollmentModel");
const User = require("../models/NewUser");

const getQuestions = async (req, res) => {
    try {
        const enrollmentId = req.params.id; // Assuming the parameter is named 'enrollmentId'

        const enrollment = await Enrollment.findOne({ _id: enrollmentId });

        if (!enrollment) {
            return res.json({ message: "Either not available or course completed" });
        }

        const selectFields = ['courseTitle', 'category', 'thumbnail.url', 'courseLevel', 'questions'];
        const course = await Course.findOne({ _id: enrollment.courseId }).select(selectFields);

        if (!course) {
            return res.json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const courseTest = async (req, res) => {
    // return res.json(req.body)
    const {
        enrollmentId,
        selectedAnswers,
    } = req.body;

    const enrolledCourse = await Enrollment.findOne({ _id: enrollmentId });

    const selectFields = ['questions']
    const quizes = await Course.findOne({ _id: enrolledCourse.courseId }).select(selectFields);

    let marks = 0;

    for (let count = 0; count < selectedAnswers.length; count++) {
        for (let optionIndex = 0; optionIndex < quizes.questions[count].options.length; optionIndex++) {
            const option = quizes.questions[count].options[optionIndex];
            // console.log(selectedAnswers[count],' : ', quizes.questions[count].options[optionIndex]._id)
            if (selectedAnswers[count] === option._id.toString() && option.isCorrect) {
                marks += 10;
                break; // Break the inner loop once a correct answer is found
            }
        }
    }

    const passMark = (selectedAnswers.length*10)*(40/100);  // 40% required to get a certificate
    if (marks > passMark) {
        const user = await User.findOne({_id: enrolledCourse.userId}).select('');
        const newCertificate = new Certification({
            userName: user.username,
            enrollmentId: enrollmentId,
            marks: marks,
        });
        const isCertified = await Certification.findOne({enrollmentId: enrollmentId});
        if (!isCertified){
            await newCertificate.save();
        }
        return res.json({Status: 'passed', marks: marks});
    }else{
        const currentDate = new Date();
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1); 
        await Enrollment.findByIdAndUpdate(enrollmentId,
            { AssessmentDate: nextDay },
            { new: true }
        );
        return res.json({Status: "failed", marks: marks});
    }

    return res.json(marks);
}

// const quizEnabler = async (req, res) => {
//     // it enables when students complete the course and ready for assessment
    
//     try {
//         const id = req.body;
//         console.log(id)
//         // const enrollment = await Enrollment.findOne({_id: id})
//         const result = await Enrollment.updateOne(
//             { _id: id },
//             { $set: { AssessmentDate: new Date() } }
//         );

//         res.json({Status: "enabled"});

//     } catch (error) {
        
//     }

// }

const getQuizButtonStatus = async (req, res) => {
    // only check quiz date, if its tomorrow then the button will not show
    try {
        const id = req.params.id;
        // console.log(id)

        const selectFields = ['AssessmentDate']
        const result = await Enrollment.findOne({_id: id}).select(selectFields);
        // console.log(result)
        return res.json(result);
    } catch (error) {
        
    }
}

module.exports = { getQuestions, courseTest, getQuizButtonStatus };
