import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css'; 

const navItems = [
    { id: 'weather', name: 'Weather Info 🌤️' },
    { id: 'currency', name: 'Currency Converter 💱' },
    { id: 'quotes', name: 'Motivation Quote 💬' },
];

function App() {
    const [activeTab, setActiveTab] = useState('weather');

    const renderModule = () => {
        switch (activeTab) {
            case 'weather':
                return <WeatherModule />;
            case 'currency':
                return <CurrencyConverter />;
            case 'quotes':
                return <QuoteGenerator />;
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            
            <header className="app-header">
                <h1>
                   InfoHub
                </h1>
                
            </header>

            <nav className="nav-bar">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        // Apply custom CSS classes based on active state
                        className={`nav-button ${
                            activeTab === item.id
                                ? 'nav-button-active'
                                : 'nav-button-inactive'
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </nav>

            <main className="main-content">
                {renderModule()}
            </main>

            
        </div>
    );
}

export default App;