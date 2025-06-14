import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({
  subject ,
  questionNumber ,
  difficulty,
  questionTypes // Default to empty array
}) {

  const navigate = useNavigate();

  const handleClick = ()=>{
      navigate(`/display/${subject}`,{
        subject
      });
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <h3 className="text-xl font-semibold mb-2">Subject: {subject}</h3>
      <p className="text-gray-700 mb-1">
        <strong>Number of Questions:</strong> {questionNumber}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Difficulty:</strong> {difficulty}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Question Types:</strong>{' '}
        {Array.isArray(questionTypes) && questionTypes.length > 0
          ? questionTypes.join(', ')
          : 'None'}
      </p>
      <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Questions
      </button>
    </div>
  );
}

export default Card;
