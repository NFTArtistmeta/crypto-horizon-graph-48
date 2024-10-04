import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoDetails, fetchCryptoHistory } from '../utils/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoDetails = () => {
  const { id } = useParams();
  const { data: crypto, isLoading: isLoadingCrypto, error: cryptoError } = useQuery({
    queryKey: ['cryptoDetails', id],
    queryFn: () => fetchCryptoDetails(id),
  });

  const { data: history, isLoading: isLoadingHistory, error: historyError } = useQuery({
    queryKey: ['cryptoHistory', id],
    queryFn: () => fetchCryptoHistory(id),
  });

  if (isLoadingCrypto || isLoadingHistory) return <div className="text-4xl font-bold text-center mt-20">Loading...</div>;
  if (cryptoError || historyError) return <div className="text-4xl font-bold text-center mt-20 text-red-600">Error: {cryptoError?.message || historyError?.message}</div>;

  return (
    <div className="min-h-screen bg-pink-200 p-8">
      <h1 className="text-6xl font-black mb-8 text-center uppercase bg-black text-white p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        {crypto.name} ({crypto.symbol})
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
        <p className="text-2xl font-bold mb-4">Current Price: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
        <p className="text-xl mb-2">Rank: {crypto.rank}</p>
        <p className="text-xl mb-2">Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
        <p className="text-xl mb-2">24h Volume: ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</p>
        <p className="text-xl">Supply: {parseFloat(crypto.supply).toLocaleString()} {crypto.symbol}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold mb-4">Price History (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={history}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoDetails;