import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminDash() {
  return (
    <div className='bg-theme p-4' style={{"height":"100vh"}}>
      <div className='container-fluid h-100'>
        <div className='d-flex h-100'>
          <AdminSidebar />
          <div className='col-10 p-2'>
            <div className='card border rounded h-100'>
              <div className='d-flex p-3'>
                <div className='col p-2'>
                  <div className='card text-white p-4 bg-success'>
                    <span className='fs-1 fw-bold'>4</span>
                    <span>Courses</span>
                  </div>
                </div>
                <div className='col p-2'>
                  <div className='card text-white p-4 bg-success'>
                    <span className='fs-1 fw-bold'>4</span>
                    <span>Students</span>
                  </div>
                </div>
                <div className='col p-2'>
                  <div className='card text-white p-4 bg-success'>
                    <span className='fs-1 fw-bold'>4</span>
                    <span>Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
