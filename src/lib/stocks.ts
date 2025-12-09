// A2Z AI - Stock Data Fetcher
// Uses Polygon.io API for AI company stock data

import { PUBLIC_COMPANIES } from './companies';

export interface StockQuote {
    ticker: string;
    companyId: string;
    companyName: string;
    price: number;
    change: number;
    changePercent: number;
    color: string;
}

// Fetch stock data from Polygon.io
export async function fetchAIStocks(): Promise<StockQuote[]> {
    const apiKey = process.env.POLYGON_API_KEY;

    // If no API key, return mock data
    if (!apiKey) {
        console.log('No POLYGON_API_KEY, using mock stock data');
        return MOCK_STOCK_DATA;
    }

    const quotes: StockQuote[] = [];

    for (const company of PUBLIC_COMPANIES) {
        if (!company.ticker) continue;

        try {
            // Fetch previous day's data
            const response = await fetch(
                `https://api.polygon.io/v2/aggs/ticker/${company.ticker}/prev?adjusted=true&apiKey=${apiKey}`,
                { next: { revalidate: 300 } } // Cache for 5 minutes
            );

            if (!response.ok) {
                console.error(`Failed to fetch stock for ${company.ticker}`);
                continue;
            }

            const data = await response.json();

            if (data.results?.[0]) {
                const result = data.results[0];
                const closePrice = result.c;
                const openPrice = result.o;
                const change = closePrice - openPrice;
                const changePercent = (change / openPrice) * 100;

                quotes.push({
                    ticker: company.ticker,
                    companyId: company.id,
                    companyName: company.name,
                    price: closePrice,
                    change: change,
                    changePercent: changePercent,
                    color: company.color,
                });
            }
        } catch (error) {
            console.error(`Error fetching stock for ${company.ticker}:`, error);
        }
    }

    // If we got no real data, fall back to mock
    if (quotes.length === 0) {
        return MOCK_STOCK_DATA;
    }

    return quotes.sort((a, b) => b.changePercent - a.changePercent);
}

// Mock stock data for development
export const MOCK_STOCK_DATA: StockQuote[] = [
    {
        ticker: 'NVDA',
        companyId: 'nvidia',
        companyName: 'NVIDIA',
        price: 142.50,
        change: 3.21,
        changePercent: 2.31,
        color: '#76B900',
    },
    {
        ticker: 'META',
        companyId: 'meta',
        companyName: 'Meta',
        price: 612.30,
        change: 6.82,
        changePercent: 1.13,
        color: '#0866FF',
    },
    {
        ticker: 'GOOGL',
        companyId: 'google',
        companyName: 'Google',
        price: 175.20,
        change: 1.45,
        changePercent: 0.84,
        color: '#4285F4',
    },
    {
        ticker: 'MSFT',
        companyId: 'microsoft',
        companyName: 'Microsoft',
        price: 445.80,
        change: 3.56,
        changePercent: 0.81,
        color: '#00A4EF',
    },
    {
        ticker: 'AMZN',
        companyId: 'amazon',
        companyName: 'Amazon',
        price: 227.50,
        change: -1.23,
        changePercent: -0.54,
        color: '#FF9900',
    },
    {
        ticker: 'AAPL',
        companyId: 'apple',
        companyName: 'Apple',
        price: 248.90,
        change: -0.82,
        changePercent: -0.33,
        color: '#A2AAAD',
    },
];
