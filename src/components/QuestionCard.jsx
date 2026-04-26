import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect,
  showResult 
}) => {
  const getOptionClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? 'selected' : '';
    }
    
    if (index === question.correctAnswer) {
      return 'correct';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };

  return (
    <div className="question-card">
      <div className="question-progress">
        Вопрос {currentQuestion + 1} из {totalQuestions}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(index)}`}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
