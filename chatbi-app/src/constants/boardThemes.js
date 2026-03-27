// 5 preset board themes
const BOARD_THEMES = {
  techBlue: {
    name: '科技蓝',
    primary: '#3B82F6',
    chartColors: ['#3B82F6', '#60A5FA', '#93C5FD', '#2563EB', '#1D4ED8'],
    kpiGradients: [
      'linear-gradient(135deg, #3B82F6, #2563EB)',
      'linear-gradient(135deg, #60A5FA, #3B82F6)',
      'linear-gradient(135deg, #2563EB, #1E40AF)',
      'linear-gradient(135deg, #93C5FD, #60A5FA)',
    ],
    cardBg: '#EFF6FF',
    headerBg: '#EFF6FF',
    insightBorder: '#BFDBFE',
  },
  businessGray: {
    name: '商务灰',
    primary: '#6B7280',
    chartColors: ['#6B7280', '#9CA3AF', '#4B5563', '#374151', '#D1D5DB'],
    kpiGradients: [
      'linear-gradient(135deg, #6B7280, #4B5563)',
      'linear-gradient(135deg, #9CA3AF, #6B7280)',
      'linear-gradient(135deg, #4B5563, #374151)',
      'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
    ],
    cardBg: '#F9FAFB',
    headerBg: '#F3F4F6',
    insightBorder: '#D1D5DB',
  },
  vividOrange: {
    name: '活力橙',
    primary: '#F97316',
    chartColors: ['#F97316', '#FB923C', '#FDBA74', '#EA580C', '#C2410C'],
    kpiGradients: [
      'linear-gradient(135deg, #F97316, #EA580C)',
      'linear-gradient(135deg, #FB923C, #F97316)',
      'linear-gradient(135deg, #EA580C, #C2410C)',
      'linear-gradient(135deg, #FDBA74, #FB923C)',
    ],
    cardBg: '#FFF7ED',
    headerBg: '#FFF7ED',
    insightBorder: '#FED7AA',
  },
  freshGreen: {
    name: '清新绿',
    primary: '#10B981',
    chartColors: ['#10B981', '#34D399', '#6EE7B7', '#059669', '#047857'],
    kpiGradients: [
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #34D399, #10B981)',
      'linear-gradient(135deg, #059669, #047857)',
      'linear-gradient(135deg, #6EE7B7, #34D399)',
    ],
    cardBg: '#ECFDF5',
    headerBg: '#ECFDF5',
    insightBorder: '#A7F3D0',
  },
  custom: {
    name: '品牌定制',
    primary: '#8B5CF6',
    chartColors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#7C3AED', '#6D28D9'],
    kpiGradients: [
      'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      'linear-gradient(135deg, #A78BFA, #8B5CF6)',
      'linear-gradient(135deg, #7C3AED, #6D28D9)',
      'linear-gradient(135deg, #C4B5FD, #A78BFA)',
    ],
    cardBg: '#F5F3FF',
    headerBg: '#F5F3FF',
    insightBorder: '#DDD6FE',
  },
};

// Generate a 5-color scheme from a single base hex color
export function deriveThemeFromColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lighter = (v, amt) => Math.min(255, v + amt);
  const darker = (v, amt) => Math.max(0, v - amt);
  const toHex = (rv, gv, bv) => '#' + [rv, gv, bv].map(v => v.toString(16).padStart(2, '0')).join('');
  const c1 = hex;
  const c2 = toHex(lighter(r, 40), lighter(g, 40), lighter(b, 40));
  const c3 = toHex(lighter(r, 80), lighter(g, 80), lighter(b, 80));
  const c4 = toHex(darker(r, 30), darker(g, 30), darker(b, 30));
  const c5 = toHex(darker(r, 60), darker(g, 60), darker(b, 60));
  return {
    name: '品牌定制',
    primary: hex,
    chartColors: [c1, c2, c3, c4, c5],
    kpiGradients: [
      `linear-gradient(135deg, ${c1}, ${c4})`,
      `linear-gradient(135deg, ${c2}, ${c1})`,
      `linear-gradient(135deg, ${c4}, ${c5})`,
      `linear-gradient(135deg, ${c3}, ${c2})`,
    ],
    cardBg: c3,
    headerBg: c3,
    insightBorder: c2,
  };
}

export default BOARD_THEMES;
