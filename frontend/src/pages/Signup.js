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
    dob: "",
    password: "",
    cpwd: ""
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
    // alert("form");
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
      await axios.post(registerRoute, formData)
      .then( res => {
        toast.success("Registration succeessfull.",{
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/login');
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...formData,[name]: value});
  }

  return (
    <div className='card border-0 container login-container hv-100'>
      <div className='login-block d-flex flex-column shadow'>
        <b className='fs-4 text-center p-3 bg-primary rounded-top text-white'>CREATE ACCOUNT</b>
        <form onSubmit={(event) => handleSubmit(event)} className='login-form' action='' method='post'>
          <div className='d-flex flex-column p-4 border border-3 border-primary'>
            <table>
            <tbody>
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
              <tr>
                <td>
                  <label htmlFor='dob' className='p-2 py-2'>Date of Birth</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='dob' value={formData.dob} type='date' id='dob' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='pwd' className='p-2 pb-3'>password</label>
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
              <button className='btn btn-secondary shadow'>cancel</button>
              <button type='submit' onClick={handleChange} className='btn btn-success px-4 shadow'>sign in</button>
            </div>
            <hr/>
            <p className='text-center'>already have an account <a href='/login'>Login</a></p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}