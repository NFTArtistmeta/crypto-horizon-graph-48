import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFearGreedIndex } from '../utils/api';

const FearGreedIndex = () => {
  const { data: fgi, isLoading, error } = useQuery({
    queryKey: ['fearGreedIndex'],
    queryFn: fetchFearGreedIndex,
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div className="text-neo-cyan">Loading Fear & Greed Index...</div>;
  if (error) return <div className="text-neo-magenta">Error fetching Fear & Greed Index</div>;

  const getColorClass = (value) => {
    if (value <= 25) return 'bg-red-500';
    if (value <= 45) return 'bg-orange-500';
    if (value <= 55) return 'bg-yellow-500';
    if (value <= 75) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-neo-black p-4 rounded-lg border-2 border-neo-cyan mb-8 transform -skew-x-6 hover:skew-x-0 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-2 text-neo-yellow">Fear & Greed Index</h2>
      <div className="flex items-center">
        <div className={`w-16 h-16 rounded-full ${getColorClass(fgi.value)} flex items-center justify-center text-2xl font-bold text-white mr-4`}>
          {fgi.value}
        </div>
        <div>
          <p className="text-xl text-neo-white">{fgi.value_classification}</p>
          <p className="text-sm text-neo-cyan">Updated: {new Date(fgi.timestamp * 1000).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FearGreedIndex;