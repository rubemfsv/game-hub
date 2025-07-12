# GameHub

A lightweight PixiJS + TypeScript playground for mini-games.

[**Live Demo → game-hub-blue-rho.vercel.app**](https://game-hub-blue-rho.vercel.app/)

## Features

- 🔥 Phoenix Flame particle demo (10-sprite fire)
- 🃏 Ace of Shadows card stack (WIP)
- 💬 Magic Words RPG-style dialogue system
- Clean folder structure with absolute imports (`core`, `scenes`, `ui`, `utils`)
- Webpack 5 + ESLint + Prettier

## Quick Start

```bash
# install deps
npm install

# start dev server
npm start

# production build (outputs to public/)
npm run build
```

---
MIT © Rubem Vasconcelos

### Prerequisites

- **Node.js**: A recent LTS version (e.g., 18 or 20) is required. You can use a version manager like [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd gamehub
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm start
    ```
    The application will open automatically in your default browser at `http://localhost:8080`.

## 📜 Available Scripts

- `npm start`: Runs the application in development mode with hot-reloading.
- `npm run build`: Bundles the application for production in the `dist` folder.
- `npm run lint`: Lints all TypeScript files in the `src` directory.
- `npm run format`: Automatically formats all TypeScript files in the `src` directory.
