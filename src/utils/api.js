import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2',
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