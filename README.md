💡 InfoHub: Single-Page Utility Center

This project implements the ByteXL Coding Challenge, creating a full-stack Single-Page Application (SPA) that unifies three common everyday utilities into a single interface.

✨ Features

The application is structured around a tabbed navigation system, with each tab loading its content dynamically without a page reload:

Weather Information 🌤️: Displays the current temperature and conditions for a hardcoded location (e.g., Bengaluru).

Currency Converter 💱: Converts a given amount in INR (Indian Rupees) into USD and EUR using real-time (or near real-time) exchange rates.

Motivational Quote Generator 💬: Fetches a random quote, demonstrating state handling for loading and error states.

⚙️ Tech Stack

Backend

Runtime: Node.js

Framework: Express

Data Fetching: Axios

Configuration: dotenv for secure environment variables (API Keys)

Frontend

Framework: React (built with Create React App - CRA)

Styling: Pure Custom CSS 

Networking: Axios


🚀 Setup and Installation

Follow these steps to set up and run the application locally. This project requires two separate terminals running concurrently (one for the backend, one for the frontend).

Prerequisites

Node.js (LTS version recommended) and npm/Yarn installed.

API Keys for OpenWeatherMap (Weather) and a Currency Exchange Rate service.

Step 1: Clone and Install Dependencies

# Clone the repository (or create the root folder)
git clone <Your-Repo-URL> InfoHub-Challenge
cd InfoHub-Challenge

# --- Backend Setup ---
cd server
npm install

# --- Frontend Setup ---
cd ../client
npm install


Step 2: Configure Environment Variables (.env)

In the server/ directory, create a file named .env and populate it with your API keys:

# .env file in server/ directory
WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
EXCHANGE_RATE_API_KEY=YOUR_EXCHANGE_RATE_API_KEY_IF_NEEDED


▶️ Running the Application

You must start the backend and frontend in parallel.

1. Start the Backend (Terminal 1)

In the server/ directory, run the main file:

cd server
node server.js
# Output should confirm: Server is running on http://localhost:3001


2. Start the Frontend (Terminal 2)

In the client/ directory, start the React development server:

cd client
npm start
# The app will open in your browser, typically at http://localhost:3000


Once both terminals show their respective success messages, the InfoHub SPA should load correctly, and all three modules should successfully fetch data from the backend APIs.

📂 File Structure

The project maintains a clear separation between the client and server:

InfoHub-Challenge/
├── client/ (React Frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrencyConverter.js
│   │   │   ├── CurrencyConverter.css
│   │   │   ├── WeatherModule.js
│   │   │   ├── WeatherModule.css
│   │   │   ├── QuoteGenerator.js
│   │   │   └── QuoteGenerator.css
│   │   ├── App.js           # Main layout and navigation logic
│   │   ├── App.css          # Global and layout styling
│   │   └── index.js
│   └── package.json         # Includes proxy setting
└── server/ (Node/Express Backend)
    ├── .env                 # API keys
    ├── server.js            # Express server and API endpoints
    └── package.json
