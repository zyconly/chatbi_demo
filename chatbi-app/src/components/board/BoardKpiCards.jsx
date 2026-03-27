import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function BoardKpiCards({ data, theme }) {
  const kpis = useMemo(() => {
    const totalNewCount = data.reduce((s, r) => s + r.newCount, 0);
    const totalNewRevenue = data.reduce((s, r) => s + r.newRevenue, 0);
    const totalBbCount = data.reduce((s, r) => s + r.broadbandCount, 0);
    const totalBbRevenue = data.reduce((s, r) => s + r.broadbandRevenue, 0);
    return [
      { label: '新增办理量', value: totalNewCount, format: 'num', trend: 12.5 },
      { label: '新增收入', value: totalNewRevenue, format: 'money', trend: 8.3 },
      { label: '宽带办理量', value: totalBbCount, format: 'num', trend: -3.2 },
      { label: '宽带收入', value: totalBbRevenue, format: 'money', trend: 5.7 },
    ];
  }, [data]);

  const formatVal = (v, fmt) => fmt === 'money' ? '¥' + v.toLocaleString() : v.toLocaleString();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.label}
          className="rounded-xl p-4 text-white shadow-sm transition-transform hover:scale-[1.02]"
          style={{ background: theme.kpiGradients[i] }}
        >
          <div className="text-xs font-medium opacity-90 mb-1">{kpi.label}</div>
          <div className="text-2xl font-bold tracking-tight">{formatVal(kpi.value, kpi.format)}</div>
          <div className="flex items-center gap-1 mt-2 text-xs opacity-90">
            {kpi.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{kpi.trend >= 0 ? '+' : ''}{kpi.trend}% 较上期</span>
          </div>
        </div>
      ))}
    </div>
  );
}
