import React, { useState } from 'react';
import { Save, Share2, Download, Clock, Send, ChevronDown, Undo2, Redo2, Monitor, Smartphone, Users, Circle, Cloud, Check } from 'lucide-react';

// Mock online collaborators
const MOCK_COLLABORATORS = [
  { name: '张三', color: '#3B82F6', initials: '张' },
  { name: '李四', color: '#10B981', initials: '李' },
  { name: '王五', color: '#F97316', initials: '王' },
];

export default function BoardToolbar({
  boardTitle, boardDesc, onSave, onPublish, onSchedule, onShare, onExport,
  onUndo, onRedo, saveStatus, // 'saved' | 'saving' | 'unsaved'
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop | mobile

  const statusText = saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '已保存' : '未保存';
  const StatusIcon = saveStatus === 'saved' ? Check : saveStatus === 'saving' ? Cloud : Circle;
  const statusColor = saveStatus === 'saved' ? 'text-green-500' : saveStatus === 'saving' ? 'text-blue-400' : 'text-gray-300';

  return (
    <div className="flex flex-col border-b border-gray-200 bg-white flex-shrink-0">
      {/* Top row: title + collab + actions */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: title and save status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-sm font-bold text-gray-800 truncate max-w-[260px]">{boardTitle}</h3>
            <div className={`flex items-center gap-1 text-[10px] ${statusColor}`}>
              <StatusIcon size={10} className={saveStatus === 'saving' ? 'animate-pulse' : ''} />
              <span>{statusText}</span>
            </div>
          </div>
        </div>

        {/* Center: collaborator avatars */}
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1.5 mr-2">
            {MOCK_COLLABORATORS.map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm cursor-default"
                style={{ background: c.color, zIndex: MOCK_COLLABORATORS.length - i }}
                title={`${c.name} 正在协同编辑`}
              >
                {c.initials}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-0.5 text-[10px] text-gray-400">
            <Users size={10} />
            <span>{MOCK_COLLABORATORS.length} 人在线</span>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1">
          <button onClick={onSave} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="保存 Ctrl+S">
            <Save size={13} /> 保存
          </button>
          <button onClick={onPublish} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-sm" title="发布">
            <Send size={13} /> 发布
          </button>
          <button onClick={onShare} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="分享协作链接">
            <Share2 size={13} />
          </button>
          <button onClick={onSchedule} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="定时任务">
            <Clock size={13} />
          </button>
          <div className="relative">
            <button onClick={() => setShowExportMenu(!showExportMenu)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="导出">
              <Download size={13} /> <ChevronDown size={9} />
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[120px] z-50 animate-in fade-in zoom-in-95">
                {['PNG', 'PDF', 'Excel'].map(fmt => (
                  <button key={fmt} onClick={() => { onExport(fmt); setShowExportMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">导出为 {fmt}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: secondary toolbar — undo/redo + preview mode */}
      <div className="flex items-center justify-between px-4 py-1 border-t border-gray-50 bg-gray-50/50">
        <div className="flex items-center gap-1">
          <button onClick={onUndo} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors" title="撤销"><Undo2 size={13} /></button>
          <button onClick={onRedo} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors" title="重做"><Redo2 size={13} /></button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <span className="text-[10px] text-gray-400 truncate max-w-[300px]">{boardDesc}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex bg-white border border-gray-200 rounded-md p-0.5">
            <button onClick={() => setPreviewMode('desktop')} className={`p-1 rounded transition-colors ${previewMode === 'desktop' ? 'bg-blue-50 text-blue-500' : 'text-gray-400 hover:text-gray-600'}`} title="桌面预览"><Monitor size={12} /></button>
            <button onClick={() => setPreviewMode('mobile')} className={`p-1 rounded transition-colors ${previewMode === 'mobile' ? 'bg-blue-50 text-blue-500' : 'text-gray-400 hover:text-gray-600'}`} title="移动端预览"><Smartphone size={12} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
