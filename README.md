# CV Project (React + TypeScript + Vite + Express)

## Overview
This repository contains a full‑stack web application consisting of a **frontend** built with React, TypeScript, and Vite, and a **backend** built with Node.js, Express, and MongoDB (or any preferred DB). The project follows a clean separation of concerns, making it easy to develop, test, and merge with other branches.

## Directory Structure
```
CV/
├─ backend/               # Server‑side code (Express API)
│   ├─ config/            # Configuration files (e.g., DB, JWT)
│   ├─ data/              # Sample data / seed files
│   ├─ .env               # Environment variables (ignored in Git)
│   ├─ package.json       # Backend dependencies & scripts
│   └─ server.js          # Entry point for the API
│
├─ frontend/              # Client‑side code (React + Vite)
│   ├─ public/            # Static assets (favicon, index.html)
│   ├─ src/               # Source code
│   │   ├─ components/    # Reusable UI components
│   │   ├─ contexts/      # React context providers
│   │   ├─ pages/         # Page components (routes)
│   │   ├─ utils/         # Helper functions
│   │   ├─ App.tsx        # Root component
│   │   └─ main.tsx       # Vite entry point
│   ├─ .env               # Frontend env (ignored in Git)
│   ├─ package.json       # Frontend dependencies & scripts
│   ├─ postcss.config.js  # PostCSS configuration
│   ├─ tailwind.config.js # Tailwind CSS configuration
│   └─ vite.config.ts     # Vite configuration
│
├─ .gitignore            # Ignored files (node_modules, .env, build, etc.)
└─ README.md              # Project documentation (this file)
```

## Backend
- **Language / Runtime**: Node.js (v18+)
- **Framework**: Express
- **Key Packages**: `express`, `mongoose` (or any DB driver), `jsonwebtoken`, `swagger-ui-express`
- **Scripts**:
  ```bash
  # Install dependencies
  cd backend && npm install

  # Start the server (development)
  npm run dev   # uses nodemon if configured

  # Start the server (production)
  npm start
  ```

## Frontend
- **Language / Runtime**: TypeScript, React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Key Packages**: `react`, `react-dom`, `react-router-dom`, `axios`
- **Scripts**:
  ```bash
  # Install dependencies
  cd frontend && npm install

  # Development server with hot‑module replacement
  npm run dev

  # Build for production
  npm run build

  # Preview the production build
  npm run preview
  ```

## Installation (Full Stack)
1. **Clone the repository**
   ```bash
   git clone https://github.com/ZEE582/cv1.git
   cd cv1
   ```
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cp .env.example .env   # Fill in your environment variables
   ```
3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env   # If needed
   ```
4. **Run both services** (in separate terminals)
   ```bash
   # Terminal 1 – Backend
   cd backend && npm run dev

   # Terminal 2 – Frontend
   cd frontend && npm run dev
   ```

## Contributing
- Create a feature branch from `main`.
- Follow the existing coding style and run `npm run lint` before committing.
- Ensure you do **not** commit `.env` files; they are ignored via `.gitignore`.
- Open a Pull Request targeting the appropriate base branch (`main`, `Sura`, `NadaNour`, etc.).

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
