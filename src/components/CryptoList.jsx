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
      className="bg-white p-4 rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{crypto.name}</h2>
        <span className="text-lg font-semibold">${parseFloat(crypto.priceUsd).toFixed(2)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>1h: <span className={crypto.changePercent1Hr > 0 ? 'text-green-600' : 'text-red-600'}>{parseFloat(crypto.changePercent1Hr).toFixed(2)}%</span></p>
        <p>24h: <span className={crypto.changePercent24Hr > 0 ? 'text-green-600' : 'text-red-600'}>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</span></p>
        <p>7d: <span className={crypto.changePercent7d > 0 ? 'text-green-600' : 'text-red-600'}>{parseFloat(crypto.changePercent7d).toFixed(2)}%</span></p>
        <p>Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
        <p>Volume(24h): ${parseFloat(crypto.volumeUsd24Hr).toLocaleString()}</p>
        <p>Circulating Supply: {parseFloat(crypto.supply).toLocaleString()} {crypto.symbol}</p>
      </div>
      <div className="mt-2 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" strokeWidth={2} dot={false} />
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