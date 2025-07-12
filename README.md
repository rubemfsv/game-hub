# GameHub

A lightweight PixiJS + TypeScript playground for mini-games.

[**Live Demo → game-hub-blue-rho.vercel.app**](https://game-hub-blue-rho.vercel.app/)

## Features

- 🃏 Ace of Shadows card stack (WIP)
- 💬 Magic Words RPG-style dialogue system
- 🔥 Phoenix Flame particle demo (10-sprite fire)
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

## Assets Credits

- **Fire sprites**: [Kenney Particle Pack](http://kenney.nl/assets/smoke-particles) — CC0.
- **Parallax space background**: Artwork by Luis Zuno ([@ansimuz](https://twitter.com/ansimuz)) — CC0. More resources at <https://ansimuz.com>.


### Prerequisites

- **Node.js**: A recent LTS version (e.g., 18, 20, or 22) is required. You can use a version manager like [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions.

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
