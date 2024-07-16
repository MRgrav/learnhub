import React from 'react'
import { Link } from 'react-router-dom'

export default function CardEnrolled(data) {
  console.log('dd', data.data)
  const coursePercentage = Math.ceil((data.data.courseProgress/data.data.totalCourse)*100);
  return (
    <div className='d-flex flex-column p-md-3 p-2'>
      <div className='w-100 text-end px-3' style={{marginBottom: "-24px", zIndex: "10"}}>
          <span className='bg-danger px-2 text-white rounded-bottom-3 shadow'>{data.data.courseLevel.toUpperCase()}</span>
        </div>
      <Link to={`/my-course/${data.data.enrollmentId}`} className='card d-flex p-md-3 p-0 shadow rounded w-100 bg-theme border'>
        
        <div className='d-flex flex-sm-row flex-column'>
          <div className='mx-auto'>
            <img 
              className='rounded shadow w-sm-100 h-sm-100' 
              src={data.data.thumbnail} alt='' 
              height={150} width={210}
              style={{
                objectFit: "cover",
                maxWidth: "100%"
              }}/>
          </div>
          <div className='col'>
            <div className='card-body px-3 py-1'>
              <b className='fs-5 card-title'>{data.data.courseTitle}</b>
              <div className='d-flex justify-item-between w-100 pb-3'>
                <p className='mb-0 me-auto fw-light '>{data.data.category}</p>
                <p className='mb-0 fs-6 fw-lighter'><small>{data.data.totalCourse} course contents</small></p>
              </div>
              <div className='d-flex flex-column mb-2 mt-auto'>
                <progress className='w-100' max={data.data.totalCourse} value={data.data.courseProgress} ></progress>
                <small className='text-success'>{coursePercentage}% completed</small>
                {
                  coursePercentage===100
                    ?<small className='text-end text-secondary'>
                      assessment pending 
                      <i className='bi bi-bell-fill ps-1'></i>
                    </small>:null
                }
              </div>
            </div>
          </div>
        </div>
      </Link>  
    </div>
  )
}
