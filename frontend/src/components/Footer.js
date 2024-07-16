import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../states/userContext'

export default function Footer() {
    const {auth} = useContext(userContext);
  return (
    <div>
        <div className="container-fluid m-0 p-4">
            <div className="d-flex row container mx-auto">
                <div className="col-lg p-2">
                    <p className="fs-5 fw-bold">Links</p>
                    <ul>
                        <li><Link to='/'>Dashboard</Link></li>
                        {
                            auth && (
                                <>
                                <li><Link to='/my-course'>Courses</Link></li>
                                <li><Link to='/my-certificates'>Certificates</Link></li>
                                <li><Link to='/profile'>Profile</Link></li>
                                </>
                            )
                        }
                    </ul>
                </div>
                <div className="col-lg p-2 text-center">
                    LearHub copyright &copy; 2023
                </div>
                <div className="col-lg p-2 me-0 text-lg-end">
                    <address>
                    1234 Elm Street,
                    Cityville,
                    Stateland,
                    Zip Code: 98765,
                    Countrytopia.
                    </address>
                </div>
            </div>
        </div>
    </div>
  )
}
