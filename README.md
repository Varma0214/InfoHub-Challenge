# 💡 InfoHub: Single-Page Utility Center

A full-stack **Single-Page Application (SPA)** built for the **ByteXL Coding Challenge**, bringing together **three everyday utilities** — weather updates, currency conversion, and motivational quotes — into one clean, interactive interface.

---

## ✨ Features

The app uses **tabbed navigation** to dynamically load each module without refreshing the page:

- 🌤️ **Weather Information** — Displays real-time temperature and weather details for a fixed city *(e.g., Bengaluru)*.  
- 💱 **Currency Converter** — Converts any amount from **INR** (Indian Rupees) into **USD** and **EUR** using up-to-date exchange rates.  
- 💬 **Motivational Quote Generator** — Fetches random inspirational quotes with elegant loading and error handling.

---

## ⚙️ Tech Stack

### 🖥️ Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Data Fetching:** Axios  
- **Configuration:** dotenv *(for secure API key management)*  

### 💻 Frontend
- **Framework:** React (Create React App - CRA)  
- **Styling:** Pure Custom CSS  
- **Networking:** Axios  

---

## 🚀 Setup and Installation

To run this project locally, follow these simple steps.  
You’ll need **two terminals** — one for the backend and one for the frontend.

### 🔧 Prerequisites
- Node.js (LTS version recommended)
- npm or Yarn
- API Keys for:
  - [OpenWeatherMap](https://openweathermap.org/api) (Weather data)
  - [Exchange Rate API](https://www.exchangerate-api.com/) *(optional, if needed)*

---

### 🪜 Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/InfoHub-Challenge.git
cd InfoHub-Challenge

# --- Backend Setup ---
cd server
npm install

# --- Frontend Setup ---
cd ../client
npm install

```
### Step 2: Configure Environment Variables

Inside the server/ directory, create a .env file and add your API keys:

WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
EXCHANGE_RATE_API_KEY=YOUR_EXCHANGE_RATE_API_KEY_IF_NEEDED

``
### Step 3: Running the Application

Run both backend and frontend servers simultaneously:

Start the Backend
cd server
node server.js
Server will run at: http://localhost:3001

Start the Frontend
cd client
npm start
App will open at: http://localhost:3000

Once both servers are active, the InfoHub SPA will automatically connect to your backend and display live data.

InfoHub-Challenge/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrencyConverter.js
│   │   │   ├── CurrencyConverter.css
│   │   │   ├── WeatherModule.js
│   │   │   ├── WeatherModule.css
│   │   │   ├── QuoteGenerator.js
│   │   │   └── QuoteGenerator.css
│   │   ├── App.js              # Main layout & tab navigation
│   │   ├── App.css             # Global styles
│   │   └── index.js
│   └── package.json            # Includes proxy config for backend
│
└── server/                     # Node/Express Backend
    ├── .env                    # API keys (ignored in Git)
    ├── server.js               # Express routes and logic
    └── package.json
