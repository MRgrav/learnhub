import React, { useContext } from 'react'
import courseContext from './courseContext';
import axios from 'axios';
import { courseAddRoute, courseUpdateRoute } from '../../utils/ApiRoutes';
import { ToastContainer, toast } from 'react-toastify';
import CourseDetailsBody from '../../components/CourseDetailsBody';
import { useNavigate } from 'react-router-dom';
export default function FifthStep() {
    const {formData, setStep, editMode, oldThumbnail, setLoading, loading} = useContext(courseContext);
   //const [uploadProgress, setUploadProgress] = useState()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        //setLoading({...loading, 'status': true});
        e.preventDefault();
        console.log('url: ',formData.videoContents.videoUrl);

        // await formData.videoContents.map((video) => {
        //   axios.post('http://localhost:5003/api/upload-video', video)
        //   .then(resp => console.log(resp))
        //   return ;
        // })
        // console.log(formData)
        // await axios.post(courseAddRoute, formData)
        // .then(

        // )
        const result = await axios.post(courseAddRoute, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            setTimeout(()=> {
              setLoading({...loading, 'progress': progress})
            }, 400)
          }
        });
        //console.log(result);
        if(result.data.Status === "course created") {
          setLoading({...loading, 'status': false});
          setTimeout(()=>{
            toast.success("New Course Added Successfully.",{
                position: toast.POSITION.TOP_RIGHT
            });
          },100);
          setTimeout(()=>{
            navigate('/courses')
          },500)
  
        }else{
            toast.error("Something is wrong",{
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleUpdate = async (e) => {
        setLoading({...loading, 'status': true});
        e.preventDefault();
        const newForm = {...formData};
        newForm.oldThumbnail = oldThumbnail;
        console.log(newForm);
        const result = await axios.post(courseUpdateRoute, newForm, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
            setTimeout(()=> {
              setLoading({...loading, 'progress': progress})
            }, 400)
            console.log(progress)
          }
        });
        //console.log('a')
        console.log(result);
        setLoading({...loading, 'status': false});
        if(result.data.Status === "done") {
          toast.success("Course Updated Successfully.",{
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(()=>{
            navigate('/courses')
          },1300)
  
        }else{
            toast.error("Something is wrong",{
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

  return (
    <div>  
          <CourseDetailsBody courseData={formData} demo={true}/>
            
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
