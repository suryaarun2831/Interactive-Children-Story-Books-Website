import React from 'react';
import { useLocation } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="result-container">
      <h2 className="result-title">🎉 Quiz Results 🎉</h2>
      <p className="result-score">Your Score: <span>{score}</span> / <span>{total}</span></p>
      <p className="result-summary">
        Thank you for participating in the quiz! You answered <span>{score}</span> out of <span>{total}</span> questions correctly.
      </p>
      <p className="result-message">Great job! 🎈</p>
    </div>
  );
}

export default Result;
