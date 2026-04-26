import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { questions } from '../data/questions';
import './QuizPage.css';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    
    setAnswers({
      ...answers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    const isCorrect = answers[currentQuestion] === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      
      const bestScore = localStorage.getItem('bestScore');
      if (!bestScore || finalScore > parseInt(bestScore)) {
        localStorage.setItem('bestScore', finalScore.toString());
      }
      
      navigate('/result', { 
        state: { 
          score: finalScore,
          totalQuestions: questions.length 
        } 
      });
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const canProceed = answers[currentQuestion] !== undefined;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button 
          className="exit-button"
          onClick={() => navigate('/')}
        >
          ← Выйти
        </button>
        <div className="score-display">
          Счет: {score}/{questions.length}
        </div>
      </div>

      <QuestionCard
        question={questions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        showResult={showResult}
      />

      <div className="quiz-actions">
        {!showResult && canProceed && (
          <button 
            className="action-button check-button"
            onClick={handleShowResult}
          >
            Проверить ответ
          </button>
        )}
        
        {showResult && (
          <button 
            className="action-button next-button"
            onClick={handleNextQuestion}
          >
            {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
