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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ratios.map((ratio) => (
          <div key={ratio.symbol} className="bg-neo-black p-2 rounded border border-neo-magenta">
            <h3 className="text-neo-cyan font-bold">{ratio.symbol}</h3>
            <p className="text-neo-white">Long: {ratio.longPercentage.toFixed(2)}%</p>
            <p className="text-neo-white">Short: {ratio.shortPercentage.toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongShortRatios;