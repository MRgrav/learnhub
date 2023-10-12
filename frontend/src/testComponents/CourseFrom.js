import React, { useState } from 'react';

function CourseForm() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: 0,
    purchased: 0,
    thumbnail: { public_id: '', url: '' },
    category: '',
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

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...courseData.questions];
    updatedQuestions[questionIndex][field] = value;
    setCourseData({ ...courseData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    const updatedQuestions = [...courseData.questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;
    setCourseData({ ...courseData, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...courseData.questions];
    updatedQuestions.splice(questionIndex, 1);
    setCourseData({ ...courseData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...courseData.questions];
    updatedQuestions.push({
      questionText: '',
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
      ],
    });
    setCourseData({ ...courseData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        console.log('Course created successfully');
        // Clear the form or perform any other actions upon successful creation
      } else {
        console.error('Failed to create course');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Title, Description, Price, Purchased, Thumbnail, and Category fields */}
        {/* ... (same as before) */}
        
        {/* Video Contents */}
        {/* ... (same as before) */}
        
        {/* Questions */}
        <div>
          <h3>Questions</h3>
          {courseData.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div>
                <label>Question Text:</label>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, 'questionText', e.target.value)
                  }
                />
              </div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>Option {optionIndex + 1}:</label>
                  <input
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
                  <label>
                    Is Correct:
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(
                          questionIndex,
                          optionIndex,
                          'isCorrect',
                          e.target.checked
                        )
                      }
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        
        {/* Benefits */}
        <div>
          <label>Benefits:</label>
          <textarea
            name="benefits"
            value={courseData.benefits}
            onChange={(e) => setCourseData({ ...courseData, benefits: e.target.value })}
          />
        </div>
        
        <div>
          <button type="submit">Create Course</button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
