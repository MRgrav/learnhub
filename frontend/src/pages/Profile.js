import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseRoute } from '../utils/ApiRoutes';

export default function Profile() {
 
    // eslint-disable-next-line
    const [profileData, setData] = useState({
        username:'',
        phone:'',
        email:'',
        utype:''
    });

    useEffect(()=>{
        //const token = localStorage.getItem("token")
        //console.log(token);
        axios.get(`${baseRoute}/userdata`,{withCredentials:true})
        .then((res) => {
            console.log(res.data);
            if (res.data.Status === "ok") {
                console.log(res.data.data.email);
                setData(res.data.data);
            }
        })
    },[])

    //setData


  return (
    <div className='card container mt-5 py-5 border-0'>
        <div className='p-3 rounded-3 border shadow'>
            <div className="d-flex flex-row justify-content-between">
                <div className="align-self-end">
                    <p className="m-0">My Profile</p>
                    <b className="fs-4">{profileData.username}</b>
                </div>
                <div className="px-2">
                    <img className="profile-img main-profile" src="" alt="hey"/>
                </div>
            </div>
            <hr/>
            <div className='row m-0'>
                <div className='col-md col-sm-12 order-smm-2 order-1 p-3 mx-auto' style={{'maxWidth':'900px'}}>
                    <div className='d-flex justify-content-between'>
                        <b className='fst-italic text-uppercase'>Personal Info</b>
                        <Link to='/' ><i className='bi bi-pen text-dark'></i></Link>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i className="bi bi-phone-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>+91 {profileData.phone}</span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i className="bi bi-envelope-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>{profileData.email}</span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i className="bi bi-building-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>{profileData.utype}</span>
                        </div>
                    </div>
                </div>
                <div className='d-none col-md col-sm-12 p-3 bg-light '>
                    <div className="d-flex no-wrap">
                        <div className="col text-center">
                            <p>Su</p>
                            <span className="bg-warning px-3 border border-dark rounded rounded-pill"></span>
                        </div>
                        <div className="col text-center">Mo</div>
                        <div className="col text-center">Tu</div>
                        <div className="col text-center">We</div>
                        <div className="col text-center">Th</div>
                        <div className="col text-center">Fr</div>
                        <div className="col text-center">Sa</div>
                    </div>
                    <hr/> 
                </div>
            </div>
            <hr/>
            <div className="p-2">
                <div className='mx-auto' style={{'maxWidth':'900px'}}>
                    <b className='fw-bold text-uppercase fst-italic'>Course Completed</b>
                    <ul className='list-group mt-3 ps-4'>
                        <li className='list-group-item'>Rust</li>
                        <li className='list-group-item'>Python</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
