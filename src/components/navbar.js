// src/components/Navbar.js
import React, { useState } from 'react';

export default function Navbar({ onDarkModeToggle, isDark, currentView, onNavigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'add-card', label: 'Add Card', icon: '➕' },
    { id: 'quiz', label: 'Quiz', icon: '🏆' },
    { id: 'statistics', label: 'Statistics', icon: '📊' },
  ];

  const handleNavClick = (viewId) => {
    if (onNavigation) {
      onNavigation(viewId);
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <span role="img" aria-label="brain">🧠</span> 
          <span className="brand-text">FlashCards Pro</span>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.id} className={currentView === item.id ? 'active' : ''}>
                <button 
                  onClick={() => handleNavClick(item.id)}
                  className="nav-link-btn"
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="navbar-actions">
            <button 
              className="dark-mode-toggle" 
              onClick={onDarkModeToggle}
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
            </button>
          </div>
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
