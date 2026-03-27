import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, AlertTriangle, TrendingUp, Target } from 'lucide-react';

export default function BoardInsightsSummary({ data }) {
  const [collapsed, setCollapsed] = useState(false);

  const insights = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Group by area
    const areaMap = {};
    data.forEach(r => {
      if (!areaMap[r.area]) areaMap[r.area] = { revenue: 0, count: 0, bbRevenue: 0, bbCount: 0 };
      areaMap[r.area].revenue += r.newRevenue;
      areaMap[r.area].count += r.newCount;
      areaMap[r.area].bbRevenue += r.broadbandRevenue;
      areaMap[r.area].bbCount += r.broadbandCount;
    });

    const areas = Object.entries(areaMap).sort((a, b) => b[1].revenue - a[1].revenue);
    const topArea = areas[0];
    const bottomArea = areas[areas.length - 1];
    const totalRevenue = data.reduce((s, r) => s + r.newRevenue + r.broadbandRevenue, 0);
    const totalNewCount = data.reduce((s, r) => s + r.newCount, 0);
    const avgChurn = (data.reduce((s, r) => s + (r.churnRate || 0), 0) / data.length).toFixed(1);

    // Month-over-month
    const monthMap = {};
    data.forEach(r => {
      const m = r.date.slice(0, 7);
      if (!monthMap[m]) monthMap[m] = 0;
      monthMap[m] += r.newRevenue;
    });
    const months = Object.entries(monthMap).sort((a, b) => a[0].localeCompare(b[0]));
    let momChange = null;
    if (months.length >= 2) {
      const prev = months[months.length - 2][1];
      const curr = months[months.length - 1][1];
      momChange = ((curr - prev) / prev * 100).toFixed(1);
    }

    return {
      keyFindings: [
        `总收入 ¥${totalRevenue.toLocaleString()}，新增办理 ${totalNewCount.toLocaleString()} 笔`,
        `${topArea[0]} 以 ¥${topArea[1].revenue.toLocaleString()} 排名第一，占总新增收入 ${(topArea[1].revenue / data.reduce((s, r) => s + r.newRevenue, 0) * 100).toFixed(1)}%`,
      ],
      anomalies: [
        bottomArea[1].revenue < topArea[1].revenue * 0.3
          ? { level: 'red', text: `${bottomArea[0]} 新增收入仅 ¥${bottomArea[1].revenue.toLocaleString()}，远低于头部属地，建议重点关注` }
          : null,
        parseFloat(avgChurn) > 5
          ? { level: 'orange', text: `平均流失率 ${avgChurn}%，高于 5% 警戒线` }
          : null,
      ].filter(Boolean),
      trends: [
        momChange ? `最近月环比新增收入${parseFloat(momChange) >= 0 ? '增长' : '下降'} ${Math.abs(momChange)}%` : '月度数据不足，暂无趋势',
        `宽带业务占总办理量 ${(data.reduce((s, r) => s + r.broadbandCount, 0) / (totalNewCount + data.reduce((s, r) => s + r.broadbandCount, 0)) * 100).toFixed(1)}%`,
      ],
      suggestions: [
        `加强 ${bottomArea[0]} 区域营销投入，缩小与头部的差距`,
        `关注流失率高于均值的网格，制定精准挽留策略`,
      ],
    };
  }, [data]);

  if (!insights) return null;

  const sections = [
    { icon: Lightbulb, title: '关键发现', items: insights.keyFindings, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: AlertTriangle, title: '异常告警', items: insights.anomalies, color: 'text-red-600', bg: 'bg-red-50', isAnomaly: true },
    { icon: TrendingUp, title: '趋势分析', items: insights.trends, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Target, title: '改进建议', items: insights.suggestions, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100 hover:from-indigo-100 hover:to-blue-100 transition-colors"
      >
        <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          智能洞察摘要
        </span>
        {collapsed ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
      </button>
      {!collapsed && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.title} className={`${sec.bg} rounded-lg p-3`}>
                <div className={`text-xs font-bold ${sec.color} flex items-center gap-1.5 mb-2`}>
                  <Icon size={14} /> {sec.title}
                </div>
                <ul className="space-y-1.5">
                  {sec.items.map((item, i) => (
                    <li key={i} className="text-xs text-gray-700 leading-relaxed flex items-start gap-1.5">
                      {sec.isAnomaly ? (
                        <>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.level === 'red' ? 'bg-red-500' : 'bg-orange-500'}`} />
                          {item.text}
                        </>
                      ) : (
                        <>
                          <span className="text-gray-400 mt-0.5">•</span>
                          {item}
                        </>
                      )}
                    </li>
                  ))}
                  {sec.items.length === 0 && (
                    <li className="text-xs text-gray-400">暂无数据</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
