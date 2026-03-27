import React from 'react';
import { BarChart2, Palette, Filter, Lightbulb, Download, Hash } from 'lucide-react';

const COMMANDS = [
  { label: '添加图表', icon: BarChart2, action: 'chart', prompt: '请为当前看板添加一个新的图表' },
  { label: '智能美化', icon: Palette, action: 'theme', prompt: null },
  { label: '添加筛选', icon: Filter, action: 'filter', prompt: '请为看板添加一个新的筛选条件' },
  { label: '数据洞察', icon: Lightbulb, action: 'insight', prompt: null },
  { label: '导出看板', icon: Download, action: 'export', prompt: null },
  { label: '添加指标', icon: Hash, action: 'metric', prompt: '请为看板添加新的业务指标列' },
];

export default function BoardCommandCenter({ onCommand, onSendMessage, setInputText }) {
  const handleClick = (cmd) => {
    if (cmd.prompt) {
      if (onSendMessage) {
        onSendMessage(cmd.prompt);
      } else if (setInputText) {
        setInputText(cmd.prompt);
      }
    } else {
      onCommand(cmd.action);
    }
  };

  return (
    <div className="px-4 pb-2 flex-shrink-0">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {COMMANDS.map(cmd => {
          const Icon = cmd.icon;
          return (
            <button
              key={cmd.action}
              onClick={() => handleClick(cmd)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 transition-all whitespace-nowrap flex-shrink-0"
            >
              <Icon size={12} /> {cmd.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
