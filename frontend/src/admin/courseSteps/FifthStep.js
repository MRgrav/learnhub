import React, { useContext } from 'react'
import courseContext from './courseContext';
import axios from 'axios';
import { courseAddRoute, courseUpdateRoute } from '../../utils/ApiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import CourseDetailsBody from '../../components/CourseDetailsBody';
export default function FifthStep() {
    const {formData, setStep, editMode, oldThumbnail, setLoading} = useContext(courseContext);
    // const handleForm = (e) => {
    //     const {name, value} = e.target;
    //     setValues({...formData,[name]: value});
    // }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        //console.log(formData);
        const result = await axios.post(courseAddRoute, formData);
        //console.log(result);
        if(result.data.Status === "course created") {
          setLoading(false);
          setTimeout(()=>{
            toast.success("New Course Added Successfully.",{
                position: toast.POSITION.TOP_RIGHT
            });
          },100);
  
        }else{
            toast.error("Something is wrong",{
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleUpdate = async (e) => {
        setLoading(true);
        e.preventDefault();
        const newForm = {...formData};
        newForm.oldThumbnail = oldThumbnail;
        //console.log(newForm);
        const result = await axios.post(courseUpdateRoute, newForm);
        //console.log('a')
        console.log(result);
        setLoading(false);
        if(result.data.Status === "done") {
          toast.success("Course Updated Successfully.",{
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
            <CourseDetailsBody courseData={formData}/>
            
            <div className='d-flex justify-content-end p-3'>
                <button type="button" onClick={(e)=>setStep(4)} className='btn btn-secondary shadow px-4'>Back</button>
                {
                    editMode?<button type="button" onClick={handleUpdate}  className='btn btn-primary ms-1 px-3' >Update</button>
                    :<button type="button" onClick={handleSubmit}  className='btn btn-primary ms-1 px-3' >Submit</button>
                }
            </div>
        <ToastContainer/>
    </div>
  )
}
