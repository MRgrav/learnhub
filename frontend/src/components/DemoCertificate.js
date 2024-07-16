import React from 'react'
//import { StyleSheet } from '@react-pdf/renderer'

export default function DemoCertificate({certificateData}) {
    console.log('demo ', certificateData)
    const formatDate = (dateString) => {
        const monthOnly = new Date(dateString).toLocaleDateString('en-us', {month: 'short'});
        const yearOnly = new Date(dateString).toLocaleDateString('en-us', {year: 'numeric'})
        const day = new Date(dateString).getDate();
        const dayWithSuffix = getDayWithSuffix(day);
      
        return `${dayWithSuffix} ${monthOnly}, ${yearOnly}`;
      };
      
      const getDayWithSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return `${day}th`;
        }
        switch (day % 10) {
          case 1:
            return `${day}st`;
          case 2:
            return `${day}nd`;
          case 3:
            return `${day}rd`;
          default:
            return `${day}th`;
        }
      };

    const certifiedDate = formatDate(certificateData.certificateDate)
      
  return (
    <div className='bg-certificate m-auto'>
        <div className='text-dark'>
            <div className='d-flex'>
                <div className='col-8'>
                    <p className='h-certificate pt-3 mb-0'>CERTIFICATE</p>
                    <p className='fs-3 m-0 pb-4'>OF COMPELETION</p>
                    <p className='fs-5 m-0 pt-3'>{certifiedDate}</p>
                    <p className='fs-1 fw-bold m-0 pt-2 border-bottom' style={{'width':'fit-content'}}>{certificateData.userName}</p>
                    <p className='pt-3'> Has successfully completed </p>
                    <p className='fs-2 fw-bold'>{certificateData.courseName},</p>
                    <p className='mb-2'>the <b>{certificateData.courseLevel}</b> level course, is an online</p>
                    <p>quize based course from <b>LearnHub</b></p>
                </div>
                <div className='col-3'>
                    <div className='ratio ratio-1x1' style={{maxWidth: '200px'}}>
                        <div className='bg-success rounded-circle shadow border-2 border-white border'>
                            <div className='d-flex justify-content-center align-items-center h-100 w-100'>
                                <b className='navbar-brand fw-light text-white fs-3 me-0'>LearnHub</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-5'>
                <div>
                    <b className='d-block text-end w-100'>verify at</b>
                    <small className='m-0 p-0 text-primary'>http://localhost:3000/certificate/user/share/{certificateData.certificateId}</small>
                </div>
            </div>
        </div>
    </div>
  )
}
