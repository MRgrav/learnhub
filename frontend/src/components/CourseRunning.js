import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParagraphComponent from './ParagraphComponent';
import axios from 'axios';
import { baseRoute } from '../utils/ApiRoutes';

export default function CourseRunning({courseData, enrollmentId}) {
    //console.log('running page: ',courseData.courseDescription)
    const arrnum = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten']
    const courseVideo = [];
    //const [currentCourse, setCurrentCourse] = useState(courseData)
    const [courseProgress, setCourseProgress] = useState(courseData.courseProgress)
    courseData.videoContents.map((videos, index)=>courseVideo[index] = videos.videoUrl)
    // console.log(courseData)

    const incrementProgress = async (currentIndex) => {
        if (currentIndex >= courseData.courseProgress) {
            try {
                const progressData = {
                id: courseData.enrollmentId,
                currentIndex: currentIndex + 1,
                };
        
                const response = await axios.post(`${baseRoute}/progress-course`, progressData);
        
                if (response.data.message === 'course progressing') {
                // Update courseProgress state only if the backend indicates successful progress
                    setCourseProgress((prev) => {
                        console.log(prev + 1); // Log the updated state
                        return prev + 1; // Return the new state value
                    });
                
                }
      
            } catch (error) {
                console.error(error);
            }
        }

    };

    const [quizButtonStatus, setQuizButtonStatus] = useState();
    const getQuizbuttonStatus = async () => {
        console.log(enrollmentId);

        try {
            const res = await axios.get(`${baseRoute}/get-quiz-button-status/` + enrollmentId);
            const resDate = new Date(res.data.AssessmentDate);

            const currentDate = new Date();

            // Compare only the date part (year, month, and day)
            if (resDate.toISOString().split('T')[0] > currentDate.toISOString().split('T')[0]) {
                console.log("AssessmentDate is not tomorrow");
                setQuizButtonStatus(false);
            } else {
                console.log("let's go");
                setQuizButtonStatus(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const [certificateId, setCertificate] = useState();
    useEffect(()=> {
        axios.get(`${baseRoute}/check-certificate/` + enrollmentId)
        .then(res => {
            // console.log(res)
            if (res.data.Status){
                setCertificate(res.data.certificateId);
            }
        // // Compare only the date part (year, month, and day)
        // if (resDate.toISOString().split('T')[0] > currentDate.toISOString().split('T')[0]) {
        //     console.log("AssessmentDate is tomorrow");
        //     navigate('/my-course/'+id);
        //     setQuizButtonMode('certificate')
        // } else {
        //     console.log("let's go");
        // }
        })
    },[enrollmentId])
  return (
    <div className='card w-100 p-3'>
        <div className='w-100 text-end px-5' style={{marginBottom: "-24px", zIndex: "10"}}>
            <span className='bg-danger px-2 text-white rounded-bottom-3 fw-bold shadow'>{courseData.courseLevel.toUpperCase()}</span>
        </div>
        <img src={courseData.thumbnail.url} className="card-img-top" alt=""/>
        <div className="card-body">
            <h5 className="card-title fw-1 fw-bold">{courseData.courseTitle}</h5>
            {/* <ParagraphComponent className="card-text" text={courseData.courseDescription}/> */}
            <ParagraphComponent text={courseData.courseDescription}/>
            <hr/>
            <div className='d-flex'>
                <div className="accordion accordion-flush w-100" id="accordionFlushExample">
                    {
                        courseData.videoContents?
                        courseData.videoContents.map((videos, index)=>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button 
                                    className="accordion-button collapsed" 
                                    type="button" data-bs-toggle="collapse" 
                                    data-bs-target={`#flush-collapse${arrnum[index]}`} 
                                    aria-expanded="false" aria-controls={`flush-collapse${arrnum[index]}`}
                                    disabled={index<=courseProgress?false:true}>
                                    {
                                        index<=courseProgress?<i className='bi bi-stop-fill pe-3'></i>:<i className='bi bi-app pe-3'></i>
                                    }
                                    {videos.title}
                                </button>
                                </h2>
                                <div id={`flush-collapse${arrnum[index]}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <video controls controlsList="nodownload" oncontextmenu="return false;" onPlay={() => incrementProgress(index)} className='w-100 rounded rounded-3 border border-light border-2 shadow'>
                                        <source src={videos.videoUrl} type='video/mp4'></source>
                                    </video>
                                    <ParagraphComponent text={videos.videoDescription} />
                                </div>
                                </div>
                            </div>
                        )
                        :null
                    }
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button 
                                className="accordion-button collapsed" 
                                type="button" data-bs-toggle="collapse" 
                                data-bs-target="#flush-collapseThreef" 
                                aria-expanded="false" aria-controls="flush-collapseThreef"
                                onClick={getQuizbuttonStatus}
                                disabled={courseData.videoContents.length===courseProgress?false:true}>
                                {
                                        courseData.videoContents.length<=courseProgress?<i className='bi bi-stop-fill pe-3'></i>:<i className='bi bi-app pe-3'></i>
                                }Quize
                            </button>
                        </h2>
                        <div id="flush-collapseThreef" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                            {
                                quizButtonStatus?
                                (
                                    certificateId?(
                                        <div className='p-2'>
                                            <p className='m-0 py-3 fw-bold text-primary text-center'>
                                                <i class="bi bi-stars me-2"></i>
                                                Congratulations on completing your course! 🎉 
                                                You've successfully mastered the <b className='fw-bolder fs-5'> " {courseData.courseTitle} ". </b>
                                                Your certificate is now available. 
                                                Click the button to download and showcase your achievement. 
                                                Keep up the great work! 🏆👏
                                                <i class="bi bi-stars ms-2"></i>
                                            </p>
                                            <div className='text-center p-2'>
                                                <Link to={`/certificate/user/shared/${certificateId}`} className='btn btn-primary shadow px-5'>Get certificate</Link>
                                            </div>
                                        </div>
                                    ):(
                                        <div className='p-2'>
                                            <p className='m-0 py-3 fw-bold text-primary text-center'>
                                            <i class="bi bi-stars me-2"></i>
                                                Amazing progress! You're so close to earning your certificate. Best of luck! 
                                            <i class="bi bi-stars ms-2"></i>
                                            </p>
                                            <div className='text-center p-2'>
                                                <Link to={`/quiz/${courseData.enrollmentId}`} className='btn btn-primary shadow px-5'>Go to Quiz</Link>
                                            </div>
                                            <div className='pt-5'>
                                                <div className='p-1 text-center w-100 bg-danger bg-opacity-10'>
                                                    <small className='fst-italic'>If you fail the quiz, you can retry tomorrow.</small>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ):(
                                    <div className='p-2 border rounded bg-warning bg-opacity-25'>
                                        <p className='fw-bold py-2 m-0 text-center'>Come Tomorrow</p>
                                        <p className='py-2 text-justify'>
                                            It appears that you didn't achieve the passing score on the quiz. Take some time to review the course videos and materials related to the topics covered in the quiz.
                                        </p>
                                        <span className='py-2'>Remember, learning is a journey, and we are here to support you every step of the way.</span>
                                    </div>
                                )
                            }
                                {/* <code>print('hello world');</code> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <b>Topics covered</b>
            <ul>
                {
                    courseData.syllabus.map((sItem)=><li>{sItem.chapter}</li>)
                }
                {/* <li>Introduction</li>
                <li>Installation and Setup</li>
                <li>First Cluster</li>
                <li>CRUD operations</li>
                <li>Final Test</li> */}
            </ul>
            <hr/>
            <b>Course by </b>
        </div>
    </div>
  )
}
