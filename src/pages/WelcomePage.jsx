import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const bestScore = localStorage.getItem('bestScore');

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-icon">🎯</div>
        <h1 className="welcome-title">Викторина по Frontend</h1>
        <p className="welcome-description">
          Проверь свои знания в области веб-разработки! 
          Ответь на вопросы и узнай свой уровень.
        </p>
        
        <div className="welcome-info">
          <div className="info-item">
            <span className="info-icon">📝</span>
            <span>6 вопросов</span>
          </div>
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>Без ограничения времени</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🏆</span>
            <span>Сохранение результата</span>
          </div>
        </div>

        {bestScore && (
          <div className="best-score-info">
            🏅 Лучший результат: {bestScore} баллов
          </div>
        )}

        <button 
          className="start-button"
          onClick={() => navigate('/quiz')}
        >
          Начать викторину
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
