import React from 'react'
import CertificateCards from '../components/CertificateCards'
import SideBar from '../components/SideBar'
import SideProfile from '../components/SideProfile'

export default function MyCertificates() {
  return (
    <div className='bg-theme p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
      <div className="d-flex">
        <div className="col-lg-2 col-sm-12 p-md-2 d-md-none d-lg-block p-sm-0">
          <SideBar/>
          </div>
        <div className="col-lg col-sm-12 p-md-2 px-sm-0">
          <div className='card border shadow container p-4'>
            <b className='fs-4 text-uppercase pb-4'>My Certificates</b>    
            <CertificateCards />
            <CertificateCards />
            <CertificateCards />
            <CertificateCards />
        </div>
        </div>
        <div className="col-lg-4 col-xxl-3 col-md-4 col-sm p-md-2 px-sm-0 d-md-none d-lg-block">
          <SideProfile/>
        </div>
      </div>
    </div>
  )
}
