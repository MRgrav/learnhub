import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className='card container mt-5 py-5 border-0'>
        <div className='p-3 rounded-3 border shadow'>
            <div className="d-flex flex-row justify-content-between">
                <div className="align-self-end">
                    <p className="m-0">My Profile</p>
                    <b className="fs-4">Gaurab Gogoi</b>
                </div>
                <div className="px-2">
                    <img className="profile-img main-profile" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd44d538650505.598fa11957245.jpg" alt=""/>
                </div>
            </div>
            <hr/>
            <div className='row m-0'>
                <div className='col-md col-sm-12 order-smm-2 order-1 p-3 mx-auto' style={{'max-width':'900px'}}>
                    <div className='d-flex justify-content-between'>
                        <b className='fst-italic text-uppercase'>Personal Info</b>
                        <Link to='/' ><i className='bi bi-pen text-dark'></i></Link>
                    </div>
                    <div className='d-flex py-1 pt-3'>
                        <div className='p-2'>
                            <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>Golaghat, Assam</span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i class="bi bi-phone-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>+91 70021 69749</span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i class="bi bi-envelope-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>email@email.learnhub</span>
                        </div>
                    </div>
                    <div className='d-flex py-1'>
                        <div className='p-2'>
                            <i class="bi bi-building-fill"></i>
                        </div>
                        <div className='p-2 bg-secondary bg-opacity-25 w-100'>
                            <span>student</span>
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
                <div className='mx-auto' style={{'max-width':'900px'}}>
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
