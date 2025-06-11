import React, { useState } from 'react'
import './FlashCardList.css'

function FlashCardList({ cards, clearAllCards }) {
  const [flippedCards, setFlippedCards] = useState(new Set())

  const toggleCard = (index) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(index)) {
      newFlipped.delete(index)
    } else {
      newFlipped.add(index)
    }
    setFlippedCards(newFlipped)
  }

  if (cards.length === 0) {
    return (
      <div className="flash-card-list">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="bi bi-card-text display-1 text-muted mb-3"></i>
            <h2 className="h4 text-muted">Your Flash Cards</h2>
            <p className="text-muted">No flash cards yet. Add your first card above!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flash-card-list">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <h2 className="h3 mb-0 me-3">
            <i className="bi bi-collection me-2"></i>
            Your Flash Cards
          </h2>
          <span className="badge bg-primary fs-6">({cards.length})</span>
        </div>
        
        {cards.length > 0 && (
          <button 
            onClick={clearAllCards} 
            className="btn btn-outline-danger px-4"
          >
            <i className="bi bi-trash me-2"></i>
            Clear All Cards
          </button>
        )}
      </div>
      
      <div className="row g-4">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.has(index)
          
          return (
            <div key={index} className="col-lg-4 col-md-6">
              <div 
                className={`flash-card h-100 ${isFlipped ? 'flipped' : ''}`}
                onClick={() => toggleCard(index)}
              >
                <div className="card-inner">
                  {/* Front of card (Question) */}
                  <div className="card-front card border-0 shadow-sm h-100">
                    <div className="card-header text-white text-center" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                      <h5 className="card-title mb-0">
                        <i className="bi bi-question-circle me-2"></i>
                        Question
                      </h5>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                      <p className="card-text fs-5" style={{color: '#374151', fontWeight: '500'}}>
                        {card.question}
                      </p>
                      <small className="text-muted mt-auto">
                        <i className="bi bi-cursor-fill me-1"></i>
                        Click to reveal answer
                      </small>
                    </div>
                  </div>
                  
                  {/* Back of card (Answer) */}
                  <div className="card-back card border-0 shadow-sm h-100">
                    <div className="card-header text-white text-center" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                      <h5 className="card-title mb-0">
                        <i className="bi bi-lightbulb me-2"></i>
                        Answer
                      </h5>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                      <p className="card-text fs-5" style={{color: '#374151', fontWeight: '500'}}>
                        {card.answer}
                      </p>
                      <small className="text-muted mt-auto">
                        <i className="bi bi-cursor-fill me-1"></i>
                        Click to see question
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FlashCardList
