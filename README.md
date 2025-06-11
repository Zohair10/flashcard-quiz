# 🧠 Flash Card Quiz App

A modern, responsive web application for creating and studying with interactive flash cards. Built with React and featuring a clean, glassmorphism-inspired UI with smooth animations.

## ✨ Features

- **📚 Study Mode**: Create and manage flash cards with smooth 3D flip animations
- **🎯 Quiz Mode**: Test your knowledge with randomized questions and self-assessment
- **📱 Fully Responsive**: Perfect experience on desktop, tablet, and mobile devices
- **🎨 Modern Design**: Glassmorphism UI with gradient backgrounds and blur effects
- **⚡ Smooth Animations**: Card flips, hover effects, and page transitions
- **📊 Progress Tracking**: Real-time score tracking and progress visualization
- **🔤 Typography**: Clean Inter font for optimal readability
- **♿ Accessible**: Proper focus states and keyboard navigation

## 🚀 Quick Start

## [View Live App on Vercel](https://flashcard-quizapp.vercel.app/)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd flashcard-quiz

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npx serve -s build
```

## 🎮 How to Use

### 📖 Study Mode

1. **Add Cards**: Fill out the question and answer form
2. **View Library**: Browse your cards in a responsive grid
3. **Interactive Learning**: Click any card to flip and reveal the answer
4. **Manage Collection**: Clear all cards when needed

### 🏆 Quiz Mode

1. **Start Quiz**: Click "Start Quiz" (requires at least one card)
2. **Think & Answer**: Read questions and formulate your answer
3. **Reveal & Check**: Show the answer and self-assess
4. **Track Progress**: Watch your score and progress bar
5. **Complete & Review**: Get final results with percentage score
6. **Retake**: Shuffle and restart the quiz anytime

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FlashCardForm.js     # Card creation form
│   ├── FlashCardForm.css    # Form styling
│   ├── FlashCardList.js     # Card display grid
│   ├── FlashCardList.css    # Card animations & layout
│   ├── Quiz.js              # Quiz functionality
│   └── Quiz.css             # Quiz interface styling
├── App.js                   # Main application component
├── App.css                  # Global app styling
├── index.js                 # React DOM entry point
└── index.css                # Global CSS reset & utilities
```

## 🛠️ Tech Stack

- **React 19.1** - Modern React with hooks
- **CSS3** - Advanced styling (Grid, Flexbox, Backdrop Filter)
- **Bootstrap Icons** - Icon library
- **Google Fonts (Inter)** - Typography
- **Create React App** - Build tooling

## 🎨 Design System

### Color Palette

- **Primary Gradient**: `#667eea` → `#764ba2`
- **Success Gradient**: `#10b981` → `#059669`
- **Background**: `#f5f7fa` → `#c3cfe2`
- **Text**: `#374151`, `#64748b`, `#9ca3af`

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive scaling**: 16px → 15px → 14px

### Components

- **Glassmorphism Cards**: `backdrop-filter: blur(20px)`
- **3D Flip Animation**: `transform: rotateY(180deg)`
- **Smooth Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Customization

### Sample Cards

Update initial cards in `App.js`:

```javascript
const [cards, setCards] = useState([
  { question: "What is React?", answer: "A JavaScript library..." },
  // Add your cards here
]);
```

### Styling

- **Global styles**: `src/index.css`
- **App layout**: `src/App.css`
- **Components**: `src/components/*.css`

### Colors

Modify CSS custom properties in component files for consistent theming.

## 🚨 Troubleshooting

**Development server won't start:**

- Verify Node.js version: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Styling not loading:**

- Hard refresh browser: `Ctrl+F5` / `Cmd+Shift+R`
- Check browser console for errors
- Verify CSS imports in components

**Poor performance:**

- Use production build: `npm run build`
- Check React DevTools for unnecessary re-renders

## 📈 Performance Features

- **Optimized animations** with `transform` and `opacity`
- **Efficient state management** avoiding unnecessary re-renders
- **CSS-only animations** for better performance
- **Responsive images** and optimized assets

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

---

**🚀 Built with modern React and CSS3 • Perfect for learning and productivity**
