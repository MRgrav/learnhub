import React from 'react'
import Profile from '../pages/Profile';
import AdminSidebar from './AdminSidebar'

export default function AdminProfile() {
  return (
    <div className='bg-theme p-4' style={{"height":"100vh"}}>
        <div className='container-fluid h-100'>
            <div className='d-flex h-100'>
                <AdminSidebar />
                <div className='col-10 p-2'>
                    <div className='card border rounded h-100'>
                        <Profile />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
