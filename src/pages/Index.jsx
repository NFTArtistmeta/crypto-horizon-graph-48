import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopCryptos } from '../utils/api';
import CryptoList from '../components/CryptoList';
import FearGreedIndex from '../components/FearGreedIndex';

const Index = () => {
  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['topCryptos'],
    queryFn: fetchTopCryptos,
  });

  if (isLoading) return <div className="text-4xl font-bold text-center mt-20 text-neo-cyan">Loading...</div>;
  if (error) return <div className="text-4xl font-bold text-center mt-20 text-neo-magenta">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-neo-black p-8">
      <h1 className="text-6xl font-black mb-8 text-center uppercase bg-neo-cyan text-neo-black p-4 shadow-[8px_8px_0_0_#FF00FF] transform -skew-x-6">
        Top 200 Crypto Assets
      </h1>
      <FearGreedIndex />
      <CryptoList cryptos={cryptos} />
    </div>
  );
};

export default Index;