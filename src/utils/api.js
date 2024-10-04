import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2',
});

const fearGreedApi = axios.create({
  baseURL: 'https://api.alternative.me',
});

export const fetchTopCryptos = async () => {
  const response = await api.get('/assets?limit=200');
  return response.data.data;
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
};

export const fetchLongShortRatios = async () => {
  // Mock data for long/short ratios
  const mockData = [
    { symbol: 'BTC', longPercentage: 65, shortPercentage: 35 },
    { symbol: 'ETH', longPercentage: 55, shortPercentage: 45 },
    { symbol: 'XRP', longPercentage: 60, shortPercentage: 40 },
    { symbol: 'LTC', longPercentage: 52, shortPercentage: 48 },
    { symbol: 'ADA', longPercentage: 58, shortPercentage: 42 },
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockData;
};