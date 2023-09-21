import React from 'react';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/ApiRoutes';

export default function Login() {
  const [formData, setLogin] = useState({
    id: "",
    password: ""
  }); 

  const handleChange = (event) => {
    const {name, value} = event.target;
    setLogin({...formData,[name]: value});
  }

  const toastOption = {
    position:"top-right",
    autoClose:8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.id.length < 3) {
      toast.error("length is short", toastOption);
    } else if (formData.password < 5) {
      toast.error("password should contain atleast 6 characters", toastOption);
    } else {
      await axios.post(loginRoute, formData)
      .then( res => {
        console.log(res);
        switch(res.data){
          case "no data":
            toast.error("No account found", {
              position: toast.POSITION.TOP_RIGHT
            });
            break;
          case "wrong pwd":
            toast.error("Wrong password", {
              position: toast.POSITION.TOP_RIGHT
            });
            break;
          default:
            toast.success("Login successfull", {
              position: toast.POSITION.TOP_RIGHT
            });
        }
      });
    }
  }

  return (
    <div className='card border-0 container login-container hv-100'>
      <div className='login-block d-flex flex-column shadow'>
        <b className='fs-4 text-center p-3 bg-primary rounded-top text-white'>LOGIN</b>
        <form onSubmit={(event) => handleSubmit(event)} className='login-form' action='' method='post'>
          <div className='d-flex flex-column p-4 border border-3 border-primary'>
            <table>
              <tbody>
              <tr>
                <td>
                  <label htmlFor='uid' className='p-2 py-4'>Email</label>
                </td>
                <td>
                  <input 
                  className='login-input border-primary' 
                  name='id' 
                  type='email' 
                  id='uid'
                  onChange={ (e) => handleChange(e) } />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='pwd' className='p-2 pb-4'>Password</label>
                </td>
                <td>
                  <input 
                  className='login-input border-primary' 
                  name='password' 
                  type='password' 
                  id='pwd'
                  onChange={(e) => handleChange(e)} />
                </td>
              </tr>
              </tbody>
            </table>
            <div className='d-flex justify-content-between p-3'>
              <button type='reset' className='btn btn-secondary shadow'>cancel</button>
              <button type='submit' className='btn btn-success px-4 shadow'>sign in</button>
            </div>
            <hr/>
            <p className='text-center'>create new account <a href='/create-account'>Sign up</a></p>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}
