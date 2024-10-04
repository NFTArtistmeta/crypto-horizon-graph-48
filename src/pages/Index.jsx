import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopCryptos, fetchBinanceInterestRates } from '../utils/api';
import CryptoList from '../components/CryptoList';
import FearGreedIndex from '../components/FearGreedIndex';
import TrendingList from '../components/TrendingList';
import LongShortRatios from '../components/LongShortRatios';

const Index = () => {
  const { data: cryptos, isLoading: cryptosLoading, error: cryptosError } = useQuery({
    queryKey: ['topCryptos'],
    queryFn: fetchTopCryptos,
  });

  const { data: interestRates, isLoading: interestRatesLoading, error: interestRatesError } = useQuery({
    queryKey: ['binanceInterestRates'],
    queryFn: fetchBinanceInterestRates,
  });

  if (cryptosLoading || interestRatesLoading) return <div className="text-4xl font-bold text-center mt-20 text-neo-cyan">Loading...</div>;
  if (cryptosError || interestRatesError) return <div className="text-4xl font-bold text-center mt-20 text-neo-magenta">Error: {cryptosError?.message || interestRatesError?.message}</div>;

  return (
    <div className="min-h-screen bg-neo-black p-8">
      <h1 className="text-6xl font-black mb-8 text-center uppercase bg-neo-cyan text-neo-black p-4 shadow-[8px_8px_0_0_#FF00FF] transform -skew-x-6">
        Top 200 Crypto Assets
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FearGreedIndex />
          <LongShortRatios />
          <CryptoList cryptos={cryptos} interestRates={interestRates} />
        </div>
        <div>
          <TrendingList />
          <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan mt-8">
            <h2 className="text-2xl font-bold mb-4 text-neo-yellow">Binance Interest Rates</h2>
            <ul>
              {interestRates.map((rate) => (
                <li key={rate.asset} className="text-neo-white mb-2">
                  {rate.asset}: {rate.avgAnnualInterestRate}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;