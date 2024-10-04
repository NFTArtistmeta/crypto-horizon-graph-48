import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopCryptos } from '../utils/api';
import CryptoList from '../components/CryptoList';

const Index = () => {
  const { data: cryptos, isLoading, error } = useQuery({
    queryKey: ['topCryptos'],
    queryFn: fetchTopCryptos,
  });

  if (isLoading) return <div className="text-4xl font-bold text-center mt-20">Loading...</div>;
  if (error) return <div className="text-4xl font-bold text-center mt-20 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-yellow-200 p-8">
      <h1 className="text-6xl font-black mb-8 text-center uppercase bg-black text-white p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        Crypto Assets Overview
      </h1>
      <CryptoList cryptos={cryptos} />
    </div>
  );
};

export default Index;