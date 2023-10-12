import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminDash() {
  return (
    <div className='bg-theme p-3' style={{"height":"100vh"}}>
      <div className='container-fluid h-100'>
        <div className='d-flex h-100'>
          <AdminSidebar />
          <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
            <div className='card border rounded h-100'>
              <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Today's report</span>
              <div className='d-flex p-3 pt-2 flex-wrap'>
                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>4</span>
                        <span>Courses</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-person'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>4</span>
                        <span>Courses</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-person'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>4</span>
                        <span>Courses</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-person'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>4</span>
                        <span>Courses</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-person'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <hr/>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
