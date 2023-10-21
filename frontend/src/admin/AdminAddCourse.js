import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import FirstStep from './courseSteps/FirstStep';
import SecondStep from './courseSteps/SecondStep';
import ThirdStep from './courseSteps/ThirdStep';
import courseContext from './courseSteps/courseContext';
import CourseForm from '../testComponents/CourseFrom';
import FourthStep from './courseSteps/FourthStep';
import FifthStep from './courseSteps/FifthStep';
import Loading from '../components/Loading';
//import thumbnail from '../../public/media/gallery2.png'

export default function AdminAddCourse() {
    // eslint-disable-next-line
    const [loading, setLoading] = useState({
        status: false,
        progress: '',
      });
    const [thumbImage, setThumbImage] = useState({});
    const [formData, setValues] = useState({
        courseTitle: '',
        courseDescription: '',
        price: '',
        estimated: '',
        category: '',
        courseLevel: '',
        syllabus: [
            {
                chapter: '',
            },
        ],
        thumbnail: '',
        videoContents: [],
        benefits: '',
        questions: [
            {
                questionText: '',
                options: [
                { optionText: '', isCorrect: false },
                { optionText: '', isCorrect: false },
                { optionText: '', isCorrect: false },
                ],
            },
        ],
      });
    const [currentStep, setStep] = useState(1);
    function showStep(step) {
        //console.log(step);
        switch(step){
            case 1:
                return <FirstStep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            case 4:
                return <FourthStep />
            case 5:
                return <FifthStep />
            default:
                return <FirstStep />
        }
    }
    return (
        <>
        {
          loading.status?
            <Loading text={'uploading course content'} progress={loading.progress}/>
          :
            <div className='bg-theme p-3' style={{"min-height":"100vh"}}>
                <div className='container-fluid'>
                    <div className='d-flex' style={{"min-height":"95vh"}}>
                        <AdminSidebar />
                        <div className='col-xl-10 col-lg-9 col-md-8 p-2'>
                            <div className='card border rounded h-100 p-3'>
                                <span className='p-4 pb-0 pt-3 fw-bold fs-3'>Add Course</span>
                                <div className='p-3 d-none '>
                                    <CourseForm />
                                </div>
                                <courseContext.Provider value={{formData, setValues, currentStep, setStep, thumbImage, setThumbImage, loading, setLoading}} className='d-flex w-100 p-3 flex-column'>
                                    <form className='w-100 p-2 d-flex flex-column justify-content-center'>
                                        {showStep(currentStep)}
                                    </form>
                                </courseContext.Provider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
