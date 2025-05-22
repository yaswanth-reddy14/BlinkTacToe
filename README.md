# Blink Tac Toe 

A unique twist on the classic Tic Tac Toe game where emojis appear and disappear! Built with React and modern web technologies.

##  Features

- **Dynamic Emoji Categories**: Players choose from 6 themed categories:
  -  Animals: 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨
  -  Food: 🍕 🍔 🍟 🌭 🍿 🧁 🍩 🍦 🍓
  -  Sports: ⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓
  -  Nature: 🌸 🌹 🌺 🌻 🌴 🌵 🍄 🌍 ⭐
  -  Travel: ✈️ 🚗 🚂 🚢 🚁 🏖️ 🗽 🗿 🏰
  -  Faces: 😀 😎 🤔 😍 🥳 😴 🤯 😇 🥺

- **Vanishing Mechanic**: Each player can only have 3 emojis on the board at once. When placing a 4th emoji, the oldest one disappears (FIFO - First In, First Out). This creates an interesting strategic element where players must consider both placement and timing.

## Tech Stack

- **React 18**: Built with functional components and modern hooks
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and beautiful UI design
- **Vite**: For fast development and optimized builds
- **Lucide React**: For minimal, beautiful icons

##  Implementation Details

### Vanishing Feature Implementation

The vanishing mechanic is implemented through:

1. **Timestamp Tracking**: Each placed emoji stores its placement timestamp
2. **FIFO Queue**: Player emojis are managed in an array with position and timestamp
3. **Automatic Removal**: When placing a 4th emoji:
   - The oldest emoji is identified by timestamp
   - Removed from both the board and player's emoji array
   - The cell becomes available again

Key code from `gameLogic.ts`:
```typescript
if (newPlayerEmojis[currentPlayer].length >= 3) {
  const oldestIndex = getOldestEmojiIndex(newPlayerEmojis[currentPlayer]);
  if (oldestIndex !== -1) {
    const oldestPosition = newPlayerEmojis[currentPlayer][oldestIndex].position;
    newBoard[oldestPosition] = null;
    newPlayerEmojis[currentPlayer].splice(oldestIndex, 1);
  }
}
```

##  Future Improvements

Given more time, these features would enhance the game:

1. **Online Multiplayer**
   - Real-time gameplay using WebSocket
   - Player matchmaking
   - Game rooms

2. **Enhanced Animations**
   - Smooth transitions for emoji placement/removal
   - Victory line animations
   - Category selection effects

3. **Game Modes**
   - Single-player vs AI
   - Custom emoji category creation
   - Timed matches

4. **Persistence**
   - Save game statistics
   - Player profiles
   - Achievement system

5. **Accessibility**
   - Screen reader support
   - Keyboard navigation
   - High contrast mode

##  How to Play

1. Each player selects an emoji category
2. Take turns placing emojis on the 3x3 grid
3. Remember: only 3 emojis per player can exist at once
4. Win by getting 3 of your emojis in a line
5. Strategic timing of emoji placement is key!

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
