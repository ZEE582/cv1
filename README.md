# CV Project Overview

## Project Structure
```
CV/
├─ client/               # Front‑end (React + Vite)
│   ├─ public/          # Static assets
│   ├─ src/             # Source code (components, pages, utils)
│   ├─ .gitignore       # Front‑end ignore rules
│   ├─ package.json     # Front‑end dependencies & scripts
│   └─ ...
│
├─ server/               # Back‑end (Node.js + Express)
│   ├─ config/          # Configuration files (env, DB, JWT)
│   ├─ models/          # Data models
│   ├─ routes/          # API routes
│   ├─ .gitignore       # Back‑end ignore rules
│   ├─ package.json     # Back‑end dependencies & scripts
│   └─ server.js        # Entry point
│
├─ .gitignore           # Root ignore (node_modules, env files, build artefacts)
└─ README.md            # **This file** – project documentation
```

## Getting Started
### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ZEE582/cv1.git
cd cv1

# Set up the client (frontend)
cd client
npm install   # or `yarn`
cp .env.example .env   # if applicable

# Set up the server (backend)
cd ../server
npm install
cp .env.example .env   # configure DB, JWT secrets, etc.
```

## Running the Application
```bash
# In one terminal – start the backend
cd server && npm run dev   # or `npm start` for production

# In another terminal – start the frontend
cd ../client && npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:5000` (or as configured in `.env`).

## Contributing
- Create a feature branch from `main`.
- Follow the existing coding style.
- Do **not** commit `.env` files; they are ignored via `.gitignore`.
- Open a Pull Request targeting the appropriate base branch.

## License
MIT License – see the `LICENSE` file.
