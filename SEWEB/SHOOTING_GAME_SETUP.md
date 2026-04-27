# Shooting Game Component Setup Guide

## Overview
The `ShootingGame` component is a React-based game that integrates Phaser 3 for rendering and game logic. Players click on targets that match English words to earn points.

## Installation

### 1. Install Phaser 3
First, install Phaser 3 as a dependency:

```bash
npm install phaser
```

Update your `package.json` to verify:
```json
{
  "dependencies": {
    "phaser": "^3.55.2"
  }
}
```

### 2. Component Files Created
The following files have been created for the shooting game:

- **`src/components/games/ShootingGame.jsx`** - Main React component with Phaser integration
- **`src/services/gameService.js`** - API service for fetching game data
- **`src/pages/GamingPage.jsx`** - Example page demonstrating the component

## API Requirements

### Game Data Endpoint
- **URL**: `http://localhost:8082/api/games/play/1`
- **Method**: GET
- **Expected Response Format**:

```json
[
  {
    "id": 1,
    "english": "apple",
    "sinhala": "ඇපල්",
    "options": ["පෙඩ්ඩා", "ම්‍යට්‍ස්", "පෙරෙහෙර"]
  },
  {
    "id": 2,
    "english": "book",
    "sinhala": "පොත",
    "options": ["පෑස්‍ඩا", "ලිපිය", "පත්‍රිකා"]
  }
]
```

## Component Features

### Game Mechanics
1. **Word Display**: English word shown at bottom center
2. **Moving Targets**: Multiple targets with Sinhala translations move across the screen
3. **One Correct Answer**: Exactly one target has the correct Sinhala translation
4. **Shooting**: Click any target to shoot a bullet from the player base
5. **Scoring**:
   - Correct: +10 points, increment correct count
   - Wrong: Increment wrong count
6. **Auto-progression**: After hitting all targets, a new round starts automatically

### Display Elements
- **Score**: Total points earned
- **Correct Count**: Number of correct answers
- **Wrong Count**: Number of incorrect answers

## Architecture

### React Integration
- Uses `useEffect` hook for initialization and cleanup
- Phaser instance initialized once on mount
- Proper cleanup with `gameRef.current.destroy(true)` on unmount
- No React state used for animation logic (kept in Phaser scene)

### Phaser Scene Design
The `GameScene` class handles all game logic:
- **preload()**: Load assets
- **create()**: Initialize UI and game objects
- **update()**: Handle game logic each frame
  - Target movement and collision detection
  - Bullet movement
  - Hit detection
  - Score updates

### Game Logic (No React State)
All animation and game logic happens in Phaser:
- Target positions updated in `update()` loop
- Bullet trajectories calculated in Phaser scene
- Collision detection in Phaser physics system
- Score/stats stored in scene properties

## Usage

### Basic Implementation
```jsx
import { ShootingGame } from './components/games/ShootingGame';

function App() {
  return <ShootingGame />;
}
```

### With Dashboard
```jsx
import { ShootingGame } from '../components/games/ShootingGame';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function GamingPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <ShootingGame />
    </DashboardLayout>
  );
}
```

## Customization

### Adjust Game Difficulty
Edit `ShootingGame.jsx` in the `startRound()` method:

```javascript
// Change number of targets
const targetCount = 4; // Default is 4

// Adjust target speed
target.vx = (Math.random() - 0.5) * 5; // Increase multiplier for faster movement
target.vy = (Math.random() - 0.5) * 3;

// Change bullet speed
bullet.speed = 10; // Default is 8
```

### Modify Game Area
Edit the `config` object:

```javascript
const config = {
  width: 1200,   // Game width in pixels
  height: 700,   // Game height in pixels
  // ...
};
```

### Adjust Scoring
In the `update()` method, collision section:

```javascript
if (bullet.target.isCorrect) {
  this.score += 20;  // Change points per correct answer
  this.correctCount += 1;
}
```

## Troubleshooting

### Game Not Loading
1. Ensure Phaser is installed: `npm install phaser`
2. Check API endpoint is running on `http://localhost:8082`
3. Verify game data format matches expected structure
4. Check browser console for errors

### Targets Not Moving
- Verify the `update()` method is being called
- Check target velocity values are not zero

### Bullets Not Showing
- Ensure the bullet graphics are being created
- Check z-index and rendering order

### Performance Issues
- Reduce number of targets in `startRound()`
- Optimize Phaser rendering settings
- Consider using Phaser's built-in object pools for bullets

## API Service

The `gameService` provides two main methods:

```javascript
// Fetch game data
const gameData = await gameService.getGameData(1);

// Submit game results (optional)
await gameService.submitGameResult(gameId, score, correctCount, wrongCount);
```

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes
- Phaser handles all rendering
- React only handles component mount/unmount
- All game logic isolated in Phaser scene
- Minimal re-renders for optimal performance

## Future Enhancements
- Add power-ups
- Difficulty levels
- Multiplayer mode
- Sound effects
- Particle effects on hits
- Leaderboard integration
- Game statistics tracking
