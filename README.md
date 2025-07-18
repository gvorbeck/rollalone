# Roll Alone

**Your complete toolkit for solo tabletop RPG adventures**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-rollal.one-blue?style=for-the-badge)](https://rollal.one)
[![License](https://img.shields.io/badge/License-Mixed-orange?style=for-the-badge)](./LICENSE)
[![Built with](https://img.shields.io/badge/Built_with-React_+_TypeScript-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

## 🎯 What is Roll Alone?

Roll Alone is a digital adaptation and extension of Karl Hendricks' **One Page Solo Engine** (OPSE), designed to provide everything you need to run solo tabletop RPG adventures. This web-based tool eliminates the need for a Game Master by providing oracles, generators, and decision-making tools that work with any TTRPG system.

### ✨ Key Features

#### 🎲 **Advanced Dice Roller**

- **Complex expressions** - Roll `2d6+1d4`, `1d20+3d6-2`, or any combination
- **Keep highest/lowest** - Use `4d6kh3` or `2d20kl1` for advantage/disadvantage
- **Professional SVG icons** - Beautiful dice representations for d4, d6, d8, d10, d12, d20
- **Detailed breakdowns** - See individual rolls and calculations

#### 🃏 **Playing Card System**

- **Full 54-card deck** - Standard deck plus jokers with suit meanings
- **Persistent state** - Deck remembers what's been drawn across sessions
- **Automatic reshuffling** - Deck reshuffles when empty or joker is drawn
- **Suit domains** - ♠ Physical, ♦ Technical, ♣ Mystical, ♥ Social interpretations
- **Random events** - Jokers trigger automatic reshuffle + random event generation

#### 📋 **Smart Navigation**

- **Floating Table of Contents** - Quick access to any card with organized sections
- **Intelligent positioning** - Three floating action buttons that never overlap
- **Smart scrolling** - Instantly jump to any oracle, generator, or reference card
- **One-click access** - Everything you need is just a click away

#### 🧭 **Complete Oracle System**

- **Yes/No Oracle** - Likelihood-based answers with modifiers
- **How Oracle** - Intensity and quality determination
- **Focus Oracles** - Action, Detail, and Topic focus tables
- **Internal linking** - Seamless navigation between related oracle content

#### 🏰 **Adventure Generators**

- **Plot hooks** - Generate objectives, adversaries, and rewards
- **NPC Generator** - Create memorable characters with goals and secrets
- **Dungeon Crawler** - Room-by-room exploration with encounters
- **Hex Crawler** - Overland exploration with terrain generation
- **Generic Generator** - Universal tool for any game element

#### 🎭 **GM Moves & Story Tools**

- **Pacing Moves** - Keep the action moving during lulls
- **Failure Moves** - Turn setbacks into story opportunities
- **Random Events** - Combine Action + Topic Focus for surprises
- **Scene Setting** - Complications and alterations for any situation

#### 💻 **Modern Web Experience**

- **🌙 Dark Theme** - Optimized for extended gaming sessions
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **⚡ No Installation** - Browser-based, works offline after first load
- **🎨 Professional UI** - Clean, intuitive interface with smooth animations

## 🚀 Live Site

Visit **[rollal.one](https://rollal.one)** to start your solo RPG adventure immediately!

## ⚡ Technical Highlights

### 🎯 **Production-Ready Quality**

- **184 passing tests** with comprehensive coverage including unit, integration, and accessibility tests
- **Zero build warnings** with strict TypeScript configuration
- **Optimized bundle** - Only 73KB gzipped for the entire application
- **Accessibility compliant** with proper ARIA attributes and keyboard navigation

### 🔧 **Advanced Features**

- **Custom dice engine** that parses complex expressions like `2d6+1d4+3`
- **Persistent state management** using localStorage for card deck and preferences
- **Smart UI patterns** with mutually exclusive floating action buttons
- **Responsive masonry layout** with CSS Grid fallback for broad browser support
- **Error boundaries** with graceful fallback handling

### 🎨 **Design System**

- **Design tokens** for consistent styling across components
- **Professional SVG icons** replacing emoji for crisp rendering
- **Smooth animations** with CSS transitions and transforms
- **Dark theme optimization** for extended gaming sessions

## 🎮 How to Use

Roll Alone features three floating action buttons in the bottom-right corner for instant access to all tools:

### 🎲 **Dice Roller** (Red Button)

- **Simple rolls**: Type `d20`, `3d6`, or `2d10+5`
- **Complex expressions**: Use `2d6+1d4+3` or `1d20+2d6-1`
- **Advantage/Disadvantage**: Try `2d20kh1` (keep highest) or `2d20kl1` (keep lowest)
- **Results show**: Individual rolls, modifiers, and final total

### 🃏 **Card Drawer** (Red Button, Middle)

- **Draw cards** for inspiration using the SUIT DOMAIN system
- **Persistent deck** remembers your progress across sessions
- **Jokers** automatically reshuffle and trigger random events
- **Card meanings** combine rank with suit for rich interpretation

### 📋 **Table of Contents** (Blue Button, Left)

- **Quick navigation** to any card with organized sections:
  - **Core Gameplay** - Rules, references, and tips
  - **Oracles & Decisions** - Yes/No, How, and Focus oracles
  - **Scene & Story** - Plot hooks, GM moves, and events
  - **Characters & Generators** - NPCs and universal generators
  - **Exploration** - Dungeon and hex crawling tools

### 🎯 **Getting Started**

1. **Start with "How to Play"** - Get oriented with the basic mechanics
2. **Try the dice roller** - Roll `2d6` or `1d20` to get comfortable
3. **Draw a card** - See how the suit domain system works
4. **Use the Oracles** - Ask yes/no questions or get directional guidance
5. **Generate Content** - Create NPCs, plot hooks, or dungeon rooms on demand
6. **Explore & Crawl** - Use the exploration tools for structured adventures

### 🎯 Target Audience

This tool is designed for:

- **Experienced Solo RPG Players** - Familiar with GM-less gaming concepts
- **TTRPG Veterans** - Comfortable with any tabletop RPG system
- **Busy Gamers** - Want to play without scheduling group sessions
- **Story Explorers** - Enjoy emergent narrative and surprise discoveries

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/gvorbeck/rollalone.git
cd rollalone

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (184 tests)
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Project Structure

```
src/
├── components/          # React components
│   ├── content/        # Card content renderers (text, tables, dice)
│   ├── Card.tsx        # Unified card component with multiple table support
│   ├── DiceRoller.tsx  # Advanced dice rolling with complex expressions
│   ├── CardDrawer.tsx  # Playing card system with persistence
│   ├── TableOfContents.tsx  # Smart navigation and quick access
│   └── ...
├── contexts/           # React Context providers
│   └── FABContext.tsx  # Floating Action Button state management
├── data/               # Game content and definitions
│   ├── definitions.ts  # TypeScript interfaces and types
│   └── cards/          # Individual card data (oracles, generators, etc.)
├── styles/             # Design tokens and styling system
│   └── tokens.ts       # Centralized design system
├── utils/              # Helper functions and utilities
│   ├── diceRoller.ts   # Custom dice engine with complex expression support
│   ├── cardDrawer.ts   # Card deck management with persistence
│   └── ...
└── test/               # Testing utilities and setup
```

### Tech Stack

- **React 19** - Modern UI framework with latest features
- **TypeScript** - Full type safety and excellent developer experience
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Vitest** - Comprehensive testing with 184 passing tests
- **ESLint** - Code quality and consistency enforcement
- **Custom Dice Engine** - Lightweight, supports complex expressions
- **localStorage** - Persistent card deck and user preferences

## 📜 License & Attribution

This project uses a **mixed licensing approach**:

- **Roll Alone additions** (original content, code, design) - Personal use only
- **One Page Solo Engine content** - [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (original work by Karl Hendricks)

### 🙏 Acknowledgements

- **[Karl Hendricks (Inflatable Studios)](https://inflatablestudios.itch.io/)** - Creator of the original One Page Solo Engine
- **[Garrett Vorbeck](https://github.com/gvorbeck)** - Digital adaptation and Roll Alone enhancements

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome! Please open an issue to discuss any ideas or improvements.

## 🔗 Links

- **Live Site**: [rollal.one](https://rollal.one)
- **Original OPSE**: [Inflatable Studios on itch.io](https://inflatablestudios.itch.io/)
- **Repository**: [github.com/gvorbeck/rollalone](https://github.com/gvorbeck/rollalone)

---

**Roll your dice, trust the oracles, and embark on solo adventures!** 🎲✨
