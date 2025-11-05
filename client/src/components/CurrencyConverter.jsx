import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(100);
    const [conversion, setConversion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConvert = useCallback(async () => {
        const inrValue = parseFloat(amount);
        if (isNaN(inrValue) || inrValue <= 0) {
            setError('Please enter a valid positive number for INR amount.');
            setConversion(null);
            return;
        }

        setIsLoading(true);
        setError('');
        setConversion(null);

        try {
            const response = await axios.get(`http://localhost:3001/api/currency?amount=${inrValue}`);
            setConversion(response.data);
        } catch (err) {
            const message = err.response?.data?.error || 'Failed to connect to the currency service.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [amount]);

    return (
        <div className="converter-card">
            <h2>INR (₹) to USD/EUR Converter</h2>
            
            <div className="converter-input-group">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 100"
                    className="converter-input"
                    min="1"
                />
                <button
                    onClick={handleConvert}
                    disabled={isLoading}
                    className="converter-button"
                >
                    {isLoading ? 'Converting...' : 'Convert'}
                </button>
            </div>

            {error && (
                <p className="error-box" style={{ maxWidth: '450px' }}>
                    {error}
                </p>
            )}

            {conversion && (
                <div className="results-grid">
                    <div className="result-box">
                        <p>${conversion.usd}</p>
                        <p>USD</p>
                    </div>
                    <div className="result-box">
                        <p>€{conversion.eur}</p>
                        <p>EUR</p>
                    </div>
                    <p style={{ gridColumn: '1 / -1', fontSize: '0.9rem', color: '#388e3c' }}>
                        **{conversion.inr} INR** converted
                    </p>
                </div>
            )}
            
            {!conversion && !error && !isLoading && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '15px' }}>
                    Enter an amount and click **Convert**.
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;