import React, { useContext, useState } from 'react'
import courseContext from './courseContext';
import { ToastContainer,toast } from 'react-toastify';
import { baseRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import DialogPop from '../../components/DialogPop';
//import cloudinary from 'cloudinary';

export default function ThirdStep() {
    const {formData, setValues, setStep, videoPath, setVideoPath} = useContext(courseContext);
    const arrnum = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','FifthTteen','Seventeen','Eighteen','Nineteen','Twenty','Twentyone','Twentytwo','Twentythree']
    const [videoProcess, setProcessing] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [videoUrl, setVideoUrl] = useState();
    const [buttonDisable, setButtonDisable] = useState(true);
    const handleVideoContentChange = (index, field, value) => {
        const updatedVideoContents = [...formData.videoContents];
        updatedVideoContents[index][field] = value;
        setValues({ ...formData, videoContents: updatedVideoContents });
        console.log(formData)
    };

    const handleVideo = async (index, event) => {
        const input = event.currentTarget;
        setButtonDisable(false)
        setSelectedFile(input.files[0]);

        //handleVideoContentChange(index, 'videoUrl', input.files[0]);
      
        if (videoPath.length > index) {
          const updatedVideoPath = [...videoPath];
          updatedVideoPath[index] = { index, url: null };
          setVideoPath(updatedVideoPath);
        } else {
          const updatedVideoPath = [...videoPath];
          updatedVideoPath.push({ index, url: null });
          setVideoPath(updatedVideoPath);
        }
      
        setProcessing(true);
      
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          const blob = new Blob([arrayBuffer], { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
      
          const updatedVideoPath = [...videoPath];
          updatedVideoPath[index] = { index, url };
          setVideoPath(updatedVideoPath);      
          //handleVideoContentChange(index, 'videoUrl', url);
      
          setProcessing(false);
        };
      
        if (input.files && input.files[0]) {
          reader.readAsArrayBuffer(input.files[0]);
        }
      };
      

    const handleRemoveVideoContent = (index) => {
        const updatedVideoContents = [...formData.videoContents];
        updatedVideoContents.splice(index, 1);
        setValues({ ...formData, videoContents: updatedVideoContents });

        //setVideoPath([...videoPath, {index, url: null}])
        videoPath.splice(index, 1)
      };
    
    const handleAddVideoContent = () => {
        // Check if the last video content entry is complete before adding a new one
        const lastVideoContent = formData.videoContents[formData.videoContents.length - 1];
        if (
          !lastVideoContent || // Check if there's no last entry
          (lastVideoContent.title && lastVideoContent.videoUrl && lastVideoContent.videoDescription)
        ) {
          setValues({
            ...formData,
            videoContents: [
              ...formData.videoContents,
              { title: '', videoUrl: '', videoDescription: '' },
            ],
          });
        } else {
            toast.error("Please fill out the current video content entry before adding a new one.",{
                position: toast.POSITION.TOP_RIGHT
            });
          //alert('Please fill out the current video content entry before adding a new one.');
        }
      };

      //cloudinary.setCloudName("daidqbafw");

      const [uploadProgress, setUploadProgress] = useState(false);
      const [togglePop, setTogglePop] = useState(false);

      const handleUploadToCloud = async(index) => {
        setUploadProgress(true);
        setTogglePop(true)
        const videoForm = new FormData();
        videoForm.append('video', selectedFile)
        await axios.post(`${baseRoute}/upload-video`, videoForm, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            }
        }).then(res => {
            console.log(res)
            setVideoUrl(res.data)
            console.log(index, '  ', videoUrl)
            //handleVideoContentChange(index, 'videoUrl', res.data)
            handleVideoContentChange(index, 'videoUrl', res.data)
            setUploadProgress(false)
            setButtonDisable(true)
        })
        .catch(err => {
            console.log(err)
            setUploadProgress(false)
        }) 
      };
      
  return (
    <div>
        <div className='d-flex flex-column p-3'>
            {uploadProgress?<DialogPop type='ask' onClose={togglePop}/>:null}
            <div>
                <h3>Video Contents</h3>
                {formData.videoContents.map((video, index) => (
                    <div key={index} id="accordionExample">
                        <div className="accordion-item rounded-4 bg-primary bg-opacity-25 shadow">
                        <h2 className="accordion-header" id={`heading${arrnum[index]}`}>
                        <button 
                            className="accordion-button rounded-4 collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#collapse${arrnum[index]}`} 
                            aria-expanded="false" 
                            aria-controls={`collapse${arrnum[index]}`} 
                            data-bs-parent="#accordionExample"
                        >
                            Video {index+1} : {video.title}
                        </button>
                        </h2>
                        <div id={`collapse${arrnum[index]}`} className="accordion-collapse collapse" aria-labelledby={`heading${arrnum[index]}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body bg-transparent rounded-bottom-4">
                                <div className='d-flex flex-row'>
                                    <table className='col'>
                                        <tr className='py-2 w-100'>
                                            <td className='py-2' style={{minWidth: "100px"}}>
                                                <label className='pe-3 py-1 no-space'>Chapter Title</label>
                                            </td>
                                            <td className='w-100'>
                                                <input
                                                className='login-input w-100'
                                                type="text"
                                                value={video.title}
                                                onChange={(e) =>
                                                    handleVideoContentChange(index, 'title', e.target.value)
                                                }
                                                />
                                            </td> 
                                        </tr>
                                        <tr className='py-2'>
                                            <td><label className='pe-3 py-1 no-space'>Video URL</label></td>
                                            <td className=''>
                                                <input
                                                className='w-100 login-input p-0'
                                                type="file"
                                                accept="video/mp4"
                                                onChange={(e) => {
                                                    handleVideo(index, e)
                                                }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className='py-2'>
                                            <td><label className='pe-3 py-1 no-space'>Content Description</label></td>
                                            <td className='py-2'>
                                                <textarea
                                                className='login-input w-100'
                                                value={video.videoDescription}
                                                onChange={(e) =>
                                                    handleVideoContentChange(index, 'videoDescription', e.target.value)
                                                }
                                                />
                                            </td>
                                            
                                        </tr>
                                    </table>
                                    {
                                        (videoPath.length>index || video.videoUrl)?(
                                        <div className='d-flex flex-column p-2 pt-4'>
                                            <div className='col-12' style={{maxWidth: "300px"}}>
                                            {
                                                videoProcess?<p>Video Processing</p>
                                                :<video 
                                                    controls 
                                                    className='w-100 rounded rounded-3 border border-light border-2 shadow' 
                                                    src={video.videoUrl || videoPath[index].url} 
                                                    type='video/*'>
                                                </video>
                                            }
                                            </div>
                                            <div>
                                                <button disabled={buttonDisable} type='button' onClick={() =>{
                                                    handleUploadToCloud(index)

                                                }} className='btn btn-primary'>Upload</button>
                                            </div>
                                        </div>
                                        )
                                        :null
                                    }
                                </div>
                                
                            </div>
                            <div className='d-flex justify-content-end px-4 py-2'>
                                <button className='btn btn-sm btn-danger' type="button" onClick={() => handleRemoveVideoContent(index)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                <div className='p-3'>
                    <button className='btn btn-sm shadow btn-primary' type="button" onClick={handleAddVideoContent}>
                        <i className='bi bi-plus'></i> Add Video Content
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div>
        <div className='d-flex justify-content-end p-3'>
            <button type="button" onClick={(e)=>setStep(2)} className='btn btn-secondary shadow px-4'>Back</button>
            <button type="button" onClick={(e)=>setStep(4)} className='btn btn-primary shadow ms-1 px-4'>Next</button>
        </div>
    </div>
  )
}
