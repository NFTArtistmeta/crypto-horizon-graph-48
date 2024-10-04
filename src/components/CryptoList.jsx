import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptoHistory } from '../utils/api';

const CryptoListItem = ({ crypto, rank, interestRate }) => {
  const { data: history } = useQuery({
    queryKey: ['cryptoHistory', crypto.id],
    queryFn: () => fetchCryptoHistory(crypto.id),
  });

  const formatNumber = (num, decimals = 2) => {
    if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
    if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
    if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
    return num.toFixed(decimals);
  };

  return (
    <Link
      to={`/crypto/${crypto.id}`}
      className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan hover:border-neo-magenta transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="grid grid-cols-4 gap-2 mb-2">
        <h2 className="text-xl font-bold text-neo-cyan">{rank}. {crypto.symbol}</h2>
        <span className="text-lg font-semibold text-neo-yellow">${parseFloat(crypto.priceUsd).toFixed(2)}</span>
        <span className={`text-lg font-semibold ${crypto.changePercent24Hr > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
        </span>
        <span className="text-lg font-semibold text-neo-magenta">{crypto.fundingRate.toFixed(4)}%</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-sm text-neo-white">
        <p>Volume(24h): ${formatNumber(parseFloat(crypto.volumeUsd24Hr))}</p>
        <p>Market Cap: ${formatNumber(parseFloat(crypto.marketCapUsd))}</p>
        <p>OI Delta: ${formatNumber(crypto.oiDelta)}</p>
        <p>Interest Rate: {interestRate ? `${interestRate}%` : 'N/A'}</p>
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

const CryptoList = ({ cryptos, interestRates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map((crypto, index) => {
        const interestRate = interestRates.find(rate => rate.asset === crypto.symbol)?.avgAnnualInterestRate;
        return (
          <CryptoListItem
            key={crypto.id}
            crypto={crypto}
            rank={index + 1}
            interestRate={interestRate}
          />
        );
      })}
    </div>
  );
};

export default CryptoList;