import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Charts = ({ transactions }) => {
  // useMemo for chart data processing
  const chartData = useMemo(() => {
    // Last 7 days trend
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString(undefined, { weekday: 'short' });
    }).reverse();

    const trend = last7Days.map(day => {
      const dayTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d.toLocaleDateString(undefined, { weekday: 'short' }) === day;
      });

      return {
        name: day,
        income: dayTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
        expense: dayTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
      };
    });

    // Category breakdown
    const categoryMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    const categoryData = Object.keys(categoryMap).map(name => ({
      name,
      value: categoryMap[name]
    }));

    return { trend, categoryData };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Area Chart */}
      <div className="glass-card p-6 min-h-[350px]">
        <h3 className="text-xl font-bold mb-6">Spending Trend</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.trend}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#f8fafc'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpense)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-card p-6 min-h-[350px]">
        <h3 className="text-xl font-bold mb-6">Expenses by Category</h3>
        <div className="h-[250px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {chartData.categoryData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-xs text-text-muted">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
