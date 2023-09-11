import React from 'react';
import SideProfile from '../components/SideProfile';
import CourseDetailsBody from '../components/CourseDetailsBody';
import SideBar from '../components/SideBar';


export default function CourseDetails() {
  return (
    <div className='bg-body-secondary p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
      <div className="d-flex">
        <div className="col-lg-2 col-sm-12 p-md-2 d-md-none d-lg-block p-sm-0">
          <SideBar/>
        </div>
        <div className="col-lg col-sm-12 p-md-2 px-sm-0">
          <CourseDetailsBody/>
        </div>
        <div className="col-lg-4 col-xxl-3 col-md-4 col-sm p-md-2 px-sm-0 d-md-none d-lg-block">
          <SideProfile/>
        </div>
      </div>
    </div>
  )
}
