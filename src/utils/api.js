import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2',
});

const fearGreedApi = axios.create({
  baseURL: 'https://api.alternative.me',
});

const binanceApi = axios.create({
  baseURL: 'https://api.binance.com',
});

const handleApiError = (error, endpoint) => {
  if (error.response) {
    console.error(`Error response from ${endpoint}:`, error.response.data);
    console.error(`Status code: ${error.response.status}`);
  } else if (error.request) {
    console.error(`No response received from ${endpoint}:`, error.request);
  } else {
    console.error(`Error setting up request to ${endpoint}:`, error.message);
  }
  throw error;
};

export const fetchTopCryptos = async () => {
  try {
    const response = await api.get('/assets?limit=200');
    return response.data.data.map(crypto => ({
      ...crypto,
      fundingRate: Math.random() * 0.002 - 0.001,
      oiDelta: Math.random() * 2000000000 - 1000000000,
    }));
  } catch (error) {
    return handleApiError(error, 'fetchTopCryptos');
  }
};

export const fetchCryptoDetails = async (id) => {
  try {
    const response = await api.get(`/assets/${id}`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error, 'fetchCryptoDetails');
  }
};

export const fetchCryptoHistory = async (id, interval = 'd1') => {
  try {
    const end = Date.now();
    const start = end - 7 * 24 * 60 * 60 * 1000;
    const response = await api.get(`/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`);
    return response.data.data.map(item => ({
      date: new Date(item.time).toLocaleDateString(),
      priceUsd: parseFloat(item.priceUsd),
    }));
  } catch (error) {
    return handleApiError(error, 'fetchCryptoHistory');
  }
};

export const fetchFearGreedIndex = async () => {
  try {
    const response = await fearGreedApi.get('/fng/');
    return response.data.data[0];
  } catch (error) {
    return handleApiError(error, 'fetchFearGreedIndex');
  }
};

export const fetchTrendingCryptos = async () => {
  try {
    const [recentlyAdded, mostViewed, gainers, losers] = await Promise.all([
      api.get('/assets?limit=5&sort=rank'),
      api.get('/assets?limit=5&sort=volumeUsd24Hr'),
      api.get('/assets?limit=5&sort=-changePercent24Hr'),
      api.get('/assets?limit=5&sort=changePercent24Hr'),
    ]);

    return {
      recentlyAdded: recentlyAdded.data.data,
      mostViewed: mostViewed.data.data,
      gainers: gainers.data.data,
      losers: losers.data.data,
    };
  } catch (error) {
    return handleApiError(error, 'fetchTrendingCryptos');
  }
};

export const fetchLongShortRatios = async () => {
  // Mock data for long/short ratios with exchange-specific information
  const mockData = [
    { 
      symbol: 'BTC',
      exchanges: [
        { name: 'Binance', longPercentage: 53.38, shortPercentage: 46.62, longVolume: 433.62, shortVolume: 378.53 },
        { name: 'Bybit', longPercentage: 50.94, shortPercentage: 49.06, longVolume: 227.38, shortVolume: 219.01 },
        { name: 'OKX', longPercentage: 49.2, shortPercentage: 50.8, longVolume: 60.72, shortVolume: 62.69 },
        { name: 'Huobi', longPercentage: 55.72, shortPercentage: 44.28, longVolume: 30.48, shortVolume: 24.23 },
        { name: 'Gate.io', longPercentage: 48.97, shortPercentage: 51.03, longVolume: 3.67, shortVolume: 3.82 },
      ],
      totalLongPercentage: 51.84,
      totalShortPercentage: 48.16,
      totalLongVolume: 755.87,
      totalShortVolume: 688.28,
    },
    // You can add more cryptocurrencies here if needed
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockData;
};

export const fetchBinanceInterestRates = async () => {
  const timestamp = Date.now();
  const apiKey = import.meta.env.VITE_BINANCE_API_KEY;
  const apiSecret = import.meta.env.VITE_BINANCE_API_SECRET;

  const queryString = `timestamp=${timestamp}`;
  
  // Use Web Crypto API to generate HMAC signature
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(apiSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(queryString)
  );
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  try {
    const response = await binanceApi.get('/sapi/v1/lending/daily/token/position', {
      params: {
        timestamp,
        signature: signatureHex,
      },
      headers: {
        'X-MBX-APIKEY': apiKey,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'fetchBinanceInterestRates');
  }
};