import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLongShortRatios } from '../utils/api';

const LongShortRatios = () => {
  const { data: ratios, isLoading, error } = useQuery({
    queryKey: ['longShortRatios'],
    queryFn: fetchLongShortRatios,
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div className="text-neo-cyan">Loading Long/Short Ratios...</div>;
  if (error) return <div className="text-neo-magenta">Error fetching Long/Short Ratios</div>;

  return (
    <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan mb-8">
      <h2 className="text-2xl font-bold mb-4 text-neo-yellow">Long vs. Short Ratios</h2>
      {ratios.map((ratio) => (
        <div key={ratio.symbol} className="mb-6">
          <h3 className="text-xl font-bold text-neo-cyan mb-2">{ratio.symbol} Long/Short Ratio</h3>
          <div className="grid grid-cols-5 gap-2 mb-2 text-sm font-bold text-neo-white">
            <div>Exchange</div>
            <div>Long %</div>
            <div>Short %</div>
            <div>Long Volume</div>
            <div>Short Volume</div>
          </div>
          {ratio.exchanges.map((exchange) => (
            <div key={exchange.name} className="grid grid-cols-5 gap-2 text-sm text-neo-white">
              <div>{exchange.name}</div>
              <div>{exchange.longPercentage.toFixed(2)}%</div>
              <div>{exchange.shortPercentage.toFixed(2)}%</div>
              <div>{exchange.longVolume.toFixed(2)}</div>
              <div>{exchange.shortVolume.toFixed(2)}</div>
            </div>
          ))}
          <div className="grid grid-cols-5 gap-2 mt-2 text-sm font-bold text-neo-yellow">
            <div>Total</div>
            <div>{ratio.totalLongPercentage.toFixed(2)}%</div>
            <div>{ratio.totalShortPercentage.toFixed(2)}%</div>
            <div>{ratio.totalLongVolume.toFixed(2)}</div>
            <div>{ratio.totalShortVolume.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LongShortRatios;