
import React from 'react';
import type { CloseApproachData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CloseApproachChartProps {
  data: CloseApproachData[];
}

const CloseApproachChart: React.FC<CloseApproachChartProps> = ({ data }) => {
  const chartData = data
    .filter(d => d.orbiting_body === 'Earth')
    .map(approach => ({
      name: approach.close_approach_date,
      'Miss Distance (km)': parseFloat(approach.miss_distance.kilometers),
  }));

  if (!chartData.length) {
    return <div className="flex items-center justify-center h-full text-slate-500">No Earth close approach data available.</div>
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-2 border border-slate-600 rounded-md shadow-lg">
          <p className="label text-slate-200">{`${label}`}</p>
          <p className="intro text-cyan-400">{`Miss Distance: ${payload[0].value.toLocaleString()} km`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: 40,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            tickFormatter={(tick) => new Date(tick).getFullYear().toString()}
        />
        <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(tick) => `${(tick / 1_000_000).toFixed(1)}M`}
            label={{ value: 'km', angle: -90, position: 'insideLeft', fill: '#94a3b8', dx: -30 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(30, 213, 213, 0.1)'}}/>
        <Bar dataKey="Miss Distance (km)" fill="#22d3ee" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CloseApproachChart;
