import React from 'react';
import { ChevronDown, ChevronRight, X, Filter } from 'lucide-react';

export default function BoardDataTable({
  data, boardColumns, boardDimCols, boardMetricCols, boardMetricGroups,
  BOARD_ALL_COLUMNS, boardContextMenu, setBoardContextMenu, handleBoardDrill
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden relative mb-4" onClick={() => setBoardContextMenu(null)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {boardDimCols.map(k => {
                const def = BOARD_ALL_COLUMNS[k];
                return (
                  <th key={k} rowSpan={boardMetricGroups.length > 0 ? 2 : 1} className="px-3 py-2 text-left text-xs font-bold text-gray-600 border-r border-gray-100 whitespace-nowrap">
                    {def.label}
                  </th>
                );
              })}
              {boardMetricGroups.map((mg) => {
                const colorMap = { blue: 'text-blue-600 bg-blue-50/50', emerald: 'text-emerald-600 bg-emerald-50/50', orange: 'text-orange-600 bg-orange-50/50', purple: 'text-purple-600 bg-purple-50/50', gray: 'text-gray-600 bg-gray-50/50' };
                return <th key={mg.group} colSpan={mg.cols.length} className={`px-3 py-2 text-center text-xs font-bold border-r border-gray-100 ${colorMap[mg.color] || colorMap.gray}`}>{mg.group}</th>;
              })}
            </tr>
            {boardMetricGroups.length > 0 && (
              <tr className="bg-gray-50 border-b border-gray-200">
                {boardMetricCols.map((mk) => (
                  <th key={mk} className="px-3 py-1.5 text-center text-xs font-medium text-gray-500 border-r border-gray-100 whitespace-nowrap">{BOARD_ALL_COLUMNS[mk].label}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                {boardDimCols.map(k => {
                  const def = BOARD_ALL_COLUMNS[k];
                  const hasDrill = def.drillChildren && def.drillChildren.length > 0;
                  return (
                    <td
                      key={k}
                      className={`px-3 py-2 text-xs border-r border-gray-50 whitespace-nowrap ${k === 'area' || k === 'district' ? 'text-gray-700 font-medium' : 'text-gray-600'} ${hasDrill ? 'cursor-context-menu' : ''}`}
                      onContextMenu={hasDrill ? (e) => { e.preventDefault(); setBoardContextMenu({ x: e.clientX, y: e.clientY, colKey: k, cellValue: row[k] }); } : undefined}
                    >
                      {row[k]}
                      {hasDrill && <ChevronDown size={10} className="inline ml-1 text-gray-300" />}
                    </td>
                  );
                })}
                {boardMetricCols.map((mk) => {
                  const def = BOARD_ALL_COLUMNS[mk];
                  const val = row[mk];
                  const display = def.format === 'money' ? val.toLocaleString() : def.format === 'percent' ? val + '%' : val;
                  return <td key={mk} className="px-3 py-2 text-xs text-gray-700 text-center border-r border-gray-50">{display}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right-click context menu for drill-down */}
      {boardContextMenu && (() => {
        const def = BOARD_ALL_COLUMNS[boardContextMenu.colKey];
        const children = (def.drillChildren || []).filter(ck => !boardColumns.includes(ck));
        if (children.length === 0) return null;
        return (
          <div
            className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-xl py-1 min-w-[160px] animate-in fade-in zoom-in-95"
            style={{ left: boardContextMenu.x, top: boardContextMenu.y }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-3 py-1.5 text-[10px] text-gray-400 uppercase tracking-wider">下钻维度</div>
            {children.map(ck => (
              <button
                key={ck}
                onClick={() => handleBoardDrill(boardContextMenu.colKey, ck)}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <ChevronRight size={12} className="text-gray-400" />
                下钻到「{BOARD_ALL_COLUMNS[ck].label}」
              </button>
            ))}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => setBoardContextMenu(null)}
                className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
