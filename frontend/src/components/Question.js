import React from 'react'

export default function Question({index, question, options, onAnswerSelect}) {
    // console.log(question)
    // const [newIndex, setIndex] = useState(index);
    // const answerArray = [];
    const handleAnswerChange = (optionId) => {
        // const selectedAnswer = e.target.value;
        // onAnswerSelect(index, selectedAnswer);
        // answerArray[--index] = optionId;
        // console.log(optionId, '  ', index)
        onAnswerSelect(index, optionId)
    };

  return (
    <div className='p-2 w-100 pb-5'>
        <div className='d-flex flex-column'>
            <p>{index}. {question}</p>
            <div className='ps-4 row m-0 justify-content-between'>
                {
                    options.map((option, key) => {
                        return (
                            <div className='col-4 p-1' key={key}>
                                <label className='border rounded-4 shadow p-3 w-100' htmlFor={option._id}>
                                    <input 
                                        className='me-2' 
                                        onChange={()=>handleAnswerChange(option._id)} 
                                        type='radio' 
                                        name={question} 
                                        value={option._id} 
                                        id={option._id}/>
                                    {option.optionText}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
