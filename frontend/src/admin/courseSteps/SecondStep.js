import React, { useContext } from 'react';
import courseContext from './courseContext';
import { ToastContainer, toast } from 'react-toastify';

export default function SecondStep() {
  const { formData, setValues, setStep } = useContext(courseContext);

  const handleChapterTitleChange = (index, field, value) => {
    const updatedSyllabus = [...formData.syllabus];
    updatedSyllabus[index][field] = value;
    setValues({ ...formData, syllabus: updatedSyllabus });
    // setValues({
    //   ...formData,
    //   videoContents: [{ [field]: value }],
    // });
  };

  const handleAddSyllabusContent = () => {
    const lastSyllabusContent = formData.syllabus[formData.syllabus.length - 1];
    if (
      !lastSyllabusContent || lastSyllabusContent.chapter
    ) {
      setValues({
        ...formData,
        syllabus: [
          ...formData.syllabus,
          { chapter: '', },
        ],
      });
    } else {
        toast.error("Please fill out the current video content entry before adding a new one.",{
            position: toast.POSITION.TOP_RIGHT
        });
      //alert('Please fill out the current video content entry before adding a new one.');
    }
  }

  const handleRemoveChapter = (index) => {
        const updatedSyllabus = [...formData.syllabus];
        updatedSyllabus.splice(index, 1);
        setValues({ ...formData, syllabus: updatedSyllabus });
  }

  return (
    <div>
      <div className='d-flex flex-column p-3'>
        <div>
          <h3>Syllabus</h3>
            {formData.syllabus.map((syllabus, index) => (
                <div key={index} id="accordionExample">
                    <div className="d-flex py-2">
                        <label className='pe-3 py-1 no-space'>Chapter {index+1}</label>
                        <input
                        className='login-input w-auto col'
                        type="text"
                        value={syllabus.chapter}
                        onChange={(e) =>
                            handleChapterTitleChange(index, 'chapter', e.target.value)
                        }
                        />
                        <button className='ms-3 btn btn-sm btn-danger' type="button" onClick={() => handleRemoveChapter(index)}>
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className='p-3'>
            <button 
                className='btn btn-sm shadow btn-primary' 
                type="button" onClick={handleAddSyllabusContent}
            >
                <i className='bi bi-plus'></i> Add Chapter
            </button>
        </div>
      </div>
      <div className='d-flex justify-content-end p-3'>
        <button type="button" onClick={(e) => setStep(1)} className='btn btn-secondary shadow px-4'>Back</button>
        <button type="button" onClick={(e) => setStep(3)} className='btn btn-primary shadow ms-1 px-4'>Next</button>
      </div>
      <ToastContainer />
    </div>
  );
}
