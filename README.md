# Minesweeper

## Installation

The project is using yarn workspaces, run `yarn` from the root of the project

## Starting

Run `yarn start`, this should start the API and UI

## Usage

### Create a game

Choose the width and height of your minesweeper game and create it

### Name your player

Enter your player name and continue

### Invite other players

In another tab or brower, copy the URL and send it to someone - they will need to enter their name and continue

### Sweep those mines

Click on a cell to reveal the value, for ease and simplicity polling (every 2s) was used to enable viewing new players and player moves

## Improvements

- Improved styling
- Use subscriptions
- Animations for cell value appearing
- Better rules around game state e.g winners/losers
