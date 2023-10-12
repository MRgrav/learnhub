import React, { useContext } from 'react'
import courseContext from './courseContext';
import { ToastContainer, toast } from 'react-toastify';

export default function ThirdStep() {
    const {formData, setValues, setStep} = useContext(courseContext);
    // const handleForm = (e) => {
    //     const {name, value} = e.target;
    //     setValues({...formData,[name]: value});
    // }

    const handleQuestionChange = (questionIndex, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex][field] = value;
        setValues({ ...formData, questions: updatedQuestions });
      };
    
      const handleOptionChange = (questionIndex, optionIndex, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex][field] = value;
        setValues({ ...formData, questions: updatedQuestions });
      };
    
      const handleRemoveQuestion = (questionIndex) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions.splice(questionIndex, 1);
        setValues({ ...formData, questions: updatedQuestions });
      };
      const handleAddQuestion = () => {
        const updatedQuestions = [...formData.questions];

        const lastQuestion = formData.questions[formData.questions.length - 1];
        if (
            lastQuestion.questionText && 
            lastQuestion.options[0].optionText && 
            lastQuestion.options[1].optionText &&
            lastQuestion.options[2].optionText &&
            ( lastQuestion.options[0].isCorrect || lastQuestion.options[1].isCorrect || lastQuestion.options[2].isCorrect )
        ) {
            updatedQuestions.push({
                questionText: '',
                options: [
                  { optionText: '', isCorrect: false },
                  { optionText: '', isCorrect: false },
                  { optionText: '', isCorrect: false },
                ],
              });
            setValues({ ...formData, questions: updatedQuestions });
        } else {
            toast.error("Please fill out the current question's data before adding a new one.",{
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
      };


  return (
    <div>
        <div className='d-flex flex-column p-3'>
            <div>
                <h3>Quizes</h3>
                {formData.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <div className="accordion-item rounded-4 bg-primary bg-opacity-25 shadow">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button rounded-4" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${questionIndex}`} aria-expanded="false" aria-controls={`collapse${questionIndex}`}>
                            Question {questionIndex+1} : {question.questionText}
                        </button>
                        </h2>
                        <div id={`collapse${questionIndex}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne${questionIndex}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body bg-transparent rounded-bottom-4">
                                <div className='d-flex py-2'>
                                    <label className='pe-3 py-1 no-space'>Question Text:</label>
                                    <input
                                    className='login-input w-auto col'
                                    type="text"
                                    value={question.questionText}
                                    onChange={(e) =>
                                        handleQuestionChange(questionIndex, 'questionText', e.target.value)
                                    }
                                    />
                                </div>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className='d-flex py-2 px-5'>
                                        <label className='pe-3 py-1 no-space'>Option {optionIndex + 1}:</label>
                                        <input
                                            className='login-input w-auto col'
                                            type="text"
                                            value={option.optionText}
                                            onChange={(e) =>
                                            handleOptionChange(
                                                questionIndex,
                                                optionIndex,
                                                'optionText',
                                                e.target.value
                                            )
                                            }
                                        />
                                        <label className='w-auto ps-3'>
                                            Is Correct: 
                                            <input
                                            className='mx-2'
                                            type="radio"
                                            name={formData.questionText}
                                            checked={option.isCorrect}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                questionIndex,
                                                optionIndex,
                                                'isCorrect',
                                                e.target.checked
                                                )
                                            }
                                            required
                                            />
                                        </label>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-end px-4 py-2'>
                                    <button
                                        className='btn btn-sm btn-danger shadow'
                                        type="button"
                                        onClick={() => handleRemoveQuestion(questionIndex)}>
                                        Remove Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                <div className='p-3'>
                    <button className='btn btn-sm shadow btn-primary' type="button" onClick={handleAddQuestion}>
                        Add Question
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
