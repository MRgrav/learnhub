import React, { useContext } from 'react'
import courseContext from './courseContext';
import { ToastContainer,toast } from 'react-toastify';

export default function ThirdStep() {
    const {formData, setValues, setStep} = useContext(courseContext);
    // const handleForm = (e) => {
    //     const {name, value} = e.target;
    //     setValues({...formData,[name]: value});
    // }
    const arrnum = ['One','Two','Three','Four','Five']
    const handleVideoContentChange = (index, field, value) => {
        const updatedVideoContents = [...formData.videoContents];
        updatedVideoContents[index][field] = value;
        setValues({ ...formData, videoContents: updatedVideoContents });
    };

    const handleRemoveVideoContent = (index) => {
        const updatedVideoContents = [...formData.videoContents];
        updatedVideoContents.splice(index, 1);
        setValues({ ...formData, videoContents: updatedVideoContents });
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
      
  return (
    <div>
        <div className='d-flex flex-column p-3'>
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
                                <div className='d-flex py-2'>
                                    <label className='pe-3 py-1 no-space'>Chapter Title</label>
                                    <input
                                    className='login-input w-auto col'
                                    type="text"
                                    value={video.title}
                                    onChange={(e) =>
                                        handleVideoContentChange(index, 'title', e.target.value)
                                    }
                                    />
                                </div>
                                <div className='d-flex py-2'>
                                    <label className='pe-3 py-1 no-space'>Video URL</label>
                                    <input
                                    className='login-input w-auto col'
                                    type="text"
                                    value={video.videoUrl}
                                    onChange={(e) =>
                                        handleVideoContentChange(index, 'videoUrl', e.target.value)
                                    }
                                    />
                                </div>
                                <div className='d-flex py-2'>
                                    <label className='pe-3 py-1 no-space'>Content Description</label>
                                    <textarea
                                    className='login-input w-auto col'
                                    value={video.videoDescription}
                                    onChange={(e) =>
                                        handleVideoContentChange(index, 'videoDescription', e.target.value)
                                    }
                                    />
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
            
        </div>
        <div className='d-flex justify-content-end p-3'>
            <button type="button" onClick={(e)=>setStep(2)} className='btn btn-secondary shadow px-4'>Back</button>
            <button type="button" onClick={(e)=>setStep(4)} className='btn btn-primary shadow ms-1 px-4'>Next</button>
        </div>
        <ToastContainer/>
    </div>
  )
}
