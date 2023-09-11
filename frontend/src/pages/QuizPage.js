import React from 'react'
import Question from '../components/Question'

export default function QuizPage() {
  return (
    <div className='card container mt-5 py-5 border-0'>
        <div className='p-3 rounded-3 border shadow'>
            <p className='text-center fw-bold fs-4 w-100'>Quiz</p>
            <hr/>
            <div className='d-flex flex-column mx-auto' style={{'max-width':'700px'}}>
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
            </div>
            <hr/>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-success'>Submit</button>
            </div>
        </div>
    </div>
  )
}
