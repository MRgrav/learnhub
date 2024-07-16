import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import CourseDetails from './pages/CourseDetails';
// import CourseContinue from './pages/CourseContinue';
import Footer from './components/Footer';
// import Profile from './pages/Profile';
import Login from './pages/Login';
// import Signup from './pages/Signup';
// import MyCertificates from './pages/MyCertificates';
// import QuizPage from './pages/QuizPage';
// import AdminDash from './admin/AdminDash';
import { useState, useEffect, lazy, Suspense } from 'react';
import { baseRoute } from './utils/ApiRoutes';
import axios from 'axios';
// import AdminStudents from './admin/AdminStudents';
import userContext from './states/userContext';
// import AdminProfile from './admin/AdminProfile';
// import ViewCertificate from './pages/ViewCertificate';
import AdminCourses from './admin/AdminCourses';
import ErPage from './pages/ErPage';
// import AccessPage from './pages/AccessPage';
import AdminAddCourse from './admin/AdminAddCourse';
import Loading from './components/Loading';
// import CertificatePDF from './certificate/CertificatePDF';
// import AdminCourseEdit from './admin/AdminCourseEdit';

//const Login = lazy(()=> import('./pages/Login'))
const Signup = lazy(()=> import('./pages/Signup'))
const MyCertificates = lazy(()=> import('./pages/MyCertificates'))
const QuizPage = lazy(()=> import('./pages/QuizPage'))
const AdminDash = lazy(()=> import('./admin/AdminDash'))
const AdminStudents = lazy(()=> import('./admin/AdminStudents'))
const AdminProfile = lazy(()=> import('./admin/AdminProfile'))
const ViewCertificate = lazy(()=> import('./pages/ViewCertificate'))
// const AdminCourses = lazy(()=> import('./admin/AdminCourses'))
//const ErPage = lazy(()=> import('./pages/ErPage'))
const AccessPage = lazy(()=> import('./pages/AccessPage'))
// const AdminAddCourse = lazy(()=> import('./admin/AdminAddCourse'))
const AdminCourseEdit = lazy(()=> import('./admin/AdminCourseEdit'))
// const Navbar = lazy(()=> import('./components/Navbar'))
// const Home = lazy(()=> import('./pages/Home'))
const CourseDetails = lazy(()=> import('./pages/CourseDetails'))
const CourseContinue = lazy(()=> import('./pages/CourseContinue'))
// const Footer = lazy(()=> import('./components/Footer'))
const Profile = lazy(()=> import('./pages/Profile'))

function Main({loading}) {
  const navigate = useNavigate();
  axios.defaults.withCredantials = true;
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('public'); 
  const [name, setName] = useState('');
  const [userId, setId] = useState();
  const [fname, setFName] = useState('');
  function handleFirstName(text){
    const arrName = text.split(' ');
    setFName(arrName[0]);
  };
  const accessState = {
    auth: auth,
    role: role,
    name: name,
    userId: userId,
    fname: fname
  };
  useEffect(()=>{
    axios.get(`${baseRoute}/`,{ withCredentials: true })
    .then(res => {
      console.log(res.data);
      if(res.data.Status === 'ok'){
        setAuth(true);
        console.log(auth);
        setRole(res.data.role);
        setName(res.data.name);
        setId(res.data.id);
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
  },[navigate, auth]);

  function PublicElement({children}){
    return(
      <>
        {children}
        <Footer />
      </>
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
    <div className={loading}>
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
          <Route path='/' exact element={<Suspense fallback={<Loading/>}><AdminElement><AdminDash/></AdminElement></Suspense>} />
          <Route path='/profile' element={<Suspense fallback={<Loading/>}><AdminElement><AdminProfile /></AdminElement></Suspense>} />
        </>
        :
        <>
          <Route path='/' exact element={<Suspense fallback={<Loading/>}><PublicElement><Home/></PublicElement></Suspense>} />
          <Route path='/profile' element={<Students><Suspense fallback={<Loading/>}><Profile /></Suspense></Students>} />
        </>
      }
        <Route path='/login' element={<PublicElement><Login/></PublicElement>} />
        <Route path='/course' element={<PublicElement><Suspense fallback={<Loading/>}><CourseDetails/></Suspense></PublicElement>} />
        <Route path='/course/:id' element={<PublicElement><Suspense fallback={<Loading/>}><CourseDetails/></Suspense></PublicElement>} />
        {/* <Route path='/my-course/:id' element={<Students><CourseContinue/></Students>} /> */}
        <Route path='/my-course/:id' element={<Students><Suspense fallback={<Loading/>}><CourseContinue/></Suspense></Students>} />
        
				{/* <CourseContinue /> */}
			
        <Route path='/courses' element={<AdminElement><Suspense fallback={<Loading/>}><AdminCourses /></Suspense></AdminElement>} />
        <Route path='/new-course' element={<AdminElement><Suspense fallback={<Loading/>}><AdminAddCourse /></Suspense></AdminElement>} />
        <Route path='/students' element={<AdminElement><Suspense fallback={<Loading/>}><AdminStudents/></Suspense></AdminElement>} />
        <Route path='/my-certificates' element={<Students><Suspense fallback={<Loading/>}><MyCertificates /></Suspense></Students>} />
        <Route path='/quiz/:id' element={<Students><Suspense fallback={<Loading/>}><QuizPage /></Suspense></Students>} />
        <Route path='/certificate/user/share/:id' element={<Suspense fallback={<Loading/>}><ViewCertificate /></Suspense>} />
        <Route path='/certificate/user/shared/:id' element={<Suspense fallback={<Loading/>}><ViewCertificate /></Suspense>} />
        <Route path='/edit-course/:id' element={<Suspense fallback={<Loading/>}><AdminElement><AdminCourseEdit/></AdminElement></Suspense>} />
        <Route path='/tyu' element={<ViewCertificate/>} />
      

        <Route path='*' element={<ErPage/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-account' element={<Signup />} />
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