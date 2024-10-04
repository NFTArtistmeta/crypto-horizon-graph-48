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

  if (isLoadingCrypto || isLoadingHistory) return <div className="text-4xl font-bold text-center mt-20 text-neo-cyan">Loading...</div>;
  if (cryptoError || historyError) return <div className="text-4xl font-bold text-center mt-20 text-neo-magenta">Error: {cryptoError?.message || historyError?.message}</div>;

  return (
    <div className="min-h-screen bg-neo-black p-8">
      <h1 className="text-6xl font-black mb-8 text-center uppercase bg-neo-magenta text-neo-black p-4 shadow-[8px_8px_0_0_#00FFFF] transform -skew-x-6">
        {crypto.name} ({crypto.symbol})
      </h1>
      <div className="bg-neo-black p-6 rounded-lg border-2 border-neo-cyan mb-8">
        <p className="text-2xl font-bold mb-4 text-neo-yellow">Current Price: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
        <p className="text-xl mb-2 text-neo-white">Rank: {crypto.rank}</p>
        <p className="text-xl mb-2 text-neo-white">Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
        <p className="text-xl mb-2 text-neo-white">24h Volume: ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</p>
        <p className="text-xl text-neo-white">Supply: {parseFloat(crypto.supply).toLocaleString()} {crypto.symbol}</p>
      </div>
      <div className="bg-neo-black p-6 rounded-lg border-2 border-neo-magenta">
        <h2 className="text-3xl font-bold mb-4 text-neo-cyan">Price History (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={history}>
            <XAxis dataKey="date" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip contentStyle={{ backgroundColor: '#000000', border: '1px solid #00FFFF' }} />
            <Line type="monotone" dataKey="priceUsd" stroke="#FF00FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoDetails;