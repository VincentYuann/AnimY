# 🎌 AnimY

**AnimY** is a full-stack anime tracking web app for fans who want a clean way to search titles, save favorites, and discover what to watch next. It combines a modern React frontend, an Express backend, PostgreSQL via Supabase, and live anime data from the Jikan API. [page:2]

## ✨ Live Demo

🔗 [Visit AnimY](https://anim-y.vercel.app/) [page:2]

## 🌟 Features

- 🔎 **Anime Discovery** — Search a wide range of anime titles using real-time data from the Jikan API. [page:2]
- ❤️ **Favorites Management** — Save and manage a personal list of favorite anime. [page:2]
- 💻 **Dynamic UI** — Browse through a responsive, user-friendly interface built for smooth exploration. [page:2]
- 🗄️ **Persistent Storage** — Store application data with PostgreSQL through Supabase. [page:2]
- 🔐 **Secure Data Access** — Protect user data with Supabase Row-Level Security policies. [page:2]

## 🛠️ Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React [page:2]                   |
| Backend  | Express.js [page:2]              |
| Database | PostgreSQL via Supabase [page:2] |
| API      | Jikan API [page:2]               |

## 🧠 Technical Highlights

- 🧩 **Modular Architecture** — Organized into separate frontend and backend folders for cleaner development. [page:2]
- ⚛️ **Modern React Patterns** — Uses functional components and hooks for state management. [page:2]
- 🚏 **Backend Routing** — Express handles API routing and server-side logic. [page:2]
- 🔒 **Privacy-Focused Setup** — Supabase RLS helps keep user data private and secure. [page:2]

## 📁 Project Structure

```bash
AnimY/
├── backend/
├── frontend/
├── .gitignore
├── README
└── package-lock.json
```

The repository is structured to keep the frontend and backend clearly separated, making the project easier to maintain and expand. [page:2]

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VincentYuann/AnimY.git
cd AnimY
```

### 2. Install dependencies

Install packages in each app folder if the frontend and backend are managed separately.

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Add environment variables

Create environment files for the services your app uses. A typical setup may include values like these:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

### 4. Start the app

```bash
# frontend
cd frontend
npm run dev

# backend
cd backend
npm start
```

Update these commands if your actual package scripts are different.

## 🎯 Purpose

AnimY was built as a personal project centered on anime discovery and list management in one streamlined experience. The repository presents it as a full-stack app that showcases modern web development tools and practical API integration. [page:2]

## 🔮 Future Ideas

- 👤 User authentication and profiles.
- 💖 Like status for favorites.
- ⭐ Ratings, reviews, and recommendations.
- 🎨 More UI polish, animations, and mobile optimization.
- 🧭 Better filtering by genre, score, season, and popularity.

## 👨‍💻 Developer

Developed by **Vincent Yuan**, a Computer Science student at Drexel University. The project highlights full-stack development with React, Express, Supabase, and anime data integration. [page:2]
