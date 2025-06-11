import React, { useState, useEffect } from 'react'
import './Quiz.css'

function Quiz({ cards, onExit }) {
  const [quizState, setQuizState] = useState('setup') // 'setup', 'active', 'complete'
  const [quizSettings, setQuizSettings] = useState({
    category: 'all',
    difficulty: 'all',
    questionCount: 5
  })
  const [filteredCards, setFilteredCards] = useState([])
  const [shuffledCards, setShuffledCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Get available categories and difficulties
  const categories = [...new Set(cards.map(card => card.category))]
  const difficulties = ['easy', 'medium', 'hard']

  // Filter cards based on settings
  useEffect(() => {
    let filtered = cards.filter(card => {
      const categoryMatch = quizSettings.category === 'all' || card.category === quizSettings.category
      const difficultyMatch = quizSettings.difficulty === 'all' || card.difficulty === quizSettings.difficulty
      return categoryMatch && difficultyMatch
    })
    setFilteredCards(filtered)
    
    // Automatically adjust question count when filtered cards change
    const maxQuestions = Math.min(filtered.length, 20)
    if (quizSettings.questionCount > maxQuestions) {
      setQuizSettings(prev => ({
        ...prev,
        questionCount: Math.max(1, maxQuestions)
      }))
    }
  }, [cards, quizSettings.category, quizSettings.difficulty])

  const startQuiz = () => {
    if (filteredCards.length === 0) return
    
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5)
    const quizCards = shuffled.slice(0, Math.min(quizSettings.questionCount, shuffled.length))
    
    setShuffledCards(quizCards)
    setCurrentIndex(0)
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })
    setQuizState('active')
  }

  const handleAnswer = (isCorrect) => {
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    }
    setScore(newScore)

    if (currentIndex + 1 >= shuffledCards.length) {
      setQuizState('complete')
    } else {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const restartQuiz = () => {
    setQuizState('setup')
    setScore({ correct: 0, total: 0 })
  }

  const resetToSetup = () => {
    setQuizState('setup')
    setScore({ correct: 0, total: 0 })
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  // Quiz Setup View
  const QuizSetup = () => (
    <div className="quiz-setup">
      <div className="setup-header">
        <div className="setup-icon">🎯</div>
        <div className="setup-text">
          <h2>Quiz Setup</h2>
          <p>Customize your quiz experience</p>
        </div>
      </div>

      <div className="setup-form">
        {/* Category Selection */}
        <div className="setup-section">
          <div className="section-header">
            <h3>📁 Select Category</h3>
            <p>Choose which category to quiz yourself on</p>
          </div>
          <div className="category-options">
            <button
              className={`category-option ${quizSettings.category === 'all' ? 'active' : ''}`}
              onClick={() => setQuizSettings({...quizSettings, category: 'all'})}
            >
              <span className="option-icon">🌟</span>
              <span className="option-label">All Categories</span>
              <span className="option-count">{cards.length} cards</span>
            </button>
            {categories.map(category => {
              const count = cards.filter(card => card.category === category).length
              return (
                <button
                  key={category}
                  className={`category-option ${quizSettings.category === category ? 'active' : ''}`}
                  onClick={() => setQuizSettings({...quizSettings, category})}
                >
                  <span className="option-icon">
                    {category === 'WebDev' ? '💻' : '🌍'}
                  </span>
                  <span className="option-label">{category}</span>
                  <span className="option-count">{count} cards</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="setup-section">
          <div className="section-header">
            <h3>⚡ Select Difficulty</h3>
            <p>Choose the difficulty level for your quiz</p>
          </div>
          <div className="difficulty-options">
            <button
              className={`difficulty-option ${quizSettings.difficulty === 'all' ? 'active' : ''}`}
              onClick={() => setQuizSettings({...quizSettings, difficulty: 'all'})}
            >
              <span className="diff-icon">🎯</span>
              <span className="diff-label">All Levels</span>
            </button>
            {difficulties.map(difficulty => {
              const emoji = difficulty === 'easy' ? '😊' : difficulty === 'medium' ? '🤔' : '😰'
              const color = difficulty === 'easy' ? '#10b981' : difficulty === 'medium' ? '#f59e0b' : '#ef4444'
              return (
                <button
                  key={difficulty}
                  className={`difficulty-option ${quizSettings.difficulty === difficulty ? 'active' : ''}`}
                  onClick={() => setQuizSettings({...quizSettings, difficulty})}
                  style={{ '--diff-color': color }}
                >
                  <span className="diff-icon">{emoji}</span>
                  <span className="diff-label">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Question Count Selection */}
        <div className="setup-section">
          <div className="section-header">
            <h3>📊 Number of Questions</h3>
            <p>How many questions do you want in your quiz?</p>
          </div>
          <div className="count-selection">
            <div className="count-slider">
              <input
                type="range"
                min="1"
                max={Math.min(filteredCards.length, 20)}
                value={quizSettings.questionCount}
                onChange={(e) => setQuizSettings({...quizSettings, questionCount: parseInt(e.target.value)})}
                className="slider"
              />
              <div className="slider-labels">
                <span>1</span>
                <span className="current-value">{quizSettings.questionCount} questions</span>
                <span>{Math.min(filteredCards.length, 20)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Preview */}
        <div className="quiz-preview">
          <div className="preview-stats">
            <div className="preview-stat">
              <span className="stat-icon">📚</span>
              <span className="stat-value">{filteredCards.length}</span>
              <span className="stat-label">Available Cards</span>
            </div>
            <div className="preview-stat">
              <span className="stat-icon">❓</span>
              <span className="stat-value">{Math.min(quizSettings.questionCount, filteredCards.length)}</span>
              <span className="stat-label">Quiz Questions</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="setup-actions">
          <button 
            className="start-quiz-btn"
            onClick={startQuiz}
            disabled={filteredCards.length === 0}
          >
            <span className="btn-icon">🚀</span>
            <span>Start Quiz</span>
          </button>
          <button className="cancel-btn" onClick={onExit}>
            <span className="btn-icon">↩️</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Active Quiz View
  const ActiveQuiz = () => {
    const currentCard = shuffledCards[currentIndex]
    const progress = ((currentIndex + 1) / shuffledCards.length) * 100

    return (
      <div className="active-quiz">
        <div className="quiz-header">
          <button className="back-btn" onClick={resetToSetup}>
            ← Back to Setup
          </button>
          <div className="quiz-info">
            <span className="question-counter">
              Question {currentIndex + 1} of {shuffledCards.length}
            </span>
            <span className="current-score">
              Score: {score.correct} / {score.total}
            </span>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}% Complete</span>
        </div>

        {currentCard && (
          <div className="quiz-card-container">
            <div className="quiz-card">
              <div className="card-badges">
                <span className="difficulty-badge" style={{
                  backgroundColor: currentCard.difficulty === 'easy' ? '#10b981' : 
                                  currentCard.difficulty === 'medium' ? '#f59e0b' : '#ef4444'
                }}>
                  {currentCard.difficulty === 'easy' ? '😊' : 
                   currentCard.difficulty === 'medium' ? '🤔' : '😰'} 
                  {currentCard.difficulty}
                </span>
                <span className="category-badge">
                  {currentCard.category === 'WebDev' ? '💻' : '🌍'} {currentCard.category}
                </span>
              </div>
              
              <div className="question-section">
                <h3>❓ Question</h3>
                <p className="question-text">{currentCard.question}</p>
              </div>

              {!showAnswer ? (
                <div className="reveal-section">
                  <button 
                    className="reveal-btn"
                    onClick={() => setShowAnswer(true)}
                  >
                    <span className="btn-icon">👁️</span>
                    <span>Reveal Answer</span>
                  </button>
                </div>
              ) : (
                <div className="answer-section">
                  <div className="answer-content">
                    <h3>💡 Answer</h3>
                    <p className="answer-text">{currentCard.answer}</p>
                  </div>
                  
                  <div className="judgment-section">
                    <p className="judgment-prompt">Did you get it right?</p>
                    <div className="judgment-buttons">
                      <button 
                        className="correct-btn"
                        onClick={() => handleAnswer(true)}
                      >
                        <span className="btn-icon">✅</span>
                        <span>Correct</span>
                      </button>
                      <button 
                        className="incorrect-btn"
                        onClick={() => handleAnswer(false)}
                      >
                        <span className="btn-icon">❌</span>
                        <span>Incorrect</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Quiz Complete View
  const QuizComplete = () => {
    const percentage = Math.round((score.correct / score.total) * 100)
    const getGrade = () => {
      if (percentage >= 90) return { grade: 'A+', emoji: '🏆', message: 'Outstanding!' }
      if (percentage >= 80) return { grade: 'A', emoji: '🌟', message: 'Excellent!' }
      if (percentage >= 70) return { grade: 'B', emoji: '👍', message: 'Good job!' }
      if (percentage >= 60) return { grade: 'C', emoji: '👌', message: 'Keep practicing!' }
      return { grade: 'D', emoji: '💪', message: 'Try again!' }
    }
    
    const result = getGrade()

    return (
      <div className="quiz-complete">
        <div className="results-header">
          <div className="results-icon">{result.emoji}</div>
          <h2>Quiz Complete!</h2>
          <p>{result.message}</p>
        </div>

        <div className="results-card">
          <div className="score-display">
            <div className="score-circle">
              <div className="percentage">{percentage}%</div>
              <div className="grade">{result.grade}</div>
            </div>
            <div className="score-details">
              <div className="score-item">
                <span className="label">Correct</span>
                <span className="value correct">{score.correct}</span>
              </div>
              <div className="score-item">
                <span className="label">Incorrect</span>
                <span className="value incorrect">{score.total - score.correct}</span>
              </div>
              <div className="score-item">
                <span className="label">Total</span>
                <span className="value total">{score.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="results-actions">
          <button className="retake-btn" onClick={startQuiz}>
            <span className="btn-icon">🔄</span>
            <span>Retake Quiz</span>
          </button>
          <button className="new-quiz-btn" onClick={restartQuiz}>
            <span className="btn-icon">🎯</span>
            <span>New Quiz</span>
          </button>
          <button className="exit-btn" onClick={onExit}>
            <span className="btn-icon">🏠</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  // Handle empty cards state
  if (cards.length === 0) {
    return (
      <div className="quiz-empty">
        <div className="empty-content">
          <div className="empty-icon">📚</div>
          <h2>No Cards Available</h2>
          <p>Add some flash cards first to start a quiz!</p>
          <button className="add-cards-btn" onClick={onExit}>
            <span className="btn-icon">➕</span>
            <span>Add Cards</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      {quizState === 'setup' && <QuizSetup />}
      {quizState === 'active' && <ActiveQuiz />}
      {quizState === 'complete' && <QuizComplete />}
    </div>
  )
}

export default Quiz
