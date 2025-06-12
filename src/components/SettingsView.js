import React from 'react';
import './SettingsView.css';

const SettingsView = ({ cards, isDarkMode, toggleDarkMode, clearAllCards }) => {
  return (
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
  );
};

export default SettingsView;