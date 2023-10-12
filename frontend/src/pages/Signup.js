import React from 'react';
// eslint-disable-next-line
import { useState, useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [formData,setValues] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    cpwd: "",
    utype: "",
    secretKey: ""
  });

  const toastOption = {
    position:"top-right",
    autoClose:8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  }
  
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    console.log(formData);
    if(formData.utype==='admin' && formData.secretKey!=='icebox'){
      toast.error("Wrong SECRET KEY",toastOption);
    }else{
      if (formData.username.length < 3) {
        toast.error("name is too short",toastOption);
        //console.log(phone);
      } else if (formData.phone.length < 9) {
        toast.error("correct phone no please",toastOption);
      } else if (formData.email === "") {
        toast.error("email is required",toastOption);
      } else if (formData.password.length < 5) {
        toast.error("password should contain atleast 6 characters",toastOption);
      } else if(formData.password !== formData.cpwd) {
        toast.error("password not matching",toastOption);
      } else {
        const result = await axios.post(registerRoute, formData);
        //console.log(result);
        if(result.data === "email already exist") {
          toast.error("Email already exist", toastOption);
  
        }else{
          //navigate('/login');
          toast.success("Registration succeessfull.",{
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      }
    }
    // alert("form");
    
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...formData,[name]: value});
  }

  //const [profileImage, setProfile] = useState("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F6f%2F10%2Fbe%2F6f10be133841bab189f465793794070d.jpg&f=1&nofb=1&ipt=8ff60767f27c30effc26c5c13229a818d3da5ae47c5a82756f722dca169bff4f&ipo=images");
  //const [profileImage, setProfile] = useState("./media/gallery2.png");

  // const handleProfile = (event) => {
  //   const input = event.currentTarget;

  //   var reader = new FileReader();
  //   reader.onload = () => {
  //     const dataURL = reader.result;
  //     setProfile({ src: dataURL });
  //   };
  //   reader.readAsDataURL(input.files[0]);
  // }

  return (
    <div className='card border-0 container login-container hv-100'>
      <div className='login-block d-flex flex-column shadow'>
        <b className='fs-4 text-center p-3 bg-primary rounded-top text-white'>
          CREATE ACCOUNT
          {formData.utype==='admin'?
          <small className='px-2 fs-6 fw-bold'>admin</small>:null}
        </b>
        <form onSubmit={(event) => handleSubmit(event)} className='login-form' action='' method='post'>
          <div className='d-flex flex-column p-4 border border-3 border-primary'>
            <table>
            <tbody>
              {/* <tr>
                <td className=''><label htmlFor='profile' className='align-self-end p-2 mt-auto'>Profile</label></td>
                <td className='text-end py-2'>
                  <small className='d-md-none fw-light fst-italic text-secondary pe-2' >select one or use default</small>
                  <label htmlFor='profile'><img className='reg-image' src={profileImage.src} alt=''/></label>
                  <input 
                  type='file' 
                  name='avatar' 
                  value={formData.profile} 
                  className='d-none' 
                  id='profile' 
                  accept="image/*"
                  onChange={(e) => handleProfile(e)}/>
                </td>
              </tr> */}
              <tr>
                <td>
                  <label htmlFor='name' className='p-2 py-2'>Name</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='username' value={formData.username} type='text' id='name' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='phone' className='p-2 py-2'>Phone</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='phone' value={formData.phone} type='text' id='phone' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='mail' className='p-2 py-2'>Email</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='email' value={formData.email} type='email' id='mail' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <label htmlFor='dob' className='p-2 py-2'>Date of Birth</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='dob' value={formData.dob} type='date' id='dob' onChange={(e) => handleChange(e)}/>
                </td>
              </tr> */}
              <tr>
                <td>
                  <label htmlFor='utype' className='p-2 py-2'>Type</label>
                </td>
                <td>
                  <select className='login-input border-primary' name='utype' value={formData.utype} id='utype' onSelect={(e)=>handleChange(e)}>
                    <option value={null} selected={true} disabled>--</option>
                    <option value='student'>Student</option>
                    <option value='working'>Working</option>
                    <option value='admin'>Admin</option>
                  </select>
                </td>
              </tr>
              {formData.utype === 'admin'?
              <tr>
                <td>
                  <label htmlFor='keyin' className='p-2 text-danger fw-bold'>Secret Key</label>
                </td>
                <td>
                  <input type='text' id='keyin' className='login-input border-danger bg-warning-subtle' name='secretKey' value={formData.secretKey} onChange={(e)=>handleChange(e)}/>
                </td>
              </tr>:null}
              <tr>
                <td>
                  <label htmlFor='pwd' className='p-2 pb-3'>Password</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='password' value={formData.password} type='password' id='pwd' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='pwd' className='p-2 py-2'>Confirm</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='cpwd' value={formData.cpwd} type='password' id='pwd' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
            </tbody>
            </table>
            <div className='d-flex justify-content-between p-3'>
              <button type='reset' className='btn btn-secondary shadow'>cancel</button>
              <button type='submit' onClick={handleChange} className='btn btn-success px-4 shadow'>sign in</button>
            </div>
            <hr/>
            <p className='text-center'>Already have an account? <a href='/login'>Login</a></p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
