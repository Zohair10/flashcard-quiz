// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';  // Add this import

export default function Navbar({ onDarkModeToggle, isDark, currentView, onNavigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'cards', label: 'Cards', icon: '📚' },
    { id: 'add-card', label: 'Add Card', icon: '➕' },
    { id: 'quiz', label: 'Quiz', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleNavClick = (viewId) => {
    if (onNavigation) {
      onNavigation(viewId);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-brand" 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
        >
          <span role="img" aria-label="brain">🧠</span> 
          <span className="brand-text">FlashCards Pro</span>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <button 
            className="dark-mode-toggle" 
            onClick={onDarkModeToggle}
            aria-label="Toggle dark mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
        
        <button 
          className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
