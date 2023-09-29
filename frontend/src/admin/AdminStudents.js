import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminStudents() {
  return (
    <div className='bg-theme p-4' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-10 p-2'>
                    <div className='card border rounded h-100'>
                        Students
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
