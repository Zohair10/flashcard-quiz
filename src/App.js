import React, { useState, useEffect, useMemo, useCallback } from 'react'
import FlashCardList from './components/FlashCardList'
import FlashCardForm from './components/FlashCardForm'
import Quiz from './components/Quiz'
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
  
  const [currentView, setCurrentView] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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
      
      // More comprehensive search matching
      const questionMatch = card.question.toLowerCase().includes(searchLower)
      const answerMatch = card.answer.toLowerCase().includes(searchLower)
      const categoryMatch = card.category.toLowerCase().includes(searchLower)
      const difficultyMatch = card.difficulty.toLowerCase().includes(searchLower)
      
      const matchesSearch = questionMatch || answerMatch || categoryMatch || difficultyMatch
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [cards, debouncedSearchTerm, selectedCategory])

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

  // Modern Navbar Component
  const Navbar = () => (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">🧠</div>
          <span className="brand-text">FlashCards Pro</span>
        </div>
        
        <div className="navbar-menu">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <i className="icon">📊</i>
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'cards' ? 'active' : ''}`}
            onClick={() => setCurrentView('cards')}
          >
            <i className="icon">📚</i>
            <span>Cards</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'add' ? 'active' : ''}`}
            onClick={() => setCurrentView('add')}
          >
            <i className="icon">➕</i>
            <span>Add Card</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={() => setCurrentView('quiz')}
          >
            <i className="icon">🏆</i>
            <span>Quiz</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            <i className="icon">⚙️</i>
            <span>Settings</span>
          </button>
        </div>

        <div className="navbar-actions">
          <button className="search-btn" onClick={() => setCurrentView('cards')}>
            <i className="icon">🔍</i>
          </button>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            <i className="icon">{isDarkMode ? '☀️' : '🌙'}</i>
          </button>
        </div>
      </div>
    </nav>
  )

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
            <h3>📊 Quick Stats</h3>
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
              <div className="stat-number">{stats.difficulties.easy + stats.difficulties.medium + stats.difficulties.hard}</div>
              <div className="stat-label">Ready to Study</div>
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

        {/* Progress Widget */}
        <div className="widget progress-widget">
          <div className="widget-header">
            <h3>📈 Study Progress</h3>
          </div>
          <div className="widget-content">
            <div className="progress-item">
              <div className="progress-label">
                <span>Easy Cards</span>
                <span>{stats.difficulties.easy}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill easy" 
                  style={{width: `${(stats.difficulties.easy / Math.max(stats.total, 1)) * 100}%`}}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span>Medium Cards</span>
                <span>{stats.difficulties.medium}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill medium" 
                  style={{width: `${(stats.difficulties.medium / Math.max(stats.total, 1)) * 100}%`}}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span>Hard Cards</span>
                <span>{stats.difficulties.hard}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill hard" 
                  style={{width: `${(stats.difficulties.hard / Math.max(stats.total, 1)) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Widget */}
        <div className="widget activity-widget">
          <div className="widget-header">
            <h3>🔥 Recent Activity</h3>
          </div>
          <div className="widget-content">
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-text">
                <div>Last card added</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🏆</div>
              <div className="activity-text">
                <div>Quiz completed</div>
                <div className="activity-time">Yesterday</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📚</div>
              <div className="activity-text">
                <div>Study session</div>
                <div className="activity-time">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Cards View with Enhanced Search and Back Button
  const CardsView = () => {
    const searchResults = getSearchResults()
    const isSearching = searchTerm !== debouncedSearchTerm && searchTerm.length > 0
    
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
              {isSearching 
                ? `Searching for "${searchTerm}"...`
                : searchResults.type === 'search' 
                  ? `Found ${searchResults.count} cards matching "${debouncedSearchTerm}"`
                  : `Browse all ${searchResults.count} cards`
              }
            </p>
          </div>
        </div>
        
        <div className="enhanced-search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by question, answer, category, or difficulty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`enhanced-search-input ${isSearching ? 'searching' : ''}`}
              />
              <div className="search-icons">
                {isSearching ? (
                  <div className="search-loading">⏳</div>
                ) : (
                  <i className="search-icon">🔍</i>
                )}
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => {
                      setSearchTerm('')
                      setDebouncedSearchTerm('')
                    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <div className="search-filters">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="enhanced-category-filter"
              >
                <option value="all">📁 All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'WebDev' ? '💻' : '🌍'} {category}
                  </option>
                ))}
              </select>
              
              <div className="search-stats">
                <span className="results-count">
                  {isSearching ? 'Searching...' : `${filteredCards.length} result${filteredCards.length !== 1 ? 's' : ''}`}
                </span>
              </div>
            </div>
          </div>
          
          {searchTerm && !isSearching && (
            <div className="search-suggestions">
              <div className="suggestion-label">💡 Quick suggestions:</div>
              <div className="suggestion-tags">
                <button 
                  className="suggestion-tag"
                  onClick={() => setSearchTerm('React')}
                >
                  React
                </button>
                <button 
                  className="suggestion-tag"
                  onClick={() => setSearchTerm('easy')}
                >
                  Easy questions
                </button>
                <button 
                  className="suggestion-tag"
                  onClick={() => setSearchTerm('WebDev')}
                >
                  Web Development
                </button>
                <button 
                  className="suggestion-tag"
                  onClick={() => setSearchTerm('General Knowledge')}
                >
                  General Knowledge
                </button>
              </div>
            </div>
          )}
        </div>
        
        <FlashCardList 
          cards={filteredCards} 
          deleteCard={deleteCard} 
          clearAllCards={clearAllCards}
          searchTerm={debouncedSearchTerm}
          highlightText={highlightText}
        />
      </div>
    )
  }

  // Settings View
  const SettingsView = () => (
    <div className="settings-view">
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your learning experience</p>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <h3>🎨 Appearance</h3>
          <div className="setting-item">
            <label>Dark Mode</label>
            <button 
              className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
            >
              <div className="toggle-slider"></div>
            </button>
          </div>
        </div>

        <div className="setting-group">
          <h3>📊 Data Management</h3>
          <div className="setting-item">
            <label>Total Cards: {cards.length}</label>
            <button className="danger-btn" onClick={clearAllCards}>
              Clear All Cards
            </button>
          </div>
        </div>

        <div className="setting-group">
          <h3>🏆 Quiz Settings</h3>
          <div className="setting-item">
            <label>Default Quiz Length</label>
            <select className="setting-select">
              <option>5 cards</option>
              <option>10 cards</option>
              <option>All cards</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  // Main render
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar />
      
      <main className="main-content">
        <div className="container">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'cards' && <CardsView />}
          {currentView === 'add' && (
            <div className="add-card-view">
              <button 
                className="back-btn-top-right"
                onClick={() => setCurrentView('dashboard')}
                title="Back to Dashboard"
              >
                <i className="back-icon">←</i>
                <span>Back to Dashboard</span>
              </button>
              
              <div className="add-card-header">
                <div className="page-title-section">
                  <h1 className="page-title">Add New Card</h1>
                  <p className="page-subtitle">Create a new flashcard to expand your knowledge</p>
                </div>
              </div>
              <FlashCardForm addCard={addCard} />
            </div>
          )}
          {currentView === 'quiz' && <Quiz cards={cards} onExit={() => setCurrentView('dashboard')} />}
          {currentView === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  )
}

export default App
