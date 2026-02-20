import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { getTagDistribution } from '../utils/helpers';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export function TagChart() {
  const { submissions } = useAppContext();
  const data = getTagDistribution(submissions).slice(0, 8); // Top 8 tags

  if (data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold mb-4">Tag Mastery</h2>
        <div className="text-center text-slate-400 py-8">No problems solved yet</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-4">Tag Mastery</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ payload }) => `${payload?.tag}: ${payload?.count}` || ''}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
