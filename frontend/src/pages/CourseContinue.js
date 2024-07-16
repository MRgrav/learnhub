import React, { useEffect, useState } from 'react';
import CourseRunning from '../components/CourseRunning';
import SideProfile from '../components/SideProfile';
import SideBar from '../components/SideBar';
import axios from 'axios';
import Loading from '../components/Loading';
import { baseRoute } from '../utils/ApiRoutes';
import { useParams } from 'react-router-dom';
//import userContext from '../states/userContext';

export default function CourseContinue() {
  const [data, setValues] = useState();
  const {id} = useParams();
  //const {auth,userId} = useContext(userContext);
  //alert(id)
  useEffect(() => {
    axios
    .get(`${baseRoute}/get-enrolled-course/`+id)
    .then((result) => {
      console.log('runC: ',result.data.data)
      setValues(result.data.data)
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
      <div className='card p-md-4 px-sm-0 pt-md-5 pt-sm-0 mt-5'>
        <div className="d-flex">
          <div className="col-lg-2 col-sm-12 p-md-2 d-md-none d-lg-block p-sm-0">
            <SideBar/>
          </div>
          <div className="col-xxl-7 col-lg-6 col-sm-12 p-md-2 px-sm-0 pe-auto mw-90">
            <CourseRunning courseData={data} enrollmentId={id}/>
          </div>
          <div className="col-lg-4 col-xxl-3 col-md-4 col-sm p-md-2 px-sm-0 d-md-none d-lg-block">
            <SideProfile/>
          </div>
        </div>
      </div>
    )
  }
}
