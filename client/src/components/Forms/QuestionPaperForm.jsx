import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../../context/FormDataContext';
import Navbar from '../header/Navbar';

function QuestionPaperForm() {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(5);

  const navigate = useNavigate();
  const { addFormData } = useFormData();


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setQuestionTypes([...questionTypes, value]);
    } else {
      setQuestionTypes(questionTypes.filter((type) => type !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/api/questions/generate", {
        subject,
        difficulty,
        type: questionTypes,
        questionNumber: Number(questionNumber),
      });
       const data = { subject, difficulty, questionTypes, questionNumber };
        addFormData(data);
       navigate('/dashboard');
    } catch (error) {
      console.error("Error generating question paper:", error.response?.data || error.message);
      alert("Something went wrong while generating the paper.");
    }
  };

  const availableQuestionTypes = [
    { value: 'mcq', label: 'Multiple Choice Questions' },
    { value: 'short_answer', label: 'Short Answer' },
    { value: 'long_answer', label: 'Long Answer' },
    { value: 'true_false', label: 'True/False' },
    { value: 'fill_in_blanks', label: 'Fill in the Blanks' },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
        <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Generate Question Paper</h2>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Question Types:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableQuestionTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type.value}`}
                    value={type.value}
                    checked={questionTypes.includes(type.value)}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={`type-${type.value}`} className="text-gray-700 text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="questionNumber" className="block text-gray-700 text-sm font-bold mb-2">No. of Questions</label>
            <input
              type="number"
              id="questionNumber"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(Number(e.target.value))}
              min="1"
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Paper
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuestionPaperForm;
