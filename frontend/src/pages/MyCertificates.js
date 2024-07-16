import React, { useContext, useEffect, useState } from 'react'
import CertificateCards from '../components/CertificateCards'
import SideBar from '../components/SideBar'
import SideProfile from '../components/SideProfile'
import userContext from '../states/userContext'
import { baseRoute } from '../utils/ApiRoutes'
import axios from 'axios'

export default function MyCertificates() {
  //
  const {userId} = useContext(userContext)
  // console.log('me ', userId)
  const [myCertificates, setMyCertificates] = useState()
  useEffect(()=>{ 
    axios.get(`${baseRoute}/get-available-certificate/`+userId)
    .then((result) => {
      // console.log(result)
      setMyCertificates(result.data)
    }).catch((err) => {
      
    });
  },[userId])
  return (
    <div className='bg-theme p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
      <div className="d-flex">
        <div className="col-lg-2 col-sm-12 p-md-2 d-md-none d-lg-block p-sm-0">
          <SideBar/>
          </div>
        <div className="col-lg col-sm-12 p-md-2 px-sm-0">
          <div className='card border shadow container p-4'>
            <b className='fs-4 text-uppercase pb-4'>My Certificates</b>    
            {
              myCertificates?
              myCertificates.map((certificate, index)=>
              <CertificateCards key={index} certificateData={certificate}/>
              ):null
            }
        </div>
        </div>
        <div className="col-lg-4 col-xxl-3 col-md-4 col-sm p-md-2 px-sm-0 d-md-none d-lg-block">
          <SideProfile/>
        </div>
      </div>
    </div>
  )
}
