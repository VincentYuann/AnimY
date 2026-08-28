# AnimY

AnimY is a full-stack web application for discovering, tracking, and managing anime watchlists. Built with a React frontend, an Express backend, Supabase (PostgreSQL and Authentication), and live anime data integration via the Tenrai API (Jikan successor).

Live Demo: [anim-y.vercel.app](https://anim-y.vercel.app/)

---

## Features

- **Anime Discovery & Search**: Query titles in real-time with comprehensive filters for genres, formats, ratings, and score ranges.
- **Seasonal Explorer**: Browse current broadcasts, upcoming releases, and past seasonal archives.
- **Favorites & Watchlist**: Save and manage personal favorites synchronized with Supabase database storage.
- **Authentication & Security**: Email/password authentication, Google OAuth integration, password recovery, and client-side protected routing.
- **Modern Performance & UI**: Zero cumulative layout shift (CLS) with responsive skeleton loading, accessible controls, and component-scoped styles.

---

## Tech Stack

- **Frontend**: React 19, Vite, React Router v7, TanStack React Query v5, Supabase Client, React Hot Toast
- **Backend**: Node.js, Express 5, Axios, CORS
- **Database & Auth**: Supabase PostgreSQL with Row-Level Security (RLS), Supabase Auth
- **Data Provider**: Tenrai API (`api.tenrai.org/v1`) — high-performance successor to legacy Jikan

---

## API Architecture & Data Provider Notes

### Legacy Jikan to Tenrai Transition
The original public Jikan API is legacy and undergoing deprecation/shutdown. AnimY routes all upstream anime queries through the **Tenrai API**, a modern, high-throughput successor that maintains schema compatibility with MyAnimeList data.

### Integrating Alternative API Services
If you choose to replace Tenrai with an alternative provider (such as AniList or Kitsu), **simply changing the backend `baseURL` is not sufficient**. 
Different providers use disparate response structures (e.g., GraphQL schemas, JSON:API formats, differing pagination structures, and custom query parameter naming). To switch providers, update the data mapping layer in `backend/services/jikanService.js` to normalize the upstream responses to match AnimY's frontend expectations (`animes: [...]`, `pagination: { ... }`).

---

## Project Structure

```
AnimY/
├── backend/
│   ├── config/           # Application configuration
│   ├── routes/           # Express API endpoints
│   ├── services/         # Tenrai API integration & data processing
│   ├── server.js         # Backend server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI modules & component-scoped CSS
│   │   ├── context/      # React Auth and Favorites context providers
│   │   ├── css/          # Global styles, variables, and reset
│   │   ├── pages/        # Application views (Home, Search, Seasons, Auth, Profile)
│   │   ├── services/     # Backend API and Supabase client integration
│   │   ├── App.jsx       # Root layout & route configuration
│   │   └── main.jsx      # React DOM entry point
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account with project credentials

### Port Standards

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend** | `5173` | Standard default development port for Vite |
| **Backend** | `3000` | Standard default development port for Node.js / Express |

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VincentYuann/AnimY.git
   cd AnimY
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:

   In `frontend/.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_BACKEND_URL=http://localhost:3000
   ```

   In `backend/.env`:
   ```env
   PORT=3000
   ```

4. Start development servers:
   ```bash
   # Start backend (from /backend)
   npm run start

   # Start frontend (from /frontend)
   npm run dev
   ```

   The client application runs at `http://localhost:5173/` and communicates with the backend API on port `3000`.

---

## Developer

Developed by **Vincent Yuan**, Computer Science at Drexel University.
