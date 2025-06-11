import React, { useState } from 'react'
import './FlashCardForm.css'

function FlashCardForm({ addCard }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (question.trim() && answer.trim()) {
      addCard({
        question: question.trim(),
        answer: answer.trim()
      })
      setQuestion('')
      setAnswer('')
    }
  }

  return (
    <div className="flash-card-form mb-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient text-white text-center py-3">
          <h2 className="card-title mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Flash Card
          </h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="question" className="form-label fw-semibold">
                  <i className="bi bi-question-circle me-2"></i>
                  Question:
                </label>
                <textarea
                  id="question"
                  className="form-control form-control-lg"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question here..."
                  required
                  rows="4"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="answer" className="form-label fw-semibold">
                  <i className="bi bi-lightbulb me-2"></i>
                  Answer:
                </label>
                <textarea
                  id="answer"
                  className="form-control form-control-lg"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer here..."
                  required
                  rows="4"
                />
              </div>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg px-5">
                <i className="bi bi-plus-lg me-2"></i>
                Add Flash Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FlashCardForm
