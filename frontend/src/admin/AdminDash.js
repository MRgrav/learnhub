import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios'
import { baseRoute } from '../utils/ApiRoutes'
import { Bar } from 'react-chartjs-2'
import {Chart as Chartjs, BarElement, CategoryScale, LinearScale} from 'chart.js'

Chartjs.register(
  BarElement,
  CategoryScale,
  LinearScale
)

export default function AdminDash() {
  axios.defaults.withCredentials = true;
  const [dashData, setDashData] = useState({
    totalUser: 0,
    totalCourse: 0,
    totalEnrollment: 0,
  });
  console.log('hey running')
  const data = {
    labels: ['Users', 'Courses', 'Enrolled', 'Certified'],
    datasets: [
      {
        label: 11,
        data: [dashData.totalUser, dashData.totalCourse, dashData.totalEnrollment, dashData.totalCertificate],
        backgroundColor: 'aqua',
        borderColor: 'black',
        border: 1,

      }
    ]
  }
  const option = {

  }
  useEffect(()=>{
    async function fetchData() {
      try {
        await axios.get(`${baseRoute}/get-dash-data`)
        .then((res)=>{
          console.log(res)
          setDashData(res.data)
        }).catch((err)=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])
  return (
    <div className='bg-theme p-3' style={{"height":"100vh"}}>
      <div className='container-fluid h-100'>
        <div className='d-flex h-100'>
          <AdminSidebar />
          <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
            <div className='card border rounded h-100'>
              <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Today's report</span>
              <div className='d-flex p-3 pt-2 flex-wrap'>
                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>{dashData.totalCourse}</span>
                        <span>Courses</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-collection-play-fill'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>{dashData.totalUser - 1}</span>
                        <span>Users</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-person-fill'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>{dashData.totalEnrollment}</span>
                        <span>Enrolled</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-cup-hot-fill'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-xl-3 col-lg-4 p-2'>
                  <div className='card text-theme p-4 bg-success bg-opacity-25 shadow border-0'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex flex-column'>
                        <span className='fs-1 fw-bold'>{dashData.totalCertificate}</span>
                        <span>Certified</span>
                      </div>
                      <div>
                        <div className='rounded-circle bg-success bg-opacity-50 px-3 p-2 '>
                          <span className='fs-1 text-white'><i className='bi bi-award-fill'></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <hr/>

              <div className='px-4'>
                <div className='card rounded-4 shadow p-3' style={{maxHeight: "400px"}}> 
                  <Bar
                    data  = {data}
                    options={option}
                    height={400}
                    width={700}
                  >

                  </Bar>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
