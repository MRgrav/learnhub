import React from 'react';
import {Link} from 'react-router-dom';

export default function CertificateCards() {
  return (
    <div className='card pb-3 border-0'>
        <Link to='/certificate' className='link d-flex flex-row card p-3 rounded-3 shadow'>
            <div className='flex-shrink-0 p-2'>
                <img src='./logo512.png' className='certificate-thumb' alt='' />
            </div>
            <p className='flex-grow-1 ms-2 mb-0 p-2 c-thumb-text'>
              <b className='fs-5'>Python</b><br/>
              <small className='text-secondary'>completed on : 12 Aug, 2020</small><br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Link>
    </div>
  )
}
