import React, { useContext } from 'react'
import courseContext from './courseContext';
import axios from 'axios';
import { courseAddRoute } from '../../utils/ApiRoutes';
import { ToastContainer, toast } from 'react-toastify';

export default function FourthStep() {
    const {formData, setValues, setStep} = useContext(courseContext);
    const handleForm = (e) => {
        const {name, value} = e.target;
        setValues({...formData,[name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const result = await axios.post(courseAddRoute, formData);
        console.log(result);
        if(result.data.Status === "course created") {
          toast.success("New Course Added Successfully.",{
            position: toast.POSITION.TOP_RIGHT
          });
  
        }else{
            toast.error("Something is wrong",{
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
  return (
    <div>
        <div className='d-flex'>
            <div className='p-3 col'>
                <div className='d-flex flex-column'>
                    <div className='col pb-4'>
                        <div className='d-flex bg-primary bg-opacity-25 p-3 rounded-4 shadow'>
                            <label className='pe-3 py-1 no-space'>Course Title</label>
                            <input 
                            className='login-input w-auto col'
                            name='courseTitle'
                            type='text'
                            value={formData.courseTitle || ""}
                            onChange={(e)=>handleForm(e)}/>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='d-flex flex-column bg-danger bg-opacity-25 p-3 rounded-4 shadow'>
                            <span className='pb-1'>Description</span>
                            <textarea className='w-100 p-3 login-input' name='courseDesc' 
                            rows={4} placeholder='course description..'></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-3'>
                <div className='d-flex flex-column bg-success bg-opacity-25 shadow p-3 rounded-4'>
                    <span className='pb-2'>thumbnail</span>
                    
                </div>
            </div>
        </div>
        <div className='d-flex w-100'>
            <div className='p-3 col'>
                <div className='d-flex bg-warning bg-opacity-25 p-3 shadow rounded-4'>
                    <label className='pe-3 py-1 no-space'>Category</label>
                    <select className='login-input w-auto col bg-light bg-opacity-25' name='category' 
                    onChange={(e)=>setValues({...formData, [e.target.name]: e.target.value})}>
                        <option selected disabled>--</option>
                        <option value="coding">Coding</option>
                        <option value="finance">Finance</option>
                    </select>
                </div>
            </div>
            <div className='p-3 col'>
                <div className='d-flex bg-secondary bg-opacity-25 shadow p-3 rounded-4'>
                    <label className='pe-3 py-1 no-space'>Price</label>
                    <input 
                    className='login-input w-auto col'
                    name='price'
                    type='text' 
                    value={formData.price}
                    onChange={(e)=>setValues({...formData, [e.target.name]:e.target.value})}/>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-end p-3'>
            <button type="button" onClick={(e)=>setStep(3)} className='btn btn-secondary shadow px-4'>Back</button>
            <button type="button" onClick={handleSubmit}  className='btn btn-primary ms-1 px-3' >Submit</button>
        </div>
        <ToastContainer/>
    </div>
  )
}
