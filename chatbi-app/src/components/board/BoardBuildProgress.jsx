import React from 'react';
import { Search, Database, BarChart2, Palette, Lightbulb, Check, Loader2 } from 'lucide-react';

const STAGES = [
  { label: '需求分析', icon: Search },
  { label: '数据建模', icon: Database },
  { label: '图表生成', icon: BarChart2 },
  { label: '智能美化', icon: Palette },
  { label: '洞察分析', icon: Lightbulb },
];

export default function BoardBuildProgress({ stage }) {
  // stage: 0-4 (current active stage), -1 = not started
  if (stage < 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-blue-500 z-0 transition-all duration-700"
          style={{ width: `${Math.min(100, (stage / (STAGES.length - 1)) * 100)}%` }}
        />

        {STAGES.map((s, i) => {
          const Icon = s.icon;
          const done = i < stage;
          const active = i === stage;
          const pending = i > stage;
          return (
            <div key={s.label} className="flex flex-col items-center z-10 relative" style={{ flex: 1 }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                done ? 'bg-green-500 text-white' : active ? 'bg-blue-500 text-white ring-4 ring-blue-100' : 'bg-gray-100 text-gray-400'
              }`}>
                {done ? <Check size={14} /> : active ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                done ? 'text-green-600' : active ? 'text-blue-600' : 'text-gray-400'
              }`}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
