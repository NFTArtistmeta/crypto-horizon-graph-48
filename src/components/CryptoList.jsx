import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoHistory } from '../utils/api';

const CryptoListItem = ({ crypto }) => {
  const { data: history } = useQuery({
    queryKey: ['cryptoHistory', crypto.id],
    queryFn: () => fetchCryptoHistory(crypto.id),
  });

  return (
    <Link
      to={`/crypto/${crypto.id}`}
      className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan hover:border-neo-magenta transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-neo-cyan">{crypto.name}</h2>
        <span className="text-lg font-semibold text-neo-yellow">${parseFloat(crypto.priceUsd).toFixed(2)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-neo-white">
        <p>1h: <span className={crypto.changePercent1Hr > 0 ? 'text-green-400' : 'text-red-400'}>{parseFloat(crypto.changePercent1Hr).toFixed(2)}%</span></p>
        <p>24h: <span className={crypto.changePercent24Hr > 0 ? 'text-green-400' : 'text-red-400'}>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</span></p>
        <p>7d: <span className={crypto.changePercent7d > 0 ? 'text-green-400' : 'text-red-400'}>{parseFloat(crypto.changePercent7d).toFixed(2)}%</span></p>
        <p>Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
        <p>Volume(24h): ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</p>
        <p>Circulating Supply: {parseFloat(crypto.supply).toLocaleString()} {crypto.symbol}</p>
      </div>
      <div className="mt-2 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <Line type="monotone" dataKey="priceUsd" stroke="#00FFFF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
};

const CryptoList = ({ cryptos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map((crypto) => (
        <CryptoListItem key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
};

export default CryptoList;