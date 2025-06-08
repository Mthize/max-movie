🎬 MovieFinder App
 A sleek and responsive React-based movie discovery application that helps users find trending and popular movies using The Movie Database (TMDb) API. Users can search for movies and view current trending titles stored via    Appwrite.

🚀 Features
🔍 Live Search with debounce functionality

🎞️ Trending Movies section powered by Appwrite

🎬 Popular Movies listing using TMDb API

⚡ Fast UX with spinner-based loading state

🧠 Debounced API calls to avoid unnecessary requests

💾 Search count tracking using Appwrite

🛠️ Tech Stack
Frontend: React, TailwindCSS (if used in styles)

APIs: TMDb (The Movie Database API), Appwrite (for trending movies and tracking)

Utilities: react-use for debouncing

📦 Installation
Clone this repo

git clone https://github.com/Mthize/max-movie.git
cd max-movie
Install dependencies


npm install
Setup environment variables
Create a .env file in the root directory and add your TMDb API Key:

ini
VITE_TMDB_API_KEY=your_tmdb_api_key
Run the app locally


npm run dev
🌐 API Setup
🔑 TMDb API
Sign up at TMDb

Generate a Bearer Token (read access to account)

Add it to your .env as shown above

🧰 Appwrite
Make sure you have Appwrite configured with a collection for trending movies. The project uses:

getTrendingMovies() to fetch trending titles

updateSearchCount() to track search queries

🖼️ Screenshots
Home	Trending

📁 Project Structure
css
Copy
Edit
├── assets/
│   └── components/
│       ├── Search.jsx
│       ├── spinner.jsx
│       └── MovieCard.jsx
├── appwrite.js
├── App.jsx
├── main.jsx
└── ...
❗ Known Issues
No pagination for search results

API rate limits may apply from TMDb

🧠 Future Enhancements
Add movie details view (modal or separate page)

Implement pagination or infinite scrolling

Add user authentication (via Appwrite or Firebase)
