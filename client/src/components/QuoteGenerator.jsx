import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
    const [quote, setQuote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchQuote = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('https://infohub-challenge-2-7bra.onrender.com/api/quote');
            setQuote(response.data.quote);
        } catch (err) {
            const message = err.response?.data?.error || 'Failed to fetch a motivational quote.';
            setError(message);
            setQuote('');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch an initial quote on component mount
    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    const [quoteText, author = 'Unknown'] = quote.split('—');

    return (
        <div className="quote-card">
            <h2>Your Daily Dose of Motivation</h2>
            
            {isLoading ? (
                <p className="loading-message" style={{ color: '#ad1457' }}>Loading Quote... 💬</p>
            ) : error ? (
                <div className="error-box" style={{ backgroundColor: '#f8bbd0', borderColor: '#ad1457', color: '#880e4f' }}>
                    <p><strong>Error Generating Quote 🛑</strong></p>
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    <blockquote className="quote-text">
                        "{quoteText ? quoteText.trim() : 'Loading inspiration...'}"
                    </blockquote>
                    <footer className="quote-author">
                        — {author.trim()}
                    </footer>
                </>
            )}

            <button
                onClick={fetchQuote}
                disabled={isLoading}
                className="quote-button"
            >
                {isLoading ? 'Fetching...' : 'Get New Quote'}
            </button>
        </div>
    );
};

export default QuoteGenerator;