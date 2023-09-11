import React from 'react';
import HomeBody from '../components/HomeBody';
import SideProfile from '../components/SideProfile';
import SideBar from '../components/SideBar';

export default function Home() {
  return (
    <div className='bg-body-secondary p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
      <div className="d-flex">
        <div className="col-lg-1 col-sm-12 p-md-2 d-none p-sm-0">
          <SideBar/>
        </div>
        <div className="col-lg col-sm-12 p-md-2 px-sm-0 pe-auto mw-90">
          <HomeBody/>
        </div>
        <div className="col-lg-3 col-sm p-md-2 px-sm-0 d-md-none d-xl-block">
          <SideProfile/>
        </div>
      </div>
    </div>
  )
}
