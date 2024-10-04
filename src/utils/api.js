import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2',
});

const fearGreedApi = axios.create({
  baseURL: 'https://api.alternative.me',
});

export const fetchTopCryptos = async () => {
  const response = await api.get('/assets?limit=200');
  return response.data.data.map(crypto => ({
    ...crypto,
    fundingRate: Math.random() * 0.002 - 0.001, // Mock funding rate (between -0.1% and 0.1%)
    oiDelta: Math.random() * 2000000000 - 1000000000, // Mock OI delta (between -1B and 1B)
  }));
};

export const fetchCryptoDetails = async (id) => {
  const response = await api.get(`/assets/${id}`);
  return response.data.data;
};

export const fetchCryptoHistory = async (id, interval = 'd1') => {
  const end = Date.now();
  const start = end - 7 * 24 * 60 * 60 * 1000; // 7 days ago
  const response = await api.get(`/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`);
  return response.data.data.map(item => ({
    date: new Date(item.time).toLocaleDateString(),
    priceUsd: parseFloat(item.priceUsd),
  }));
};

export const fetchFearGreedIndex = async () => {
  const response = await fearGreedApi.get('/fng/');
  return response.data.data[0];
};

export const fetchTrendingCryptos = async () => {
  const [recentlyAdded, mostViewed, gainers, losers] = await Promise.all([
    api.get('/assets?limit=5&sort=-dateAdded'), // Changed to sort by dateAdded in descending order
    api.get('/assets?limit=5&sort=-volumeUsd24Hr'),
    api.get('/assets?limit=5&sort=-changePercent24Hr'),
    api.get('/assets?limit=5&sort=changePercent24Hr'),
  ]);

  return {
    recentlyAdded: recentlyAdded.data.data,
    mostViewed: mostViewed.data.data,
    gainers: gainers.data.data,
    losers: losers.data.data,
  };
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
