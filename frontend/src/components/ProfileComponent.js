import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import { baseRoute } from '../utils/ApiRoutes';
import userContext from '../states/userContext';

export default function ProfileComponent() {
    const [readWrite, setReadWrite] = useState(true);
    const handleRW = () => {
        if(readWrite !== true){
            setReadWrite(true);
        }else{
            setReadWrite(false);
        }
    }
    const {role} = useContext(userContext);
    // eslint-disable-next-line
    const [profileData, setData] = useState({
        username:'',
        phone:'',
        email:'',
        utype:''
    });
    const [formData, setValues] = useState({
        phone: profileData.phone,
        username: ''
    });
    const handleForm = (e) => {
        const {name, value} = e.target;
        setValues({...formData,[name]: value});
    }

    useEffect(()=>{
        //console.log(token);
        axios.get(`${baseRoute}/userdata`,{withCredentials:true})
        .then((res) => {
            console.log(res.data);
            if (res.data.Status === "ok") {
                console.log(res.data.data.email);
                setData(res.data.data);
                setValues(res.data.data);
            }
        })
    },[])
  return (
    <div className='p-3 container rounded-3 border shadow'>
            <div className="d-flex flex-row mx-auto justify-content-between" style={{'maxWidth':'900px'}}>
                <div className="align-self-end px-2">
                    <p className="m-0">My Profile</p>
                    <b className="fs-4">{profileData.username}</b>
                </div>
                <div className="px-2">
                    <img className="profile-img main-profile" src="./media/paimg4.jpg" alt="hey"/>
                </div>
            </div>
            <hr/>
            <div className='d-flex'>
                <div className='col-md col-sm-12 order-smm-2 order-1 p-3 mx-auto' style={{'maxWidth':'900px'}}>
                    <div className='d-flex justify-content-between'>
                        <b className='fst-italic text-uppercase'>Personal Info</b>
                        {
                            readWrite?
                            <button onClick={handleRW} className='border-0 bg-transparent'>
                                <i className='bi bi-pen text-dark-theme'></i>
                            </button>
                            :
                            <button onClick={handleRW} className='border-0 bg-transparent'>
                                <i className='bi bi-box-arrow-left text-dark-theme'></i>
                            </button>
                        }
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i className="bi bi-phone-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span><input readOnly={readWrite} className='pe-2 border-0 bg-transparent outline-0' name='username' onChange={(e)=>handleForm(e)} value={formData.username} /></span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i className="bi bi-phone-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>+91 <input readOnly={readWrite} className='px-2 border-0 bg-transparent outline-0' name='phone' onChange={(e)=>handleForm(e)} value={formData.phone} /></span>
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
            {role==='student'?
            <>
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
            </>
            :null
            }
            {
                readWrite?null:
                <div className='container d-flex justify-content-end' style={{'maxWidth':'900px'}}>
                    <button className='btn btn-primary'>save</button>
                </div>
            }
        </div>
  )
}
