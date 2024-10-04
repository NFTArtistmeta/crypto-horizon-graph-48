import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingCryptos } from '../utils/api';
import { Link } from 'react-router-dom';

const TrendingItem = ({ crypto, label }) => (
  <Link to={`/crypto/${crypto.id}`} className="block hover:bg-neo-magenta/10 p-2 rounded transition-colors">
    <span className="text-neo-cyan">{crypto.name}</span>
    <span className="text-neo-yellow float-right">${parseFloat(crypto.priceUsd).toFixed(2)}</span>
  </Link>
);

const TrendingSection = ({ title, cryptos }) => (
  <div className="mb-4">
    <h3 className="text-xl font-bold text-neo-magenta mb-2">{title}</h3>
    {cryptos.map((crypto) => (
      <TrendingItem key={crypto.id} crypto={crypto} />
    ))}
  </div>
);

const TrendingList = () => {
  const { data: trendingData, isLoading, error } = useQuery({
    queryKey: ['trendingCryptos'],
    queryFn: fetchTrendingCryptos,
  });

  if (isLoading) return <div className="text-neo-cyan">Loading trending data...</div>;
  if (error) return <div className="text-neo-magenta">Error fetching trending data</div>;

  return (
    <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan mb-8">
      <h2 className="text-2xl font-bold mb-4 text-neo-yellow">Trending Cryptocurrencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrendingSection title="Recently Added" cryptos={trendingData.recentlyAdded} />
        <TrendingSection title="Most Viewed" cryptos={trendingData.mostViewed} />
        <TrendingSection title="Top Gainers" cryptos={trendingData.gainers} />
        <TrendingSection title="Top Losers" cryptos={trendingData.losers} />
      </div>
    </div>
  );
};

export default TrendingList;