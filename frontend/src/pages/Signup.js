import React from 'react';
// eslint-disable-next-line
import { useState, useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    // const numOnly => {
    //     return event.charCode>=48 && event.charCode<=57;
    // }
  const [value,setValues] = useState({
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert("form");
    handleValidation();
  }

  const handleChange = (event) => {
    setValues({...value,[event.target.value]: event.target.value});
  }

  const handleValidation = () => {
    // eslint-disable-next-line
    const {username, phone, email, dob, password, cpwd} = value; 
    if (username.length < 3) {
      toast.error("name is too short",toastOption);
      console.log(phone);
      return false;
    } 
    if (phone.length < 9) {
      toast.error("correct phone no please",toastOption);
      return false;
    } 
    if (email === "") {
      toast.error("email is required",toastOption);
      return false;
    }
    if (password.length < 5) {
      toast.error("password should contain atleast 6 characters",toastOption);
      return false;
    } 
    if(password !== cpwd) {
      toast.error("password not matching",toastOption);
      return false;
    }
    return true;
  }

  return (
    <div className='card border-0 container login-container hv-100'>
      <div className='login-block d-flex flex-column shadow'>
        <b className='fs-4 text-center p-3 bg-primary rounded-top text-white'>CREATE ACCOUNT</b>
        <form onSubmit={(event) => handleSubmit(event)} className='login-form' action='' method='post'>
          <div className='d-flex flex-column p-4 border border-3 border-primary'>
            <table>
              <tr>
                <td>
                  <label for='name' className='p-2 py-2'>Name</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='username' type='text' id='name' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <label for='uid' className='p-2 py-2'>User name</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='' type='text' id='uid'/>
                </td>
              </tr> */}
              <tr>
                <td>
                  <label for='phone' className='p-2 py-2'>Phone</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='phone' type='text' id='phone' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label for='mail' className='p-2 py-2'>Email</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='email' type='email' id='mail' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label for='dob' className='p-2 py-2'>Date of Birth</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='dob' type='date' id='dob' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label for='pwd' className='p-2 pb-3'>password</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='password' type='password' id='pwd' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label for='pwd' className='p-2 py-2'>Confirm</label>
                </td>
                <td>
                  <input className='login-input border-primary' name='cpwd' type='password' id='pwd' onChange={(e) => handleChange(e)}/>
                </td>
              </tr>
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
