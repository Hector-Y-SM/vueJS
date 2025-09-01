# Vue RPG Battle Game

A simple 2-player turn-based RPG battle game built with Vue 3 and TypeScript.

## Game Description

This is a turn-based RPG battle game where two players face off against each other. Each player has:

- 100 health points
- 7 healing potions
- 5 special attacks 

### Game Features

- **Turn System**: Players alternate turns to perform actions
- **Combat Actions**:
  - Basic Attack (10 damage, higher hit probability)
  - Special Attack (20 damage, lower hit probability, limited to 5 uses)
  - Heal (Recovers 10 HP, limited to 7 uses)
- **Battle Mechanics**: 
  - Random hit probability for attacks
  - Turn management system
  - Health tracking
  - Resource management (healing potions and special attacks)

## Technical Stack

- Vue 3
- TypeScript
- Tailwind CSS
- Vite

## Project Setup

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
