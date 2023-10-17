import React, { useEffect, useState } from 'react';
import SideProfile from '../components/SideProfile';
import CourseDetailsBody from '../components/CourseDetailsBody';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { baseRoute } from '../utils/ApiRoutes';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';


export default function CourseDetails() {
  const [data, setValues] = useState();
  const {id} = useParams();
  useEffect(() => {
    axios
    .get(`${baseRoute}/get-course/`+id)
    .then((result) => {
      //console.log(result)
      setValues(result.data)
    }).catch((err) => {
      console.log(err)
    })
  },[id])
  if (!data) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }else{
    return (
      <div className='card bg-theme p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
        <div className="d-flex">
          <div className="col-lg-2 col-sm-12 p-md-2 d-md-none d-lg-block p-sm-0">
            <SideBar/>
          </div>
          <div className="col-lg col-sm-12 p-md-2 px-sm-0 ">
            <CourseDetailsBody courseData={data}/>
          </div>
          <div className="col-lg-4 col-xxl-3 col-md-4 col-sm p-md-2 px-sm-0 d-md-none d-lg-block">
            <SideProfile/>
          </div>
        </div>
      </div>
    )
  }
}
