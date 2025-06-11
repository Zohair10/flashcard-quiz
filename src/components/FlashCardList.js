import React, { useState } from 'react'
import './FlashCardList.css'

function FlashCardList({ cards, deleteCard, clearAllCards }) {
  const [flippedCards, setFlippedCards] = useState(new Set())

  const toggleCard = (index) => {
    const newFlippedCards = new Set(flippedCards)
    if (newFlippedCards.has(index)) {
      newFlippedCards.delete(index)
    } else {
      newFlippedCards.add(index)
    }
    setFlippedCards(newFlippedCards)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '😊'
      case 'medium': return '🤔'
      case 'hard': return '😰'
      default: return '📝'
    }
  }

  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>No flash cards yet</h3>
        <p>Create your first flash card to get started!</p>
      </div>
    )
  }

  return (
    <div className="flash-card-list">
      <div className="list-header">
        <div className="list-stats">
          <span className="card-count">{cards.length} cards</span>
          <div className="difficulty-stats">
            <span className="diff-easy">
              😊 {cards.filter(c => c.difficulty === 'easy').length}
            </span>
            <span className="diff-medium">
              🤔 {cards.filter(c => c.difficulty === 'medium').length}
            </span>
            <span className="diff-hard">
              😰 {cards.filter(c => c.difficulty === 'hard').length}
            </span>
          </div>
        </div>
        
        {cards.length > 0 && (
          <button onClick={clearAllCards} className="clear-btn">
            <span className="btn-icon">🗑️</span>
            Clear All
          </button>
        )}
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.has(index)
          
          return (
            <div key={card.id || index} className="card-container">
              <div 
                className={`flash-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => toggleCard(index)}
              >
                <div className="card-inner">
                  {/* Front of card (Question) */}
                  <div className="card-front">
                    <div className="card-header">
                      <div className="card-type">
                        <span className="type-icon">❓</span>
                        <span>Question</span>
                      </div>
                      <div className="card-badges">
                        <span 
                          className="difficulty-badge"
                          style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
                        >
                          {getDifficultyEmoji(card.difficulty)} {card.difficulty}
                        </span>
                        <span className="category-badge">
                          📁 {card.category}
                        </span>
                      </div>
                    </div>
                    <div className="card-content">
                      <p className="card-text">{card.question}</p>
                      <div className="card-hint">
                        <span className="hint-icon">👆</span>
                        Click to reveal answer
                      </div>
                    </div>
                  </div>

                  {/* Back of card (Answer) */}
                  <div className="card-back">
                    <div className="card-header">
                      <div className="card-type">
                        <span className="type-icon">💡</span>
                        <span>Answer</span>
                      </div>
                      <div className="card-badges">
                        <span 
                          className="difficulty-badge"
                          style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
                        >
                          {getDifficultyEmoji(card.difficulty)} {card.difficulty}
                        </span>
                        <span className="category-badge">
                          📁 {card.category}
                        </span>
                      </div>
                    </div>
                    <div className="card-content">
                      <p className="card-text">{card.answer}</p>
                      <div className="card-hint">
                        <span className="hint-icon">👆</span>
                        Click to see question
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Delete button */}
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  if (window.confirm('Are you sure you want to delete this card?')) {
                    deleteCard(card.id || index)
                  }
                }}
                title="Delete card"
              >
                <span className="delete-icon">✖️</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlashCardList
