const fs = require('fs').promises;
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
// const fontkit = require('@pdf-lib/fontkit');
const fontkit = require('@pdf-lib/fontkit');
const Certification = require('../models/CertifiedModel');
const Course = require('../models/CourseModel');
const Enrollment = require('../models/EnrollmentModel');

const certificatePdf = async (req, res) => {
    const {
        userName,
        courseName,
        certifiedDate,
        courseLevel,
        certificateId
    } = req.body;

    const verifiableUrl = 'http://localhost:3000/certificate/user/shared/' + certificateId;
    try {
      const pdfFile = path.join(__dirname, "../media", "CERTIFICATION-TEMP.pdf");
        const pdfBytes = await fs.readFile(pdfFile);

        const fontFile = path.join(__dirname, "../media", "Calistoga-Regular.ttf");
        const fontBytes = await fs.readFile(fontFile)

        const fontItalicFile = path.join(__dirname, "../media", "NunitoSans-ExtraLightItalic.ttf");
        const fontItalicBytes = await fs.readFile(fontItalicFile) 

        const fontCourseFile = path.join(__dirname, "../media", "TitilliumWeb-SemiBold.ttf");
        const fontCourseBytes = await fs.readFile(fontCourseFile)

        // Load the existing PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);

        pdfDoc.registerFontkit(fontkit)
        const fontCalistoga = await pdfDoc.embedFont(fontBytes)

        const CourierBold = await pdfDoc.embedFont(StandardFonts.CourierBold)

        const urlFont = await pdfDoc.embedFont(fontItalicBytes)

        const CourseFont = await pdfDoc.embedFont(fontCourseBytes)

        // Get the first page (index 0) of the PDF
        const page = pdfDoc.getPage(0);

        const PAGE_WIDTH = page.getSize();

        // Add text to the page
        // Add text to the page
        page.drawText(`11th Jun, 2023`, { 
          x: 60, 
          y: 350, 
          size: 14,
          color: rgb(0.15, 0.15, 0.15) 
        });
        page.drawText(`${userName}`, { 
          x: 60, 
          y: 300, 
          size: 28,
          color: rgb(0.15, 0.15, 0.15) 
        });
        page.drawText('has successfully completed', {
          x: 60,
          y: 250,
          size: 13,
          color: rgb(0.15, 0.15, 0.15)
        });
        page.drawText(`${courseName},`, {
          x: 60,
          y: 210,
          size: 24,
          font: CourseFont,
          color: rgb(0.15, 0.15, 0.15)
        });
        page.drawText('the                    level course, is an online', {
          x: 60,
          y: 180,
          size: 13,
          color: rgb(0.15, 0.15, 0.15)
        });
        page.drawText(`${courseLevel}`, {
          x: 84,
          y: 180,
          size: 13,
          font: CourierBold,
          color: rgb(0.15, 0.15, 0.15)
        });
        page.drawText(`quiz based course from `, {
            x: 60,
            y: 150,
            size: 13,
            color: rgb(0,0,0),
        });
        page.drawText(`LearnHub.`, {
          x: 200,
          y: 150,
          size: 13,
          font: CourierBold,
          color: rgb(0,0,0),
      });

      page.drawText(`${verifiableUrl}`, {
          // x: PAGE_WIDTH - getStringWidth(`${verifiableUrl}`, 48),
          x: page.getWidth() - urlFont.widthOfTextAtSize(`${verifiableUrl}`, 11) - 115 ,
          y: 110,
          size: 11,
          font: urlFont,
          color: rgb(0.2,0.1,1),
      });


        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();

        // Send the modified PDF as a response
        // res.setHeader('Content-Type', 'application/pdf');
        // res.send(modifiedPdfBytes);

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
        res.setHeader('Content-Length', modifiedPdfBytes.length)
        return res.end(modifiedPdfBytes)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

const checkCertificate = async (req, res) => {
  const id = req.params.id;
  const result = await Certification.findOne({enrollmentId: id});
  // return res.json(result)
  if (!result) {
    return res.json({Status: 'false'})
  } else {
    return res.json({Status: 'true', certificateId: result._id})
  }
}

const getCertificateview = async (req, res) => {
  const id = req.params.id;
  const certificate = await Certification.findOne({_id: id});
  const enrolledCourse = await Enrollment.findOne({_id: certificate.enrollmentId}).select('courseId');
  const selectFields = ['courseTitle', 'courseLevel'];
  const courseData = await Course.findOne({_id: enrolledCourse.courseId}).select(selectFields);

  return res.json({certificate, courseData})

}

const getAvailableCertificate = async (req, res) => {
  const id = req.params.id;
  const enrolledData = await Enrollment.find({userId : id});
  const enrollmentIds = enrolledData.map(enrollment => enrollment._id);
  // console.log(enrolledData)
  const certificates = await Certification.find({enrollmentId: { $in : enrollmentIds}});
  // console.log(certificates)
  return res.json(certificates);
}

module.exports = { certificatePdf, checkCertificate, getCertificateview, getAvailableCertificate};
