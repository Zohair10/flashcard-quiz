import React, { useState } from 'react'
import FlashCardList from './components/FlashCardList'
import FlashCardForm from './components/FlashCardForm'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  // initial sample cards
  const [cards, setCards] = useState([
    { 
      question: 'What is React?', 
      answer: 'A JavaScript library for building user interfaces, particularly web applications with interactive UIs.' 
    },
    { 
      question: 'What is a React Hook?', 
      answer: 'Functions that let you use state and other React features in functional components. Examples include useState, useEffect.' 
    },
    { 
      question: 'What does JSX stand for?', 
      answer: 'JavaScript XML is a syntax extension for JavaScript that allows you to write HTML-like code in React.' 
    },
    { 
      question: 'What are some example of web apps built with React?', 
      answer: ' Some examples include Facebook and Netflix' 
    }
  ])
  
  const [isQuizMode, setIsQuizMode] = useState(false)

  const addCard = (newCard) => {
    setCards([...cards, newCard])
  }

  const clearAllCards = () => {
    if (window.confirm('Are you sure you want to delete all flash cards?')) {
      setCards([])
      setIsQuizMode(false)
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold mb-3">
                <i className="bi bi-card-text me-3"></i>
                Flash Card Quiz
              </h1>
              <p className="lead mb-4">Learn and test your knowledge with interactive flash cards</p>
              
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button 
                  onClick={() => setIsQuizMode(!isQuizMode)}
                  className={`btn btn-lg px-4 ${isQuizMode ? 'btn-outline-primary' : 'btn-primary'}`}
                  disabled={cards.length === 0}
                >
                  <i className={`bi ${isQuizMode ? 'bi-book' : 'bi-trophy'} me-2`}></i>
                  {isQuizMode ? 'Back to Study' : 'Start Quiz'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {isQuizMode ? (
            <Quiz cards={cards} />
          ) : (
            <>
              <FlashCardForm addCard={addCard} />
              <FlashCardList cards={cards} clearAllCards={clearAllCards} />
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">
                <i className="bi bi-heart-fill text-danger me-2"></i>
                Built with modern React and CSS3 • Flash Card Quiz App
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
