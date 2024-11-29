A dynamic and interactive memory game built with **React** and **TypeScript**. The game fetches images and text from an external API and challenges users to click on unique cards without repeating clicks. Test your memory, track your score, and aim for the best score!

## 📝 Features

- **Scoreboard**:
  - **Current Score**: Tracks your score in the current session.
  - **Best Score**: Records the highest score you’ve achieved so far.
- **Dynamic Card Shuffle**:
  - Cards are displayed in a random order each time you click on one.
  - Cards shuffle when the game starts and after every click.
- **External API Integration**:
  - Fetches card images and information dynamically.
  - Supports APIs like [Giphy](https://developers.giphy.com/) or [PokéAPI](https://pokeapi.co/).
- **Responsive Design**:
  - Fully styled and responsive for a seamless experience on all devices.
- **Component-Based Architecture**:
  - Clean and modular React component structure for maintainability.

## 🚀 Live Demo

Check out the deployed project [here](https://memory-game-woad-psi.vercel.app/) 

## 🔧 How It Works

### Game Setup
- On mounting, the app fetches images and text from the API.
- Cards are displayed in a grid layout.

### Game Logic
1. When a user clicks a card, the app checks if it was already clicked.
2. If the card was not clicked before:
   - The current score increases.
   - The cards shuffle.
3. If the card was clicked again:
   - The current score resets.
   - The best score remains unchanged.

### Shuffling
- Cards are randomized using a shuffle function invoked after every click.

### API Integration
- The app fetches card data dynamically from an external API of your choice.
