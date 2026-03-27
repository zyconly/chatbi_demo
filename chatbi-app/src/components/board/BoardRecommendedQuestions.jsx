import React from 'react';
import { Sparkles, TrendingUp, BarChart2, PieChart, AlertTriangle, Users } from 'lucide-react';

const QUESTIONS = [
  { text: '各属地新增业务排名分析', icon: BarChart2, color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { text: '宽带收入异常下降检测', icon: AlertTriangle, color: 'text-red-500 bg-red-50 border-red-100' },
  { text: '月度经营趋势对比看板', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { text: '营业厅业绩排名与达标率', icon: PieChart, color: 'text-purple-500 bg-purple-50 border-purple-100' },
  { text: '高流失风险用户画像分析', icon: Users, color: 'text-orange-500 bg-orange-50 border-orange-100' },
  { text: '区县维度收入占比及同比', icon: Sparkles, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
];

export default function BoardRecommendedQuestions({ onSelect }) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-1.5">
        <Sparkles size={14} className="text-amber-500" />
        推荐分析问题
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUESTIONS.map((q, i) => {
          const Icon = q.icon;
          return (
            <button
              key={i}
              onClick={() => onSelect(`帮我创建一个看板：${q.text}`)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] ${q.color}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700">{q.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
