import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import userContext from '../states/userContext';
// import Loading from './Loading';

export default function SideBar() {
  const {auth} = useContext(userContext);
  //fetch courses
  const [newCourses, setCourses] = useState()
  const [myCourses, setMyCourse] = useState()
  // const [id, setId] = useState()
  useEffect(()=> {
    axios.get(`${baseRoute}/get-courses`)
    .then((res) => {
        setCourses(res.data)
        console.log(res.data)
    })
    .catch(err => console.log(err))

    auth && (
      axios.get(`${baseRoute}/get-enrolled-courses`)
      .then(res => {
        console.log('ec', res.data)
        // setId(res.data.data.courseId)
        setMyCourse(res.data.data)
      }).catch(err => {
        console.log('error')
      })
    );
  },[auth])
  if(!newCourses){
    return (
      '..'
    )
  }else{
    console.log('crs ',newCourses[0].courseTitle)
    return (
      <div className='p-2 rounded-3 card shadow h-100'>
        {
          auth && (
            <>
              <div className='bg-secondary bg-opacity-50 border-dark-theme p-2 shadow rounded-top'>
                <b className='text-dark-theme fs-5 fw-bold'>My Courses</b>
              </div>
              <ul className='list-group'>
                {
                  myCourses &&
                  myCourses.map((myCourse, index) => {
                    return (<li className='list-group-item list-group-item-action' key={index}>
                      <Link to={`/my-course/`+myCourse.enrollmentId} className='links' >{myCourse.courseTitle}</Link>
                    </li>)
                  })
                }
              </ul>
              <hr/>
            </>
          )
        }
          <div className='bg-success bg-opacity-10 border border-success p-2 shadow rounded-top'>
            <b className='text-success-theme fs-5 fw-bold'>New Courses</b>
          </div>
          <ul className='list-group'>
            {
              // eslint-disable-next-line
              newCourses.map((courses, index)=>{
                if(index===0 || index===1 || index===2){
                  return (
                    <li className='list-group-item list-group-item-action'><Link to={`/course/${courses._id}`} className='links' >{courses.courseTitle}</Link></li>
                  )
                }
              })
            }
            
            {/* <li className='list-group-item list-group-item-action'><Link to='/' className='links' >RDBMS</Link></li>
            <li className='list-group-item list-group-item-action'><Link to='/' className='links' >DSA</Link></li> */}
          </ul>
          <hr/>
          <div className='bg-primary bg-opacity-10 border border-primary p-2 shadow rounded-top'>
            <b className='text-primary-theme fs-5 fw-bold'>Specials</b>
          </div>
          <ul className='list-group'>
            <li className='list-group-item list-group-item-action bg-theme'><Link to='/' className='links' >Aptitudes</Link></li>
            <li className='list-group-item list-group-item-action bg-theme'><Link to='/' className='links' >Interview Questions</Link></li>
          </ul>
      </div>
    )
  }
}
