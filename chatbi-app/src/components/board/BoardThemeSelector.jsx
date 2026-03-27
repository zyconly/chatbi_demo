import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import BOARD_THEMES, { deriveThemeFromColor } from '../../constants/boardThemes';

const themeKeys = Object.keys(BOARD_THEMES);

export default function BoardThemeSelector({ currentThemeKey, onSelectTheme }) {
  const [customColor, setCustomColor] = useState('#8B5CF6');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 animate-in fade-in slide-in-from-top-1">
      <div className="flex items-center gap-2 mb-3">
        <Palette size={14} className="text-purple-500" />
        <span className="text-xs font-bold text-gray-700">主题切换</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {themeKeys.map(key => {
          const t = BOARD_THEMES[key];
          const isActive = currentThemeKey === key;
          return (
            <button
              key={key}
              onClick={() => key === 'custom' ? onSelectTheme(key, deriveThemeFromColor(customColor)) : onSelectTheme(key, t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isActive ? 'border-blue-400 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: t.primary }} />
              {t.name}
              {isActive && <Check size={12} />}
            </button>
          );
        })}
        {currentThemeKey === 'custom' && (
          <input
            type="color"
            value={customColor}
            onChange={e => { setCustomColor(e.target.value); onSelectTheme('custom', deriveThemeFromColor(e.target.value)); }}
            className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
            title="自定义品牌色"
          />
        )}
      </div>
    </div>
  );
}
