import React, { useEffect, useState } from 'react'
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
// import CertificatePDF from '../certificate/CertificatePDF'
import DemoCertificate from '../components/DemoCertificate'
// import html2pdf from 'html2pdf.js'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseRoute } from '../utils/ApiRoutes';
import Loading from '../components/Loading';
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

export default function ViewCertificate() {
  const { id } = useParams();
  console.log(id);
  const [pdfData, setPdfData] = useState();
  const handleDownload = async () => {   
    try {
      // const testPDF = {
      //   userName : 'Gaurab Gogoi',
      //   courseName : 'Laravel 10',
      //   courseLevel: 'Advanced',
      //   certificateDate: '17th Nov, 2023',
      //   certificateId: id
      // }
      const response = await axios.post('http://localhost:5003/api/generate-certificate', pdfData, {
        responseType: 'arraybuffer', // Ensure the response is treated as an array buffer
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Certificate.pdf';
      link.click();
      
    } catch (error) {
      console.error(error)
      console.log(error)
    }
  }
  useEffect(()=>{
    axios.get(`${baseRoute}/get-certificate-view/`+id)
    .then(res => {
      setPdfData({
        userName: res.data.certificate.userName,
        courseName: res.data.courseData.courseTitle,
        courseLevel: res.data.courseData.courseLevel,
        certificateDate: res.data.certificate.certifiedDate,
        certificateId: res.data.certificate._id,
      })
    })
    // const testPDF = {
    //   userName : 'Gaurab Gogoi',
    //   courseName : 'Laravel 10',
    //   courseLevel: 'Advanced',
    //   certificateDate: '17th Nov, 2023',
    //   certificateId: id
    // }
  },[id])
  if(!pdfData){
    return <Loading/>
  } else {
  return (
    <div className='bg-theme p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5' style={{'height':'fit-content', 'min-height': '1000px'}}>
        <div className='container' style={{'height':'100%'}}>
            <span className='fs-3 fw-bold'>Certificate</span>
            <hr/>
            <div ><DemoCertificate certificateData={pdfData}/></div>
          
            {/* <div className='certificate-wrapper'>
                <PDFViewer className='w-100 h-100' >
                    <CertificatePDF/>
                </PDFViewer>
            </div> */}
            <hr/>
            <button onClick={handleDownload} className='btn btn-primary shadow'><i className='bi bi-download me-2'></i>Download</button>
            <div className='py-5'>
                <div className='p-2 bg-warning bg-opacity-25 text-center'>
                  <code className='fst-italic'>This certificate is computer-generated; the actual certificate may differ in appearance.</code>
                </div>
            </div>
        </div>
    </div>
  )
  }
}
