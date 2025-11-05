require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// Note: Vercel or your hosting service will set the PORT environment variable.
const PORT = process.env.PORT || 3001; 
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Using Open ER API which often doesn't require an API key for this base currency
const EXCHANGE_RATE_BASE_URL = 'https://open.er-api.com/v6/latest/INR'; 

// Use CORS to allow the React frontend to communicate with the server
app.use(cors());
app.use(express.json());

// --- 1. Motivational Quote API (Using Mock Data as per prompt instruction) ---
const quotes = ["The only way to do great work is to love what you do. — Steve Jobs",
"Strive not to be a success, but rather to be of value. — Albert Einstein",
"The mind is everything. What you think you become. — Buddha",
"The biggest risk is not taking any risk. — Mark Zuckerberg",
"In the middle of every difficulty lies opportunity. — Albert Einstein",
"Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
"It always seems impossible until it’s done. — Nelson Mandela",
"Your time is limited, don’t waste it living someone else’s life. — Steve Jobs",
"The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
"Whether you think you can or you think you can’t, you’re right. — Henry Ford",
"The secret of getting ahead is getting started. — Mark Twain",
"Opportunities don't happen. You create them. — Chris Grosser",
"Everything you’ve ever wanted is on the other side of fear. — George Addair",
"Believe you can and you’re halfway there. — Theodore Roosevelt",
"Do what you can, with what you have, where you are. — Theodore Roosevelt",
"Discipline is the bridge between goals and accomplishment. — Jim Rohn",
"Don’t be afraid to give up the good to go for the great. — John D. Rockefeller",
"Success is walking from failure to failure with no loss of enthusiasm. — Winston Churchill",
"Dream big and dare to fail. — Norman Vaughan",
"Act as if what you do makes a difference. It does. — William James",

];

app.get('/api/quote', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        res.json({ quote: quote });
    } catch (error) {
        // Fallback for local error
        res.status(500).json({ error: 'Could not generate a local quote.' });
    }
});

// --- 2. Weather Information API ---
// Hardcode to a city for testing purposes
const CITY = 'Bengaluru'; 
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${WEATHER_API_KEY}`;

app.get('/api/weather', async (req, res) => {
    if (!WEATHER_API_KEY) {
        return res.status(500).json({ error: 'Weather API Key not configured in the server\'s .env file.' });
    }
    
    try {
        const response = await axios.get(WEATHER_URL);
        const data = response.data;
        
        // Simplify the response for the client
        const weatherData = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp.toFixed(1), // One decimal place
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        };
        
        res.json(weatherData);
    } catch (error) {
        console.error('Weather API error:', error.message);
        // Provide graceful error handling
        const status = error.response ? error.response.status : 500;
        res.status(status).json({ error: 'Could not fetch weather data. Check API key or connection.' });
    }
});

// --- 3. Currency Conversion API (INR -> USD/EUR) ---
app.get('/api/currency', async (req, res) => {
    const { amount } = req.query; 
    const inrAmount = parseFloat(amount);

    if (isNaN(inrAmount) || inrAmount <= 0) {
        return res.status(400).json({ error: 'Invalid amount provided. Please enter a positive number.' });
    }
    
    try {
        // Fetch the latest rates relative to INR
        const response = await axios.get(EXCHANGE_RATE_BASE_URL);
        const rates = response.data.rates;

        if (!rates || !rates.USD || !rates.EUR) {
            throw new Error('Required currency rates (USD/EUR) not available.');
        }

        const conversionResult = {
            inr: inrAmount,
            usd: (inrAmount * rates.USD).toFixed(2), 
            eur: (inrAmount * rates.EUR).toFixed(2), 
        };

        res.json(conversionResult);

    } catch (error) {
        console.error('Currency API error:', error.message);
        res.status(500).json({ error: 'Could not fetch currency exchange rates.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});