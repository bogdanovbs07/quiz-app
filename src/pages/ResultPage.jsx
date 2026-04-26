import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
  
  const percentage = (score / totalQuestions) * 100;
  const bestScore = localStorage.getItem('bestScore');

  const getResultMessage = () => {
    if (percentage === 100) return 'Превосходно!';
    if (percentage >= 80) return 'Отличный результат!';
    if (percentage >= 60) return 'Хорошая работа!';
    if (percentage >= 40) return 'Неплохо!';
    return 'Попробуй еще раз!';
  };

  const getEmoji = () => {
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👏';
    if (percentage >= 40) return '📚';
    return '💪';
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-emoji">{getEmoji()}</div>
        <h1 className="result-title">{getResultMessage()}</h1>
        
        <div className="score-circle">
          <div className="score-number">{score}</div>
          <div className="score-total">из {totalQuestions}</div>
        </div>

        <div className="percentage-bar">
          <div 
            className="percentage-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="percentage-text">{percentage}% правильных ответов</div>

        {bestScore && (
          <div className="best-score-badge">
            🏅 Лучший результат: {bestScore} баллов
          </div>
        )}

        <div className="result-stats">
          <div className="stat-item correct">
            <span className="stat-number">{score}</span>
            <span className="stat-label">Правильно</span>
          </div>
          <div className="stat-item incorrect">
            <span className="stat-number">{totalQuestions - score}</span>
            <span className="stat-label">Неправильно</span>
          </div>
        </div>

        <div className="result-actions">
          <button 
            className="retry-button"
            onClick={() => navigate('/quiz')}
          >
            Пройти заново
          </button>
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
