import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const AddQuestionPage = ({ formDetails }) => {
  const [types, setTypes] = useState([]);
  const [questions, setQuestions] = useState([{ type: null, subType: null, questionText: '', correctAnswers: [], options: [''], subTypes: [] }]);

  const fetchTypes = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_BASE_URL}/getFormInputs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const options = response.data.data.map(type => ({ value: type._id, label: type.typeName }));
      setTypes(options);
    } catch (error) {
      console.error('Failed to fetch types:', error);
    }
  };

  const fetchSubTypes = async (inputId, qIndex) => {
    try {
      const response = await axios.get(`${process.env.VITE_BASE_URL}/getFormSubInputs`, {
        params: { inputId },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      const options = response.data.data.map(subType => ({ value: subType._id, label: subType.subtypeName }));
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].subTypes = options;
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Failed to fetch subtypes:', error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleTypeChange = (index, selectedType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = selectedType;
    updatedQuestions[index].subType = null; 
    updatedQuestions[index].correctAnswers = []; 
    updatedQuestions[index].options = ['']; 
    setQuestions(updatedQuestions);
    fetchSubTypes(selectedType.value, index);
  };

  const handleSubTypeChange = (index, selectedSubType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].subType = selectedSubType;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerSelection = (qIndex, answer) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].subType.label === 'mcq') {
      updatedQuestions[qIndex].correctAnswers = [answer];
    } else if (updatedQuestions[qIndex].subType.label === 'checkbox') {
      if (updatedQuestions[qIndex].correctAnswers.includes(answer)) {
        updatedQuestions[qIndex].correctAnswers = updatedQuestions[qIndex].correctAnswers.filter(ans => ans !== answer);
      } else {
        updatedQuestions[qIndex].correctAnswers.push(answer);
      }
    }
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length < 5) {
      updatedQuestions[qIndex].options.push('');
      setQuestions(updatedQuestions);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: null, subType: null, questionText: '', correctAnswers: [], options: [''], subTypes: [] }]);
  };

  const handleSaveQuestion = (index) => {
    const question = questions[index];
  };

  const renderOptions = (question, qIndex) => {
    return question.options.map((option, optIndex) => (
      <div key={optIndex}>
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(qIndex, optIndex, e)}
          className="mt-1 block w-full"
        />
        {question.subType.label === 'mcq' && (
          <input
            type="radio"
            name={`option-${qIndex}`}
            value={option}
            className="mt-1"
            onChange={() => handleAnswerSelection(qIndex, option)}
          />
        )}
        {question.subType.label === 'checkbox' && (
          <input
            type="checkbox"
            className="mt-1"
            onChange={() => handleAnswerSelection(qIndex, option)}
          />
        )}
      </div>
    ));
  };

  const renderInputField = (question, index) => {
    switch (question.subType?.label) {
      case 'text':
      case 'email':
        return <input type={question.subType.label} className="mt-1 block w-full" />;
      case 'file':
        return <input type="file" className="mt-1 block w-full" />;
      case 'mcq':
        return (
          <div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="radio"
                  id={`mcq-${index}-${optionIndex}`}
                  name={`question-${index}`}
                  value={option}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="mt-1 block w-full"
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            {question.options.length < 5 && (
              <button
                onClick={() => handleAddOption(index)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              >
                Add Option
              </button>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id={`checkbox-${index}-${optionIndex}`}
                  name={`question-${index}-${optionIndex}`}
                  value={option}
                  
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  className="mt-1 block w-full"
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            {question.options.length < 5 && (
              <button
                onClick={() => handleAddOption(index)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              >
                Add Option
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Add Questions to: {formDetails.title}</h2>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <div>
            <label htmlFor={`type-${index}`} className="block text-sm font-medium text-gray-700">Type</label>
            <Select
              id={`type-${index}`}
              value={question.type}
              onChange={(selectedType) => handleTypeChange(index, selectedType)}
              options={types}
              className="mt-1"
            />
          </div>
          {question.type && (
            <div>
              <label htmlFor={`subtype-${index}`} className="block text-sm font-medium text-gray-700">Subtype</label>
              <Select
                id={`subtype-${index}`}
                value={question.subType}
                onChange={(selectedSubType) => handleSubTypeChange(index, selectedSubType)}
                options={question.subTypes}
                className="mt-1"
              />
            </div>
          )}
          {question.subType && (
            <div>
              <label htmlFor={`questionText-${index}`} className="block text-sm font-medium text-gray-700">Enter Your Label</label>
              <input
                type="text"
                id={`questionText-${index}`}
                value={question.questionText}
                onChange={(event) => handleQuestionTextChange(index, event)}
                className="mt-1 block w-full"
              />
              {renderInputField(question, index)}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleAddQuestion}
        className="mt-4 bg-green-500 text-white py-1 px-3 rounded"
      >
        Add Another Question
      </button>
      <button
        onClick={() => console.log('Form Submitted:', questions)}
        className="mt-4 bg-green-500 text-white py-1 px-3 rounded"
      >
        Create Form
      </button>
    </div>
  );
};

export default AddQuestionPage;
