import React from 'react'
import AdminSidebar from './AdminSidebar'
import ProfileComponent from '../components/ProfileComponent';

export default function AdminProfile() {
  return (
    <div className='bg-theme p-3' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
                  <div className='card border rounded h-100 py-5'>
                      <ProfileComponent />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
