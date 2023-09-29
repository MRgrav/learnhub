import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import CourseContinue from './pages/CourseContinue';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyCertificates from './pages/MyCertificates';
import QuizPage from './pages/QuizPage';
import AdminDash from './admin/AdminDash';
import { useState, useEffect } from 'react';
import { baseRoute } from './utils/ApiRoutes';
import axios from 'axios';
import AdminStudents from './admin/AdminStudents';
import userContext from './states/userContext';
import AdminProfile from './admin/AdminProfile';

function Main() {
  const navigate = useNavigate();
  axios.defaults.withCredantials = true;
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('public'); 
  const accessState = {
    auth: auth,
    role: role
  };
  useEffect(()=>{
    axios.get(`${baseRoute}/`,{ withCredentials: true })
    .then(res => {
      console.log(res.data.Status);
      if(res.data.Status === 'ok'){
        setAuth(true);
        setRole(res.data.role);
      }else{
        setAuth(false);
        setRole('public');
        console.log(res.data.Error);
        //navigate('/login');
      }
    })
    .then(err => {
      console.log(err);
    })
  },[navigate]);

  function PublicElement({children}){
    return(
      <>{children}</>
    );
  }
  function AdminElement({children}){
    if(role === 'admin'){
      return(
        <>
        {children}
        </>
      );
    }else{
      return(
        <>
          <AccessPage/>
        </>
      );
    }
  }
  function Students({children}){
    if(role === 'student'){
      return(
        <>
        {children}
        <Footer />
        </>
      );
    }else{
      return(
        <>
          <AccessPage/>
        </>
      );
    }
  }
  function BiUser({children}) {
    if(role === 'admin' || role === 'student'){
      return(
        <>
        {children}
        <Footer />
        </>
      );
    }else{
      return(
        <>
          <AccessPage/>
        </>
      );
    }
  }


  return (
    <div>
      <userContext.Provider value={accessState}>
      { (role==='admin')?null:<Navbar/>}
      <Routes>
      {
        // auth?
        //   <>
        // { (role==='admin')?
        // <Route path='/' element={<AdminDash />}/>:<Route path="/" element={<Home/>} /> }
        // <Route path='/course' element={<CourseDetails />} />
        // <Route path='/my-course' element={<CourseContinue />} />
        // <Route path='/my-certificates' element={<MyCertificates />} />
        // <Route path='/profile' element={<Profile />} />
        // <Route path='/quiz' element={<Students><QuizPage /></Students>} />
        
        //   </>
        // :
        // <>
        //   <Route path='/' element={<Home />} />
        //   <Route path='/create-account' element={<Signup />} />
        //   <Route path='/login' element={<Login />} />
        // </>
      }

      {(role==='admin')?
        <Route path='/' element={<AdminElement><AdminDash/></AdminElement>} />
        :
        <Route path='/' element={<PublicElement><Home/></PublicElement>} />
      }
        <Route path='/login' element={<PublicElement><Login/></PublicElement>} />
        <Route path='/course' element={<PublicElement><CourseDetails/></PublicElement>} />
        <Route path='/my-course' element={<Students><CourseContinue/></Students>} />
        <Route path='/students' element={<AdminElement><AdminStudents/></AdminElement>} />
        <Route path='/profile' element={<AdminElement><AdminProfile /></AdminElement>} />
        <Route path='/profile' element={<Students><Profile /></Students>} />
        <Route path='/my-certificates' element={<Students><MyCertificates /></Students>} />
        <Route path='/quiz' element={<Students><QuizPage /></Students>} />
      

        <Route path='*' element={<ErPage/>} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      </userContext.Provider>
    </div>
  );
}

// function getRole(){
//   if(localStorage.getItem('role') !== ''){
//     return localStorage.getItem('role');
//   }else{
//     return 'public';
//   }
// }

function ErPage() {
  return(
    <div className='container-fluid my-auto h-100'>
      <span className='text-center position-absolute top-50 start-50'>
        <b className='fs-3'>404</b><br/>Page not found!
      </span>
    </div>
  );
}

function AccessPage() {
  return(
    <div className='container-fluid my-auto h-100'>
      <span className='text-center position-absolute top-50 start-50'>
        <b className='fs-3'>ACCESS DENIED</b><br/>You do not have access to this page!
      </span>
    </div>
  );
}

export default Main;