import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../hooks/useAppContext';

export function RatingChart() {
  const { ratingHistory } = useAppContext();

  if (ratingHistory.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold mb-4">Rating Trajectory</h2>
        <p className="text-slate-400">No contest history yet</p>
      </div>
    );
  }

  const data = ratingHistory.map(change => ({
    name: change.contestName.substring(0, 15),
    rating: change.newRating,
    timestamp: change.ratingUpdateTimeSeconds,
  }));

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-4">Rating Trajectory</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="rating" 
            stroke="#3b82f6" 
            dot={{ fill: '#3b82f6' }}
            activeDot={{ r: 6 }}
            name="Rating"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
