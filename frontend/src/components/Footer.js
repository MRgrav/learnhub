import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
        <div className="container-fluid m-0 p-4 bg-light">
            <div className="d-flex row">
                <div className="col-lg p-2">
                    copyright &copy; 2023
                </div>
                <div className="col-lg p-2">
                    <p className="fs-5 fw-bold">Links</p>
                    <ul>
                        <li><Link to='/'>Dashboard</Link></li>
                        <li><Link to='/my-course'>Courses</Link></li>
                        <li><Link to='/my-certificates'>Certificates</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                    </ul>
                </div>
                <div className="col-lg p-2">
                    <address>
                        add, ress, 
                        8767
                    </address>
                </div>
            </div>
        </div>
    </div>
  )
}
