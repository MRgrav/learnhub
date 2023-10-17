import React, { useContext } from 'react'
import courseContext from './courseContext';

export default function FirstStep() {
    const {formData, setValues, setStep, thumbImage, setThumbImage} = useContext(courseContext);
    //const [courseImage, setImage] = useState('');

    const handleImage = (event) => {
      const input = event.currentTarget;

      var reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        //setImage({ src: dataURL });
        setThumbImage({src:dataURL});
        setValues({...formData,'thumbnail':dataURL});
      };
      reader.readAsDataURL(input.files[0]);
    }
    const handleForm = (e) => {
        const {name, value} = e.target;
        setValues({...formData,[name]: value});
    }
   //const preImg = formData.thumbnail.url + formData.thumbnail.public_id;
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
                            {/* <textarea className='w-100 p-3 login-input' name='courseDesc' 
                            rows={4} placeholder='course description..'></textarea> */}
                            <textarea
                                rows={5}
                                className='login-input w-auto col'
                                name='courseDescription'
                                value={formData.courseDescription}
                                onChange={(e)=>handleForm(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-3'>
                <div className='d-flex flex-column bg-success bg-opacity-25 shadow p-3 rounded-4'>
                    <span className='pb-2'>thumbnail</span>
                    <input 
                    type='file' 
                    name='thumbnail' 
                    className='d-none' 
                    id='thumbnail' 
                    accept="image/*"
                    onChange={(e) => {handleImage(e); console.log('file',formData)}}/>
                    <label htmlFor='thumbnail'>
                        <img className='border-dark-theme thumbnail border-2 rounded-3' alt='' width={360} src={formData.thumbnail.url || thumbImage.src} />
                    </label>
                </div>
            </div>
        </div>
        <div className='d-flex w-100'>
            <div className='p-3 col'>
                <div className='d-flex bg-warning bg-opacity-25 p-3 shadow rounded-4'>
                    <label className='pe-3 py-1 no-space'>Category</label>
                    <select className='login-input w-auto col bg-light bg-opacity-25' name='category'  
                    onChange={(e)=>handleForm(e)}>
                        {/* setValues({...formData, [e.target.name]: e.target.value}) */}
                        <option className='bg-secondary' value={null} selected={true} disabled>--</option>
                        <option className='bg-secondary' value="business">Business</option>
                        <option className='bg-secondary' value="computer science">Computer Science</option>
                        <option className='bg-secondary' value="creative arts">Creative Arts</option>
                        <option className='bg-secondary' value="health and fitness">Health and Fitness</option>
                        <option className='bg-secondary' value="languages">Languages</option>
                        <option className='bg-secondary' value="soft skills">Soft Skills</option>
                    </select>
                </div>
            </div>
            <div className='p-3 col'>
                <div className='d-flex bg-warning bg-opacity-25 p-3 shadow rounded-4'>
                    <label className='pe-3 py-1 no-space'>Course Level</label>
                    <select className='login-input w-auto col bg-light bg-opacity-25' name='courseLevel'  
                    onChange={(e)=>handleForm(e)}>
                        {/* setValues({...formData, [e.target.name]: e.target.value}) */}
                        <option className='bg-secondary' value={null} selected={true} disabled>--</option>
                        <option className='bg-secondary' value="beginner">Beginner</option>
                        <option className='bg-secondary' value="intermediate">Intermediate</option>
                        <option className='bg-secondary' value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='d-flex w-100'>
            <div className='p-3 col'>
                <div className='d-flex bg-secondary bg-opacity-25 shadow p-3 rounded-4'>
                    <label className='pe-3 py-1 no-space'>MRP</label>
                    <input 
                    className='login-input w-auto col'
                    name='estimated'
                    type='number' 
                    value={formData.estimated}
                    onChange={(e)=>setValues({...formData, [e.target.name]:e.target.value})}
                    />
                </div>
            </div>
            <div className='p-3 col'>
                <div className='d-flex bg-secondary bg-opacity-25 shadow p-3 rounded-4'>
                    <label className='pe-3 py-1 no-space'>Price</label>
                    <input 
                    className='login-input w-auto col'
                    name='price'
                    type='number' 
                    value={formData.price}
                    onChange={(e)=>setValues({...formData, [e.target.name]:e.target.value})}
                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
                </div>
            </div>
        </div>
        <div className='d-flex flex-column w-100 p-3'>
            <div className='d-flex bg-primary bg-opacity-25 p-3 rounded-4 shadow'>
                <label className='pe-3 py-1 no-space'>Benefits</label>
                <input 
                className='login-input w-auto col'
                name='benefits'
                type='text'
                value={formData.benefits}
                onChange={(e)=>handleForm(e)}/>
            </div>
        </div>
        <div className='d-flex justify-content-end p-3'>
            <button type="button" onClick={(e)=>setStep(2)} className='btn btn-primary shadow px-4'>Next</button>
        </div>
    </div>
  )
}
