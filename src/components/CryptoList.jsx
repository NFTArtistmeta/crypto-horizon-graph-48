import React from 'react';
import { Link } from 'react-router-dom';

const CryptoList = ({ cryptos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map((crypto) => (
        <Link
          key={crypto.id}
          to={`/crypto/${crypto.id}`}
          className="bg-white p-6 rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
        >
          <h2 className="text-2xl font-bold mb-2">{crypto.name}</h2>
          <p className="text-xl font-semibold">${parseFloat(crypto.priceUsd).toFixed(2)}</p>
          <p className="text-lg">Rank: {crypto.rank}</p>
          <p className="text-lg">Market Cap: ${parseFloat(crypto.marketCapUsd).toLocaleString()}</p>
        </Link>
      ))}
    </div>
  );
};

export default CryptoList;