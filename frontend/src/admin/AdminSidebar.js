import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
    const navigate = useNavigate();
    // const handleLogout = (e) => {
    //     axios.get(`${baseRoute}/logout`)
    //     .then((res) => {
    //         console.log(res.data);
    //       if (res.data.Status === 'Logout successful'){
    //         navigate('/login');
    //       }else{
    //         console.log('error loging out')
    //       }
    //     }).catch(err=> console.log(err));
    // }
    const handleLogout = (e) => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        //console.log('resl', document.cookie.includes('token'));
        if (!document.cookie.includes('token')){
          console.log('logout')
          navigate('/login');
        }else{
          console.log('failed');
        }
      }
  return (
    <div className='col p-2'>
        <div className='card d-flex rounded flex-column p-3 justify-content-between h-100'>
            <div className='mb-auto'>
                <div className='p-2 pb-4'>
                    <span className='fw-bold fs-3 text-dark-theme'>Admin panel</span>
                </div>
                <div className='p-2 w-100 bg-secondary bg-opacity-25 rounded mb-2'>
                    <Link to='/' className='text-dark-theme w-100 d-block' ><i className='bi bi-graph-up px-2'></i>Dashboard</Link>
                </div>
                <div className='p-2 w-100 bg-secondary bg-opacity-25 rounded mb-2'>
                    <Link to='/courses' className='text-dark-theme w-100 d-block' ><i className='bi bi-book px-2'></i>Courses</Link>
                </div>
                <div className='p-2 w-100 bg-secondary bg-opacity-25 rounded mb-2'>
                    <Link to='/students' className='text-dark-theme w-100 d-block' ><i className='bi bi-people px-2'></i>Students</Link>
                </div>
                <div className='p-2 w-100 bg-secondary bg-opacity-25 rounded mb-2'>
                    <Link to='/profile' className='text-dark-theme w-100 d-block' ><i className='bi bi-person-circle px-2'></i>Profile</Link>
                </div>
            </div>
            <div>
                <hr/>
                <button className='btn btn-danger w-100' onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    </div>
  )
}
