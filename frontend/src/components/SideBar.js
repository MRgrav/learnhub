import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className='p-2 rounded-3 card shadow h-100'>
        <div className='bg-body-secondary border border-dark p-2 shadow rounded-top'>
          <b className='text-success fs-5 fw-bold'>My Courses</b>
        </div>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >Cryptography</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >RDBMS</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >DSA</Link></li>
        </ul>
        <hr/>
        <div className='bg-success-subtle border border-success p-2 shadow rounded-top'>
          <b className='text-primary fs-5 fw-bold'>New Courses</b>
        </div>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links me-2' >Cryptography</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >RDBMS</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >DSA</Link></li>
        </ul>
        <hr/>
        <div className='bg-primary-subtle border border-primary p-2 shadow rounded-top'>
          <b className='text-primary fs-5 fw-bold'>Specials</b>
        </div>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >Aptitudes</Link></li>
          <li className='list-group-item list-group-item-action'><Link to='/' className='links' >Interview Questions</Link></li>
        </ul>
    </div>
  )
}
