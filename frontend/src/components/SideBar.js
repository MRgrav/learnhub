import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className='p-2 rounded-3 card shadow h-100'>
        <div className='bg-secondary bg-opacity-50 border-dark-theme p-2 shadow rounded-top'>
          <b className='text-dark-theme fs-5 fw-bold'>My Courses</b>
        </div>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >Cryptography</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >RDBMS</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >DSA</Link></li>
        </ul>
        <hr/>
        <div className='bg-success bg-opacity-10 border border-success p-2 shadow rounded-top'>
          <b className='text-success-theme fs-5 fw-bold'>New Courses</b>
        </div>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >Cryptography</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >RDBMS</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >DSA</Link></li>
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
