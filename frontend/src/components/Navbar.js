import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
//import userContext from '../Main';document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
import userContext from '../states/userContext';

export default function Navbar () {
  const {auth} = useContext(userContext);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    //console.log('resl', document.cookie.includes('token'));
    if (!document.cookie.includes('token')){
      console.log('logout')
      navigate('/login');
    }else{
      console.log('failed');
    }
    // axios.get(`${baseRoute}/logout`)
    // .then((res) => {
    //   console.log(res);
    //   if (res.data.Status === 'Logout successful'){
        
    //   }else{
    //     console.log('error loging out')
    //   }
    // }).catch(err=> console.log(err));
  }
  return (
    <div>
        <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary bg-success fixed-top shadow">
            <div className="container-xxl">
              <a className="navbar-brand text-white fs-3" href="/"><i className='bi bi-bug px-2'></i>LearnHub</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Dashboard</a>
                  </li>
                  <li className="nav-item">
                    {auth?
                    <a className="nav-link" aria-current="page" href="/my-certificates">Certificates</a>:null}
                  </li>

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="*" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Courses
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="*">Python</a></li>
                      <li><a className="dropdown-item" href="*">Rust</a></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><a className="dropdown-item" href="*">AI/ML</a></li>
                    </ul>
                  </li>
                  <li className='nav-item d-md-block d-lg-none'>
                    <a className='nav-link' href='/profile'>Profile</a>
                  </li>
                </ul>
                <div className='nav-item dropdown d-lg-block d-md-none'> 
                  <a href="*" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <b className='fw-bold text-white px-2'>Hello Gaurab</b>
                    <img className="profile-img nav-img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F02%2F33%2F46%2F24%2F360_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg&f=1&nofb=1&ipt=7628c7602f78c0dcd987d1cefecde3d5b70032407a85790583360cb1eff0010e&ipo=images" alt=""/>
                  </a>
                  <ul className="dropdown-menu">
                    {auth?
                      <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    :
                      <li><a className="dropdown-item" href="/signup">Create account</a></li>
                    }
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                      <span className='dropdown-item p-2'>
                        {auth?
                        <button className="btn btn-outline-danger" onClick={(e)=>handleLogout(e)}>Logout</button>
                        :
                        <a className='btn btn-outline-primary' href='/login'>Login</a>
                      }
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='nav-item d-lg-none d-md-block p-2'>
                  <hr/>
                    {auth?
                      <button className="btn btn-sm btn-danger px-3" onClick={(e)=>handleLogout(e)}>Logout</button>
                    :
                      <a className='btn btn-sm btn-primary px-3' href='/login'>Login</a>
                    }
                </div>
              </div>
            </div>
          </nav>
    </div>
  )
}
