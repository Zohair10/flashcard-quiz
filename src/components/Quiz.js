import React, { useState, useEffect } from 'react'
import './Quiz.css'

function Quiz({ cards }) {
  const [shuffledCards, setShuffledCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [quizComplete, setQuizComplete] = useState(false)

  useEffect(() => {
    // Shuffle cards when quiz starts
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
    setQuizComplete(false)
  }, [cards])

  if (cards.length === 0) {
    return (
      <div className="quiz">
        <div className="card border-0 shadow-lg">
          <div className="card-body text-center py-5">
            <i className="bi bi-trophy display-1 text-warning mb-3"></i>
            <h2 className="h3 mb-3">Quiz Mode</h2>
            <p className="text-muted">No flash cards available. Add some cards first!</p>
          </div>
        </div>
      </div>
    )
  }

  const currentCard = shuffledCards[currentIndex]

  const handleAnswer = (isCorrect) => {
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    }
    setScore(newScore)

    if (currentIndex + 1 >= shuffledCards.length) {
      setQuizComplete(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const restartQuiz = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = Math.round((score.correct / score.total) * 100)
    return (
      <div className="quiz">
        <div className="card border-0 shadow-lg">
          <div className="card-body text-center p-5">
            <div className="quiz-complete">
              <i className="bi bi-trophy-fill display-1 text-warning mb-3"></i>
              <h2 className="text-success mb-4">Quiz Complete! 🎉</h2>
              
              <div className="card bg-gradient-primary text-white mb-4">
                <div className="card-body">
                  <h3 className="card-title">Your Score: {score.correct} / {score.total}</h3>
                  <p className="display-4 mb-0 fw-bold">{percentage}%</p>
                </div>
              </div>
              
              <button onClick={restartQuiz} className="btn btn-success btn-lg px-5">
                <i className="bi bi-arrow-clockwise me-2"></i>
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="card border-0 shadow-lg">
        <div className="card-header bg-gradient text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <i className="bi bi-trophy me-2"></i>
              Quiz Mode
            </h2>
            <div className="badge bg-light text-dark fs-6">
              <i className="bi bi-star-fill me-1"></i>
              {score.correct} / {score.total}
            </div>
          </div>
        </div>
        
        <div className="card-body p-4">
          <div className="quiz-header mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary fw-semibold">Card {currentIndex + 1} of {shuffledCards.length}</span>
              <span className="badge bg-primary">Score: {score.correct} / {score.total}</span>
            </div>
            
            <div className="progress mb-3" style={{height: '8px'}}>
              <div 
                className="progress-bar bg-gradient-primary" 
                role="progressbar"
                style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}
                aria-valuenow={currentIndex + 1}
                aria-valuemin="0"
                aria-valuemax={shuffledCards.length}
              ></div>
            </div>
          </div>

          {currentCard && (
            <div className="quiz-card">
              <div className="card border-primary mb-4">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-question-circle me-2"></i>
                    Question:
                  </h4>
                </div>
                <div className="card-body">
                  <p className="fs-5 mb-0">{currentCard.question}</p>
                </div>
              </div>

              {!showAnswer ? (
                <div className="text-center">
                  <button 
                    onClick={() => setShowAnswer(true)} 
                    className="btn btn-outline-primary btn-lg px-5"
                  >
                    <i className="bi bi-eye me-2"></i>
                    Reveal Answer
                  </button>
                </div>
              ) : (
                <div className="answer-section">
                  <div className="card border-success mb-4">
                    <div className="card-header bg-success text-white">
                      <h4 className="mb-0">
                        <i className="bi bi-lightbulb me-2"></i>
                        Answer:
                      </h4>
                    </div>
                    <div className="card-body">
                      <p className="fs-5 mb-0">{currentCard.answer}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="fw-semibold mb-3">Did you get it right?</p>
                    <div className="d-flex gap-3 justify-content-center">
                      <button 
                        onClick={() => handleAnswer(true)} 
                        className="btn btn-success btn-lg px-4"
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Correct
                      </button>
                      <button 
                        onClick={() => handleAnswer(false)} 
                        className="btn btn-danger btn-lg px-4"
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Incorrect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
