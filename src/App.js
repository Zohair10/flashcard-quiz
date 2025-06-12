import React, { useState, useEffect, useMemo, useCallback } from 'react'
import FlashCardList from './components/FlashCardList'
import FlashCardForm from './components/FlashCardForm'
import Quiz from './components/Quiz'
import Navbar from './components/navbar'
import SearchBar from './components/SearchBar'
import SettingsView from './components/SettingsView'
import './App.css'

function App() {
  // State management
  const [cards, setCards] = useState([
    { 
      id: 1,
      question: 'What is React?', 
      answer: 'A JavaScript library for building user interfaces, particularly web applications with interactive UIs.',
      difficulty: 'easy',
      category: 'WebDev'
    },
    { 
      id: 2,
      question: 'What is a React Hook?', 
      answer: 'Functions that let you use state and other React features in functional components. Examples include useState, useEffect.',
      difficulty: 'medium',
      category: 'WebDev'
    },
    { 
      id: 3,
      question: 'What does JSX stand for?', 
      answer: 'JavaScript XML is a syntax extension for JavaScript that allows you to write HTML-like code in React.',
      difficulty: 'easy',
      category: 'WebDev'
    },
    { 
      id: 4,
      question: 'What are some examples of web apps built with React?', 
      answer: 'Some examples include Facebook, Netflix, Instagram, WhatsApp Web, and Airbnb.',
      difficulty: 'easy',
      category: 'WebDev'
    },
    {
      id: 5,
      question: 'What is the largest planet in our solar system?',
      answer: 'Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.',
      difficulty: 'easy',
      category: 'General Knowledge'
    },
    {
      id: 6,
      question: 'Who painted the Mona Lisa?',
      answer: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It is housed in the Louvre Museum in Paris.',
      difficulty: 'easy',
      category: 'General Knowledge'
    },
    {
      id: 7,
      question: 'What is the speed of light in vacuum?',
      answer: 'The speed of light in vacuum is approximately 299,792,458 meters per second (or about 186,282 miles per second).',
      difficulty: 'medium',
      category: 'General Knowledge'
    },
    {
      id: 8,
      question: 'Which element has the chemical symbol "Au"?',
      answer: 'Gold has the chemical symbol "Au", which comes from the Latin word "aurum" meaning gold.',
      difficulty: 'medium',
      category: 'General Knowledge'
    },
    {
      id: 9,
      question: 'What is the capital of Australia?',
      answer: 'Canberra is the capital city of Australia, not Sydney or Melbourne as commonly thought.',
      difficulty: 'hard',
      category: 'General Knowledge'
    },
    {
      id: 10,
      question: 'What is CSS Grid?',
      answer: 'CSS Grid is a two-dimensional layout system that allows you to create complex responsive layouts with rows and columns.',
      difficulty: 'medium',
      category: 'WebDev'
    }
  ])
  
  const [currentView, setCurrentView] = useState('home')  // Changed from 'dashboard' to 'home'
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  // Fix debounce delay - reduce from 500ms to 100ms for better responsiveness
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 100) // Reduced delay from 500ms to 100ms

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  // Functions
  const addCard = (newCard) => {
    const card = {
      ...newCard,
      id: Date.now(),
      difficulty: newCard.difficulty || 'medium',
      category: newCard.category || 'General'
    }
    setCards([...cards, card])
  }

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id))
  }

  const clearAllCards = () => {
    if (window.confirm('Are you sure you want to delete all flash cards?')) {
      setCards([])
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const getStats = () => {
    const total = cards.length
    const categories = [...new Set(cards.map(card => card.category))].length
    const difficulties = {
      easy: cards.filter(card => card.difficulty === 'easy').length,
      medium: cards.filter(card => card.difficulty === 'medium').length,
      hard: cards.filter(card => card.difficulty === 'hard').length
    }
    return { total, categories, difficulties }
  }

  // Use debounced search term for filtering with improved matching
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const searchLower = debouncedSearchTerm.toLowerCase().trim()
      if (searchLower === '') return true
      
      // Full string matching instead of character-by-character
      const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0)
      
      return searchWords.every(word => {
        const questionMatch = card.question.toLowerCase().includes(word)
        const answerMatch = card.answer.toLowerCase().includes(word)
        const categoryMatch = card.category.toLowerCase().includes(word)
        const difficultyMatch = card.difficulty.toLowerCase().includes(word)
        
        return questionMatch || answerMatch || categoryMatch || difficultyMatch
      })
    })
  }, [cards, debouncedSearchTerm])

  // Enhanced search with highlights
  const highlightText = useCallback((text, searchTerm) => {
    if (!searchTerm || searchTerm.length < 1) return text // Changed from 2 to 1
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }, [])

  const getSearchResults = useCallback(() => {
    if (!debouncedSearchTerm) return { count: cards.length, type: 'all' }
    const results = filteredCards.length
    return { count: results, type: 'search' }
  }, [debouncedSearchTerm, filteredCards.length, cards.length])

  const stats = getStats()
  const categories = [...new Set(cards.map(card => card.category))]

  // Dashboard View
  const DashboardView = () => (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Welcome to FlashCards Pro</h1>
        <p className="page-subtitle">Your personalized learning companion</p>
      </div>

      <div className="dashboard-widgets">
        {/* Quick Stats Widget */}
        <div className="widget stats-widget">
          <div className="widget-header">
            <h3>📊 Learning Overview</h3>
          </div>
          <div className="widget-content">
            <div className="stat-item">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Cards</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.categories}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.difficulties.easy}</div>
              <div className="stat-label">Easy Cards</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.difficulties.medium}</div>
              <div className="stat-label">Medium Cards</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.difficulties.hard}</div>
              <div className="stat-label">Hard Cards</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Widget */}
        <div className="widget actions-widget">
          <div className="widget-header">
            <h3>⚡ Quick Actions</h3>
          </div>
          <div className="widget-content">
            <button className="action-btn primary" onClick={() => setCurrentView('add')}>
              <i className="icon">➕</i>
              <span>Add New Card</span>
            </button>
            <button 
              className="action-btn secondary" 
              onClick={() => setCurrentView('quiz')}
              disabled={cards.length === 0}
            >
              <i className="icon">🏆</i>
              <span>Start Quiz</span>
            </button>
            <button className="action-btn tertiary" onClick={() => setCurrentView('cards')}>
              <i className="icon">📚</i>
              <span>Browse Cards</span>
            </button>
          </div>
        </div>

        {/* Categories Overview Widget */}
        <div className="widget categories-widget">
          <div className="widget-header">
            <h3>📁 Categories</h3>
          </div>
          <div className="widget-content">
            {categories.length > 0 ? (
              categories.map(category => {
                const count = cards.filter(card => card.category === category).length
                return (
                  <div key={category} className="category-item">
                    <div className="category-info">
                      <span className="category-icon">
                        {category === 'WebDev' ? '💻' : category === 'General Knowledge' ? '🌍' : '📝'}
                      </span>
                      <span className="category-name">{category}</span>
                    </div>
                    <span className="category-count">{count}</span>
                  </div>
                )
              })
            ) : (
              <div className="empty-state">
                <p>No categories yet</p>
                <button 
                  className="create-btn"
                  onClick={() => setCurrentView('add')}
                >
                  Create your first card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Study Progress Widget */}
        <div className="widget progress-widget">
          <div className="widget-header">
            <h3>📈 Difficulty Distribution</h3>
          </div>
          <div className="widget-content">
            {stats.total > 0 ? (
              <>
                <div className="progress-item">
                  <div className="progress-label">
                    <span>🟢 Easy</span>
                    <span>{stats.difficulties.easy}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill easy" 
                      style={{width: `${(stats.difficulties.easy / stats.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <div className="progress-item">
                  <div className="progress-label">
                    <span>🟡 Medium</span>
                    <span>{stats.difficulties.medium}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill medium" 
                      style={{width: `${(stats.difficulties.medium / stats.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <div className="progress-item">
                  <div className="progress-label">
                    <span>🔴 Hard</span>
                    <span>{stats.difficulties.hard}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill hard" 
                      style={{width: `${(stats.difficulties.hard / stats.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No cards to analyze yet</p>
                <button 
                  className="create-btn"
                  onClick={() => setCurrentView('add')}
                >
                  Add your first card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Getting Started Widget (only show if no cards) */}
        {stats.total === 0 && (
          <div className="widget getting-started-widget">
            <div className="widget-header">
              <h3>🚀 Getting Started</h3>
            </div>
            <div className="widget-content">
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-text">
                    <h4>Create Your First Card</h4>
                    <p>Start by adding a question and answer pair</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-text">
                    <h4>Browse Your Cards</h4>
                    <p>Review and manage your flashcards</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-text">
                    <h4>Take a Quiz</h4>
                    <p>Test your knowledge with interactive quizzes</p>
                  </div>
                </div>
              </div>
              <button 
                className="get-started-btn"
                onClick={() => setCurrentView('add')}
              >
                Let's Get Started! 🎯
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Enhanced search input to handle full input on Enter key
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      setDebouncedSearchTerm(searchTerm.trim())
    }
  }

  // Handle navigation between views
  const handleNavigation = (view) => {
    const viewMapping = {
      'home': 'home',
      'add-card': 'add',
      'cards': 'cards',
      'quiz': 'quiz',
      'settings': 'settings',
      'statistics': 'statistics'
    }
    setCurrentView(viewMapping[view] || view)
  }

  // Cards View with Enhanced Search and Back Button
  const CardsView = () => {
    const searchResults = getSearchResults()
    const isSearching = searchTerm !== debouncedSearchTerm && searchTerm.length > 0
    
    // Simplified description without category filtering
    const getFilteredDescription = () => {
      if (isSearching) {
        return `Searching for "${searchTerm}"...`
      }
      
      if (debouncedSearchTerm.length > 0) {
        return `Found ${filteredCards.length} cards matching "${debouncedSearchTerm}"`
      } else {
        return `Browse all ${filteredCards.length} cards`
      }
    }
    
    const handleSearch = (searchValue) => {
      setDebouncedSearchTerm(searchValue);
    };

    return (
      <div className="cards-view">
        <button 
          className="back-btn-top-right"
          onClick={() => setCurrentView('dashboard')}
          title="Back to Dashboard"
        >
          <i className="back-icon">←</i>
          <span>Back to Dashboard</span>
        </button>
        
        <div className="cards-header">
          <div className="page-title-section">
            <h1 className="page-title">Your Flash Cards</h1>
            <p className="page-subtitle">
              {getFilteredDescription()}
            </p>
          </div>
        </div>
        
        <div className="enhanced-search-section">
          <div className="search-container">
            <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
            <div className="search-stats">
              <span className="results-count">
                {`${filteredCards.length} result${filteredCards.length !== 1 ? 's' : ''}`}
              </span>
              <button 
                className="reset-search-btn"
                onClick={() => {
                  setSearchTerm('');
                  setDebouncedSearchTerm('');
                }}
                title="Show all cards"
              >
                <span className="btn-icon">🔄</span>
                <span>Show All</span>
              </button>
            </div>
          </div>
        </div>
        
        <FlashCardList 
          cards={filteredCards} 
          deleteCard={deleteCard} 
          clearAllCards={clearAllCards}
          searchTerm={debouncedSearchTerm}
          highlightText={highlightText}
          totalCards={cards.length}
        />
      </div>
    )
  }

  // Main render
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar 
        onDarkModeToggle={toggleDarkMode}
        isDark={isDarkMode}
        currentView={currentView}
        onNavigation={handleNavigation}
      />
      
      <main className="main-content">
        <div className="container">
          {(currentView === 'home' || currentView === 'dashboard') && <DashboardView />}
          {currentView === 'cards' && <CardsView />}
          {(currentView === 'add' || currentView === 'add-card') && (
            <div className="add-card-view">
              <div className="add-card-header">
                <div className="page-title-section">
                  <h1 className="page-title">Add New Card</h1>
                  <p className="page-subtitle">Create a new flashcard to expand your knowledge</p>
                </div>
              </div>
              <FlashCardForm addCard={addCard} />
            </div>
          )}
          {currentView === 'quiz' && <Quiz cards={cards} onExit={() => handleNavigation('home')} />}
          {currentView === 'settings' && (
            <SettingsView 
              cards={cards}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              clearAllCards={clearAllCards}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
