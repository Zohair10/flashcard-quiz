import React, { useState } from 'react'
import './FlashCardForm.css'

function FlashCardForm({ addCard }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [category, setCategory] = useState('General Knowledge')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (question.trim() && answer.trim()) {
      setIsSubmitting(true)
      
      // Add card with enhanced data
      addCard({
        question: question.trim(),
        answer: answer.trim(),
        difficulty,
        category
      })
      
      // Reset form with smooth animation
      setTimeout(() => {
        setQuestion('')
        setAnswer('')
        setDifficulty('medium')
        setCategory('General Knowledge')
        setIsSubmitting(false)
      }, 500)
    }
  }

  const predefinedCategories = [
    { value: 'WebDev', label: '💻 Web Development', color: '#3b82f6' },
    { value: 'General Knowledge', label: '🌍 General Knowledge', color: '#10b981' },
    { value: 'Science', label: '🔬 Science', color: '#8b5cf6' },
    { value: 'History', label: '📚 History', color: '#f59e0b' },
    { value: 'Mathematics', label: '🔢 Mathematics', color: '#ef4444' },
    { value: 'Literature', label: '📖 Literature', color: '#6366f1' },
    { value: 'Custom', label: '✨ Custom Category', color: '#6b7280' }
  ]

  const [customCategory, setCustomCategory] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleCategoryChange = (value) => {
    setCategory(value)
    setShowCustomInput(value === 'Custom')
    if (value !== 'Custom') {
      setCustomCategory('')
    }
  }

  const getFinalCategory = () => {
    return category === 'Custom' && customCategory.trim() 
      ? customCategory.trim() 
      : category === 'Custom' 
        ? 'General Knowledge' 
        : category
  }

  return (
    <div className="premium-card-form">
      <div className="form-container">
        <div className="form-header">
          <div className="header-content">
            <div className="header-icon">🎯</div>
            <div className="header-text">
              <h2>Create New Flash Card</h2>
              <p>Design your perfect learning experience</p>
            </div>
          </div>
          <div className="progress-indicator">
            <div className="step active">1</div>
            <div className="step-line active"></div>
            <div className="step active">2</div>
            <div className="step-line active"></div>
            <div className="step active">3</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="premium-form">
          {/* Question Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">❓</div>
              <div className="section-title">
                <h3>Question</h3>
                <p>What do you want to learn?</p>
              </div>
            </div>
            <div className="input-group">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here... (e.g., What is React?)"
                className="premium-textarea"
                rows="4"
                required
              />
              <div className="input-footer">
                <span className="char-count">{question.length}/500</span>
                <span className="input-hint">💡 Be specific and clear</span>
              </div>
            </div>
          </div>

          {/* Answer Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">💡</div>
              <div className="section-title">
                <h3>Answer</h3>
                <p>Provide a comprehensive answer</p>
              </div>
            </div>
            <div className="input-group">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer here... (e.g., A JavaScript library for building user interfaces)"
                className="premium-textarea"
                rows="4"
                required
              />
              <div className="input-footer">
                <span className="char-count">{answer.length}/1000</span>
                <span className="input-hint">📝 Include details and examples</span>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">⚙️</div>
              <div className="section-title">
                <h3>Card Settings</h3>
                <p>Customize difficulty and category</p>
              </div>
            </div>
            
            <div className="settings-grid">
              {/* Difficulty Selection */}
              <div className="setting-group">
                <label className="setting-label">⚡ Difficulty Level</label>
                <div className="difficulty-buttons">
                  {[
                    { value: 'easy', label: 'Easy', emoji: '😊', color: '#10b981' },
                    { value: 'medium', label: 'Medium', emoji: '🤔', color: '#f59e0b' },
                    { value: 'hard', label: 'Hard', emoji: '😰', color: '#ef4444' }
                  ].map(diff => (
                    <button
                      key={diff.value}
                      type="button"
                      className={`difficulty-btn ${difficulty === diff.value ? 'active' : ''}`}
                      onClick={() => setDifficulty(diff.value)}
                      style={{
                        '--diff-color': diff.color,
                        backgroundColor: difficulty === diff.value ? diff.color : 'transparent',
                        borderColor: diff.color,
                        color: difficulty === diff.value ? 'white' : diff.color
                      }}
                    >
                      <span className="diff-emoji">{diff.emoji}</span>
                      <span className="diff-label">{diff.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="setting-group">
                <label className="setting-label">📁 Category</label>
                <div className="category-grid">
                  {predefinedCategories.map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      className={`category-btn ${category === cat.value ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat.value)}
                      style={{
                        '--cat-color': cat.color,
                        backgroundColor: category === cat.value ? cat.color : 'transparent',
                        borderColor: cat.color,
                        color: category === cat.value ? 'white' : cat.color
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                
                {showCustomInput && (
                  <div className="custom-category-input">
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category name..."
                      className="custom-input"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(question || answer) && (
            <div className="form-section preview-section">
              <div className="section-header">
                <div className="section-icon">👀</div>
                <div className="section-title">
                  <h3>Card Preview</h3>
                  <p>How your card will look</p>
                </div>
              </div>
              <div className="card-preview">
                <div className="preview-card">
                  <div className="preview-header">
                    <span className="preview-difficulty" style={{backgroundColor: 
                      difficulty === 'easy' ? '#10b981' : 
                      difficulty === 'medium' ? '#f59e0b' : '#ef4444'
                    }}>
                      {difficulty === 'easy' ? '😊' : difficulty === 'medium' ? '🤔' : '😰'} {difficulty}
                    </span>
                    <span className="preview-category">📁 {getFinalCategory()}</span>
                  </div>
                  <div className="preview-content">
                    <div className="preview-question">
                      <strong>Q:</strong> {question || 'Your question will appear here...'}
                    </div>
                    <div className="preview-answer">
                      <strong>A:</strong> {answer || 'Your answer will appear here...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="submit-section">
            <button 
              type="submit" 
              className={`premium-submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting || !question.trim() || !answer.trim()}
            >
              <div className="btn-content">
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Creating Card...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    <span>Create Flash Card</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </div>
            </button>
            
            <div className="submit-hint">
              <span className="hint-icon">💡</span>
              <span>Your card will be added to the {getFinalCategory()} category</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FlashCardForm
