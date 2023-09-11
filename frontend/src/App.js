import './App.css';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" exact element={<Home/>} />
        <Route path='/course' element={<CourseDetails />} />
        <Route path='/my-course' element={<CourseContinue />} />
        <Route path='/my-certificates' element={<MyCertificates />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<Signup />} />
        <Route path='/quiz' element={<QuizPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
