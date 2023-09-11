import React from 'react'

export default function Navbar () {
  return (
    <div>
        <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary bg-success fixed-top shadow">
            <div className="container-xxl">
              <a className="navbar-brand text-white fw-bold fst-italic fs-3" href="/">LearnHub</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/my-certificates">Certificates</a>
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
                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    <li><a className="dropdown-item" href="*">Login</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item p-2" href="*"><span className='btn btn-outline-danger'>Logout</span></a></li>
                  </ul>
                </div>
                <div className='nav-item d-lg-none d-md-block p-2'>
                  <hr/>
                  <a className='btn btn-sm btn-danger px-3' href='/login'>Logout</a>
                </div>
              </div>
            </div>
          </nav>
    </div>
  )
}
