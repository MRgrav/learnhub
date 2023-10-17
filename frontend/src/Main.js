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
import ViewCertificate from './pages/ViewCertificate';
import AdminCourses from './admin/AdminCourses';
import ErPage from './pages/ErPage';
import AccessPage from './pages/AccessPage';
import AdminAddCourse from './admin/AdminAddCourse';
import AdminCourseEdit from './admin/AdminCourseEdit';

function Main() {
  const navigate = useNavigate();
  axios.defaults.withCredantials = true;
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('public'); 
  const [name, setName] = useState('');
  const [fname, setFName] = useState('');
  function handleFirstName(text){
    const arrName = text.split(' ');
    setFName(arrName[0]);
  };
  const accessState = {
    auth: auth,
    role: role,
    name: name,
    fname: fname
  };
  useEffect(()=>{
    axios.get(`${baseRoute}/`,{ withCredentials: true })
    .then(res => {
      console.log(res.data);
      if(res.data.Status === 'ok'){
        setAuth(true);
        setRole(res.data.role);
        setName(res.data.name);
        handleFirstName(res.data.name);
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
  // eslint-disable-next-line
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
        <>
          <Route path='/' element={<AdminElement><AdminDash/></AdminElement>} />
          <Route path='/profile' element={<AdminElement><AdminProfile /></AdminElement>} />
        </>
        :
        <>
          <Route path='/' element={<PublicElement><Home/></PublicElement>} />
          <Route path='/profile' element={<Students><Profile /></Students>} />
        </>
      }
        <Route path='/login' element={<PublicElement><Login/></PublicElement>} />
        <Route path='/course' element={<PublicElement><CourseDetails/></PublicElement>} />
        <Route path='/course/:id' element={<PublicElement><CourseDetails/></PublicElement>} />
        <Route path='/my-course' element={<Students><CourseContinue/></Students>} />
        <Route path='/courses' element={<AdminElement><AdminCourses /></AdminElement>} />
        <Route path='/new-course' element={<AdminElement><AdminAddCourse /></AdminElement>} />
        <Route path='/students' element={<AdminElement><AdminStudents/></AdminElement>} />
        <Route path='/my-certificates' element={<Students><MyCertificates /></Students>} />
        <Route path='/quiz' element={<Students><QuizPage /></Students>} />
        <Route path='/certificate' element={<Students><ViewCertificate /></Students>} />
        <Route path='/edit-course/:id' element={<AdminElement><AdminCourseEdit/></AdminElement>} />
      

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


export default Main;