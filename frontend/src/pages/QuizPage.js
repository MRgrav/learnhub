import React, { useEffect, useState } from 'react'
import Question from '../components/Question'
import { baseRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';

export default function QuizPage() {
  const {id} = useParams();
  const [data, setValues] = useState();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // const updatedAnswers = [];

  const handleAnswerSelect = (i, optionId) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[i-1] = optionId;
    // console.log(answersArray.answersArray, ' ./ ', answersArray.i)
    setSelectedAnswers(updatedAnswers); 
    console.log(i-1, '  ', optionId)              //    I   WORKING ON IT
  };



  const handleSubmit = async () => {
    // Your axios submission logic here...
    // console.log('Selected Answers:', selectedAnswers);

    const answerData = {
      enrollmentId: id,
      selectedAnswers: selectedAnswers
    }

    await axios.post(`${baseRoute}/assessment`, answerData)
    .then(res => {
      console.log(res.data.Status)
      if (res.data.Status === 'failed'){
        toast.error("YOU HAVE FAILED, TRY AGAIN!", {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.success("WOW, YOU HAVE PASSED!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      setTimeout(() => {
        navigate('/my-course/'+id);
      }, 1700);
    })
  };

  useEffect(()=>{
    // console.log('first')
    axios.get(`${baseRoute}/get-quiz-button-status/` + id)
    .then(res => {
      const resDate = new Date(res.data.AssessmentDate);
      const currentDate = new Date();

      // Compare only the date part (year, month, and day)
      if (resDate.toISOString().split('T')[0] > currentDate.toISOString().split('T')[0]) {
          console.log("AssessmentDate is tomorrow");
          // eslint-disable-next-line
          navigate('/my-course/'+id);
      } else {
          console.log("let's go");
      }
    },[id, navigate])

    axios.get(`${baseRoute}/get-quiz-questions/`+id)
    .then(res => {
      // console.log('data: ',res.data)
      setValues(res.data)
      setSelectedAnswers(new Array(res.data.questions.length).fill(''));
    })
    // console.log('second')
  },[id, navigate])
  if (!data) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }else{
    return (
      <div className='card container mt-5 py-5 border-0'>
          <div className='p-3 rounded-3 border shadow'>
              <p className='text-center fw-bold fs-4 w-100'>Quiz</p>
              <div className='d-flex row my-0 w-100 mx-auto' style={{maxWidth: "700px"}}>
                <div className='col-xxl-9 col-lg-8 col-md-8 col-sm-12'>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          Course Name
                        </td>
                        <td className='px-2'>:</td>
                        <td>
                          <span className='fw-bold fs-5'>{data.courseTitle}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Category
                        </td>
                        <td className='px-2'>:</td>
                        <td>
                          <span className='fw-bold fs-5'>{data.category}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Level 
                        </td>
                        <td className='px-2'>:</td>
                        <td>
                          <span className='fw-bold fs-5'>{data.courseLevel}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Total Questions 
                        </td>
                        <td className='px-2'>:</td>
                        <td>
                          <span className='fw-bold fs-5'>{data.questions.length}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='col-xxl-3 col-lg-4 col-md-4 col-sm-12 pt-3 py-md-auto py-lg-auto py-xxl-auto'>
                  <img 
                  className='w-100 rounded-3 shadow'
                  src={data.thumbnail.url} alt='' />
                </div>
              </div>
              <hr/>
              <div className='d-flex flex-column mx-auto' style={{'max-width':'700px'}}>
                {
                  data.questions.map((question, index)=>
                    <Question 
                      key={index}
                      index={index+1} 
                      question={question.questionText} 
                      options={question.options}
                      onAnswerSelect={(index, optionId) => handleAnswerSelect(index, optionId)}/>)
                }
              </div>
              <hr/>
              <div className='d-flex justify-content-end'>
                  <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
              </div>
          </div>
        <ToastContainer/>
      </div>
    )
  }
}
