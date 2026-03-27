import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function BoardChartsRow({ data, theme }) {
  const areaData = useMemo(() => {
    const map = {};
    data.forEach(r => {
      if (!map[r.area]) map[r.area] = { area: r.area, revenue: 0 };
      map[r.area].revenue += r.newRevenue + r.broadbandRevenue;
    });
    return Object.values(map).sort((a, b) => b.revenue - a.revenue);
  }, [data]);

  const monthData = useMemo(() => {
    const map = {};
    data.forEach(r => {
      const m = r.date.slice(0, 7);
      if (!map[m]) map[m] = { month: m, newCount: 0, bbCount: 0 };
      map[m].newCount += r.newCount;
      map[m].bbCount += r.broadbandCount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [data]);

  const pieData = useMemo(() => {
    const map = {};
    data.forEach(r => {
      if (!map[r.area]) map[r.area] = { name: r.area, value: 0 };
      map[r.area].value += r.newRevenue;
    });
    return Object.values(map);
  }, [data]);

  const colors = theme.chartColors;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {/* Bar chart - revenue by area */}
      <div className="bg-white border border-gray-200 rounded-xl p-4" style={{ borderColor: theme.insightBorder }}>
        <h4 className="text-xs font-bold text-gray-700 mb-3">各属地总收入</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={areaData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="area" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => '¥' + v.toLocaleString()} />
            <Bar dataKey="revenue" name="总收入" radius={[4, 4, 0, 0]}>
              {areaData.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line chart - monthly trend */}
      <div className="bg-white border border-gray-200 rounded-xl p-4" style={{ borderColor: theme.insightBorder }}>
        <h4 className="text-xs font-bold text-gray-700 mb-3">月度业务趋势</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="newCount" name="新增办理" stroke={colors[0]} strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="bbCount" name="宽带办理" stroke={colors[1]} strokeWidth={2} dot={{ r: 3 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart - area share */}
      <div className="bg-white border border-gray-200 rounded-xl p-4" style={{ borderColor: theme.insightBorder }}>
        <h4 className="text-xs font-bold text-gray-700 mb-3">新增收入属地占比</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ strokeWidth: 1 }} style={{ fontSize: 10 }}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => '¥' + v.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
