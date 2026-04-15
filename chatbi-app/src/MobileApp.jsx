import React, { useState, useRef, useEffect } from 'react';
import {
  Home, Bot, FileText, Settings, Send, ArrowLeft, Search, Plus,
  Sparkles, Database, BarChart2, FileSpreadsheet, Layout, Zap,
  ChevronRight, ChevronDown, User, Monitor, MessageSquare, Clock, Star,
  Loader2, ThumbsUp, ThumbsDown, RotateCcw, Copy, Check,
  Bell, X, TrendingUp, PieChart, Globe, Download, Share2,
  Smartphone, BrainCircuit, Lightbulb, LayoutDashboard, Table,
  Code, Eye, Maximize2, Minimize2, CheckCircle2, RefreshCw, History,
  Wand2
} from 'lucide-react';
import ipMascot from './assets/img.png';

// ─── Data ───────────────────────────────────────────
const genTypesMobile = [
  { key: 'qa', label: '智能问数', icon: Database, gradient: 'from-blue-500 to-indigo-500', lightBg: 'bg-blue-50', lightText: 'text-blue-600', desc: '用自然语言查询数据，快速获取分析结果' },
  { key: 'report', label: '报告生成', icon: FileText, gradient: 'from-purple-500 to-pink-500', lightBg: 'bg-purple-50', lightText: 'text-purple-600', desc: '一键生成专业分析报告' },
  { key: 'brief', label: '通报仿写', icon: FileSpreadsheet, gradient: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', lightText: 'text-amber-600', desc: '基于模版智能仿写通报文档' },
  { key: 'explore', label: '探索分析', icon: Sparkles, gradient: 'from-emerald-500 to-teal-500', lightBg: 'bg-emerald-50', lightText: 'text-emerald-600', desc: '深度挖掘数据洞察' },
  { key: 'html', label: 'HTML页面', icon: Layout, gradient: 'from-rose-500 to-pink-500', lightBg: 'bg-rose-50', lightText: 'text-rose-600', desc: '生成可视化数据分析页面' },
  { key: 'board', label: '智能看板', icon: LayoutDashboard, gradient: 'from-cyan-500 to-blue-500', lightBg: 'bg-cyan-50', lightText: 'text-cyan-600', desc: '自动生成可视化数据看板' },
];

const suggestionsData = {
  qa: [
    { dataset: '各省份营收表', query: '收入情况如何？' },
    { dataset: '用户通信费用日表', query: '2024年12月湖北省通话收入是多少？' },
    { dataset: '月度收入趋势表', query: '去年每月通话收入趋势如何？' },
    { dataset: '各省份营收表', query: '通话收入最高的前10个省份是哪些？' },
  ],
  report: [
    { dataset: '月度经营数据', query: '帮我生成2024年12月份经营分析报告' },
    { dataset: '用户发展统计表', query: '生成本季度用户发展情况分析报告' },
    { dataset: '各省份营收表', query: '生成各省份收入对比分析报告' },
    { dataset: '满意度调查数据', query: '生成客户满意度调查分析报告' },
  ],
  brief: [
    { dataset: '月度经营数据', query: '仿写一份本月经营情况通报' },
    { dataset: '网络质量指标', query: '仿写一份网络质量分析通报' },
    { dataset: '投诉记录_2025', query: '仿写本周客户投诉处理情况通报' },
  ],
  explore: [
    { dataset: '用户消费明细', query: '分析高价值用户的消费行为特征' },
    { dataset: '用户流失数据', query: '探索用户流失的主要原因和关键因素' },
    { dataset: '日收入明细', query: '检测近一个月的收入异常波动数据' },
  ],
  html: [
    { dataset: '用户流失数据', query: '帮我生成一个流失用户分析报告页面' },
    { dataset: '园区人流统计', query: '生成产业园区春节前后人流数据分析页面' },
    { dataset: '各省份营收表', query: '生成各省份月度收入趋势可视化大屏' },
    { dataset: '投诉记录_2025', query: '生成客户投诉数据分析可视化页面' },
  ],
  board: [
    { dataset: '经营数据汇总', query: '帮我生成一个经营分析的看板' },
    { dataset: '宽带业务数据', query: '生成一个宽带业务看板' },
    { dataset: '营业厅业绩表', query: '生成各属地营业厅业绩看板' },
  ],
};

const availableDatasets = [
  { id: 'ds-1', name: '用户通信费用日表', size: '13.39k' },
  { id: 'ds-2', name: '经营分析数据集', size: '45.2MB' },
  { id: 'ds-3', name: '流失用户分析数据集', size: '23.4MB' },
  { id: 'ds-4', name: '各省份营收表', size: '24.1MB' },
  { id: 'ds-5', name: '园区人流统计', size: '15.6MB' },
  { id: 'ds-6', name: '用户画像数据', size: '28.9MB' },
  { id: 'ds-7', name: '套餐明细数据', size: '19.5MB' },
  { id: 'ds-8', name: '投诉记录_2025', size: '102k' },
  { id: 'ds-9', name: '宽带业务数据', size: '12.3MB' },
  { id: 'ds-10', name: '月度收入趋势表', size: '5.2MB' },
];

const agentsData = [
  { id: 1, name: '舆情分析助手', desc: '智能化舆情监测与分析，实时掌握网络动态', status: '已发布', owner: '胡维达' },
  { id: 3, name: '第一个小程序智能体', desc: '第一个小程序智能体', status: '已发布', owner: '13770737933' },
  { id: 4, name: '测试第二个小程序智能体', desc: '第二个小程序智能体', status: '已发布', owner: '13770737933' },
  { id: 5, name: '测试给小程序用的智能体', desc: '给小程序用的智能体', status: '已发布', owner: '管理员' },
  { id: 8, name: 'huwd-009-探索分析', desc: 'huwd-009', status: '已发布', owner: '管理员' },
];

const historyData = [
  { title: '各省份通话收入情况如何?', date: '2026-01-20', genType: 'qa' },
  { title: '上季度用户流失率分析', date: '2026-01-19', genType: 'explore' },
  { title: '5G套餐渗透率趋势', date: '2026-01-18', genType: 'qa' },
  { title: '核心指标异动归因分析', date: '2026-01-15', genType: 'report' },
  { title: '帮我生成园区人流分析页面', date: '2026-01-12', genType: 'html' },
  { title: '生成一个宽带业务看板', date: '2026-01-10', genType: 'board' },
];

const modelOptions = ['通义千问qwen3.5-397', 'ChatGPT-4o', 'DeepSeek-V3'];

// ─── Simulated AI ───────────────────────────────────
const simulateMobileAI = (query, mode) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mode === 'html') {
        const safeTitle = query.trim() || '页面原型';
        resolve({ type: 'html_prototype', title: safeTitle, fileName: `${safeTitle.replace(/\s+/g, '').slice(0, 8)}.html`, text: `已生成 HTML 页面原型草稿：${safeTitle}。将按 SQL → Python → HTML 的顺序产出文件，并生成预览。` });
      } else {
        // Return thinking-style response for all modes
        resolve({ type: 'thinking', mode, query });
      }
    }, 800);
  });
};

// ─── Thinking Steps Component ───────────────────────
const ThinkingSteps = ({ steps, isComplete, thinkTime }) => (
  <div className="mb-3">
    <details open={!isComplete} className="group">
      <summary className="flex items-center gap-2 text-xs cursor-pointer select-none">
        <span className="text-gray-500">▼</span>
        <span className="font-medium text-gray-600">
          {isComplete ? `思考完成（用时${thinkTime}秒）` : '正在思考...'}
        </span>
      </summary>
      <div className="ml-4 mt-1.5 border-l-2 border-blue-100 pl-3 space-y-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            {s.done ? (
              <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
            ) : (
              <Loader2 size={13} className="text-blue-500 animate-spin flex-shrink-0" />
            )}
            <span className={`text-xs ${s.done ? 'text-gray-500' : 'text-blue-600'}`}>
              {s.label}{s.detail ? `：${s.detail}` : ''}
              {s.time ? <span className="text-gray-300 ml-1">（用时{s.time}秒）</span> : ''}
            </span>
          </div>
        ))}
      </div>
    </details>
  </div>
);

// ─── HTML Build Stages ──────────────────────────────
const HtmlBuildStages = ({ stage, onPreview }) => {
  const steps = [
    { label: '编写 SQL 文件', icon: Database },
    { label: '编写 Python 文件', icon: Code },
    { label: '编写 HTML 文件', icon: Layout },
  ];
  return (
    <div className="space-y-2 mt-3">
      {steps.map((s, i) => {
        const stepNum = i + 1;
        if (stage < stepNum) return null;
        const isDone = stage > stepNum;
        return (
          <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm ${isDone ? 'bg-emerald-50 border border-emerald-100' : 'bg-blue-50 border border-blue-100'}`}>
            {isDone ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Loader2 size={16} className="text-blue-500 animate-spin" />}
            <s.icon size={14} className={isDone ? 'text-emerald-600' : 'text-blue-600'} />
            <span className={isDone ? 'text-emerald-700' : 'text-blue-700'}>{s.label}</span>
          </div>
        );
      })}
      {stage > 3 && (
        <button onClick={onPreview} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium active:scale-[0.98] transition-transform shadow-md mt-1">
          <Eye size={15} /> 查看生成的页面
        </button>
      )}
    </div>
  );
};

// ─── HTML Preview Overlay ───────────────────────────
const HtmlPreviewOverlay = ({ onClose }) => {
  const publicBase = import.meta.env.BASE_URL;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Eye size={15} className="text-rose-500" /> HTML 页面预览
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 active:bg-gray-300 text-gray-500"><X size={18} /></button>
      </div>
      <iframe title="mobile-html-preview" className="flex-1 w-full border-0" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" src={`${publicBase}yuanqu/index.html`} />
    </div>
  );
};

// ─── History Sidebar ────────────────────────────────
const HistorySidebar = ({ open, onClose, onSelect }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="w-72 bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-200">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2"><History size={16} /> 历史记录</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={16} className="text-gray-400" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {historyData.map((h, i) => {
            const g = genTypesMobile.find(m => m.key === h.genType);
            return (
              <button key={i} onClick={() => { onSelect(h.title, h.genType); onClose(); }} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 mb-0.5">
                  {g && <div className={`w-5 h-5 rounded ${g.lightBg} ${g.lightText} flex items-center justify-center`}><g.icon size={10} /></div>}
                  <span className="text-[10px] text-gray-400">{g?.label}</span>
                </div>
                <div className="text-sm text-gray-700 truncate">{h.title}</div>
                <div className="text-[10px] text-gray-300 mt-0.5">{h.date}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 bg-black/30" onClick={onClose} />
    </div>
  );
};

// ─── Dataset Selector Popup ─────────────────────────
const DatasetSelector = ({ open, onClose, selected, onToggle }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end" onClick={onClose}>
      <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 animate-in slide-in-from-bottom duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800">选择数据集</h3>
          <button onClick={onClose} className="text-xs text-blue-600 font-medium">完成</button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-4 space-y-2">
          {availableDatasets.map(ds => {
            const isSelected = selected.includes(ds.id);
            return (
              <button key={ds.id} onClick={() => onToggle(ds.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors text-left ${isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-white hover:bg-gray-50'}`}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">{ds.name}</div>
                  <div className="text-[10px] text-gray-400">{ds.size}</div>
                </div>
                <Database size={14} className={isSelected ? 'text-blue-500' : 'text-gray-300'} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 首页 — 模块卡片 + 最近对话
// ============================================
const MobileHome = ({ onSelectModule, onStartChat }) => (
  <div className="flex-1 overflow-y-auto">
    <div className="px-5 pt-6 pb-5">
      <div className="flex items-center gap-3 mb-4">
        <img src={ipMascot} alt="mascot" className="w-11 h-11 rounded-xl shadow-sm" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">你好，欢迎使用 ChatBI</h2>
          <p className="text-xs text-gray-400">智能数据分析助手，随时为你服务</p>
        </div>
      </div>
    </div>
    <div className="px-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">选择功能</h3>
      <div className="grid grid-cols-2 gap-3">
        {genTypesMobile.map((g) => (
          <button key={g.key} onClick={() => onSelectModule(g.key)} className="relative bg-white border border-gray-100 rounded-2xl p-4 text-left active:scale-[0.97] transition-all hover:shadow-md group overflow-hidden">
            <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${g.gradient} opacity-10`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.gradient} flex items-center justify-center mb-3 shadow-sm`}><g.icon size={20} className="text-white" /></div>
            <div className="text-sm font-semibold text-gray-800 mb-1">{g.label}</div>
            <div className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{g.desc}</div>
            <ChevronRight size={14} className="absolute top-4 right-3 text-gray-200" />
          </button>
        ))}
      </div>
    </div>
    <div className="px-5 pb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> 最近对话</h3>
      <div className="space-y-2">
        {historyData.slice(0, 4).map((h, i) => {
          const g = genTypesMobile.find(m => m.key === h.genType);
          return (
            <div key={i} onClick={() => onStartChat(h.title, h.genType)} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 active:bg-gray-50 cursor-pointer">
              <div className={`w-7 h-7 rounded-lg ${g?.lightBg || 'bg-gray-50'} ${g?.lightText || 'text-gray-400'} flex items-center justify-center flex-shrink-0`}>{g ? <g.icon size={14} /> : <MessageSquare size={14} />}</div>
              <div className="flex-1 min-w-0"><span className="text-sm text-gray-600 truncate block">{h.title}</span><span className="text-[10px] text-gray-300">{h.date}</span></div>
              <ChevronRight size={14} className="text-gray-200 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ============================================
// 模块统一页 — 欢迎+数据集建议+聊天+思考过程
// ============================================
const MobileModuleChatPage = ({ genTypeKey, onBack, onGoHome }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [htmlStage, setHtmlStage] = useState(0);
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDatasetPicker, setShowDatasetPicker] = useState(false);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [genType, setGenType] = useState(genTypeKey);
  const [showGenTypeMenu, setShowGenTypeMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [suggestionPage, setSuggestionPage] = useState(0);
  const messagesEndRef = useRef(null);

  const g = genTypesMobile.find(m => m.key === genType);
  const suggestions = suggestionsData[genType] || [];
  const isChatting = messages.length > 0;

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading, htmlStage]);

  const toggleDataset = (id) => setSelectedDatasets(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const runHtmlStages = () => { setHtmlStage(1); setTimeout(() => setHtmlStage(2), 1500); setTimeout(() => setHtmlStage(3), 3000); setTimeout(() => setHtmlStage(4), 4800); };

  const handleSend = async (text) => {
    const q = text || input.trim();
    if (!q || isLoading) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: q }]);
    setIsLoading(true);

    try {
      const res = await simulateMobileAI(q, genType);
      if (res.type === 'html_prototype') {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: res.text, type: 'html_prototype', title: res.title, fileName: res.fileName }]);
        setIsLoading(false);
        runHtmlStages();
      } else {
        // Simulate thinking steps
        const thinkMsgId = Date.now() + 1;
        setMessages(prev => [...prev, { id: thinkMsgId, role: 'ai', type: 'thinking_result', thinkSteps: [{ label: '意图分析', detail: '', done: false }], thinkComplete: false, thinkTime: 0, content: '' }]);
        setIsLoading(false);

        // Stage 1: intent analysis
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === thinkMsgId ? { ...m, thinkSteps: [{ label: '意图分析', detail: genType === 'qa' ? '查询表数据' : genType === 'report' ? '生成报告' : genType === 'board' ? '生成看板' : '数据分析', done: true, time: '0.8' }] } : m));
        }, 800);
        // Stage 2: query data
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === thinkMsgId ? { ...m, thinkSteps: [...m.thinkSteps, { label: '查询数据', detail: '', done: false }] } : m));
        }, 900);
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === thinkMsgId ? { ...m, thinkSteps: m.thinkSteps.map((s, i) => i === 1 ? { ...s, done: true, time: '2.1', detail: '已获取数据' } : s) } : m));
        }, 2200);
        // Stage 3: generate result
        setTimeout(() => {
          setMessages(prev => prev.map(m => m.id === thinkMsgId ? { ...m, thinkSteps: [...m.thinkSteps, { label: '生成结果', detail: '', done: false }] } : m));
        }, 2300);
        setTimeout(() => {
          const resultContent = genType === 'qa'
            ? `根据数据分析，以下是"${q}"的查询结果：\n\n**关键发现：**\n- 总收入达 **158.6亿元**，同比增长 **12.3%**\n- 通话收入占比最高，达 **42.8%**\n- 华东区域贡献最大，占总收入 **35.2%**`
            : genType === 'report'
            ? `报告已生成完毕！\n\n**报告摘要：**\n- 报告名称：${q}\n- 页数：12 页\n- 包含：趋势分析、对比图表、关键指标卡片`
            : genType === 'board'
            ? `看板已创建成功！\n\n**看板概览：**\n- 包含 4 个 KPI 卡片\n- 包含 2 个趋势图表\n- 包含 1 个数据明细表`
            : `已完成分析。\n\n**分析结果：**\n- 发现了 **5 个关键洞察**\n- 建议关注 **3 个异常指标**`;
          setMessages(prev => prev.map(m => m.id === thinkMsgId ? { ...m, thinkSteps: m.thinkSteps.map((s, i) => i === 2 ? { ...s, done: true, time: '1.2' } : s), thinkComplete: true, thinkTime: '4.1', content: resultContent } : m));
        }, 3800);
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: '抱歉，分析过程出现异常，请重试。' }]);
      setIsLoading(false);
    }
  };

  const handleCopy = (id, content) => { navigator.clipboard.writeText(content); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  const shuffleSuggestions = () => setSuggestionPage(p => (p + 1) % Math.max(1, Math.ceil(suggestions.length / 3)));

  const visibleSuggestions = suggestions.slice((suggestionPage * 3) % suggestions.length, ((suggestionPage * 3) % suggestions.length) + 3);
  // wrap around
  const displaySuggestions = visibleSuggestions.length < 3 && suggestions.length > 3
    ? [...visibleSuggestions, ...suggestions.slice(0, 3 - visibleSuggestions.length)]
    : visibleSuggestions;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {showHtmlPreview && <HtmlPreviewOverlay onClose={() => setShowHtmlPreview(false)} />}
      <HistorySidebar open={showHistory} onClose={() => setShowHistory(false)} onSelect={(q, t) => { setGenType(t); handleSend(q); }} />
      <DatasetSelector open={showDatasetPicker} onClose={() => setShowDatasetPicker(false)} selected={selectedDatasets} onToggle={toggleDataset} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
        <button onClick={() => setShowHistory(true)} className="p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200">
          <History size={20} className="text-gray-500" />
        </button>
        <h3 className="text-base font-bold text-gray-800">ChatBI</h3>
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200">
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {!isChatting ? (
          /* ── Welcome + Suggestions ── */
          <div className="px-5 pt-5 pb-4">
            {/* Welcome */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-5">
              <div className="text-base font-bold text-gray-800 mb-1">
                <span className="italic">Hello, I am </span>
                <span className="text-blue-600 italic">ChatBI</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">我能理解人类语言、自动生成分析报告，是你的数据洞察智能助手</p>
            </div>

            {/* Suggestions with dataset */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">您可以试着问我：</span>
              <button onClick={shuffleSuggestions} className="flex items-center gap-1 text-xs text-blue-600 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 active:bg-blue-100">
                <RefreshCw size={12} /> 换一换
              </button>
            </div>
            <div className="space-y-2.5">
              {displaySuggestions.map((s, i) => (
                <div key={`${suggestionPage}-${i}`} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Database size={14} className="text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-800 truncate">{s.dataset}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate pl-[22px]">{s.query}</p>
                    </div>
                    <button onClick={() => handleSend(s.query)} className="flex-shrink-0 ml-3 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-lg active:bg-blue-100 hover:bg-blue-100">
                      去试试
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Chat messages ── */
          <div className="px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'user' && (
                  <div className="flex justify-end mb-4">
                    <div className="max-w-[85%] bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-2.5 text-sm">{msg.content}</div>
                  </div>
                )}
                {msg.role === 'ai' && (
                  <div className="flex justify-start gap-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${g?.gradient || 'from-blue-500 to-indigo-600'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {g ? <g.icon size={13} className="text-white" /> : <Sparkles size={13} className="text-white" />}
                    </div>
                    <div className="max-w-[85%] bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                      {/* Thinking steps */}
                      {msg.type === 'thinking_result' && msg.thinkSteps && (
                        <ThinkingSteps steps={msg.thinkSteps} isComplete={msg.thinkComplete} thinkTime={msg.thinkTime} />
                      )}
                      {/* HTML build stages */}
                      {msg.type === 'html_prototype' && (
                        <>
                          <div className="text-sm text-gray-700 whitespace-pre-wrap mb-1">{msg.content}</div>
                          {htmlStage > 0 && <HtmlBuildStages stage={htmlStage} onPreview={() => setShowHtmlPreview(true)} />}
                        </>
                      )}
                      {/* Result content */}
                      {msg.content && msg.type !== 'html_prototype' && (
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                      )}
                      {/* Actions */}
                      {msg.content && (
                        <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
                          <button onClick={() => handleCopy(msg.id, msg.content)} className="p-1 rounded hover:bg-gray-50 text-gray-300 hover:text-gray-500">
                            {copiedId === msg.id ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                          </button>
                          <button className="p-1 rounded hover:bg-gray-50 text-gray-300 hover:text-gray-500"><ThumbsUp size={13} /></button>
                          <button className="p-1 rounded hover:bg-gray-50 text-gray-300 hover:text-gray-500"><ThumbsDown size={13} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${g?.gradient || 'from-blue-500 to-indigo-600'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {g ? <g.icon size={13} className="text-white" /> : <Sparkles size={13} className="text-white" />}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-gray-400"><Loader2 size={14} className="animate-spin" /> 正在思考...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom toolbar + input */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 safe-bottom">
        {/* Toolbar: mode / model / dataset */}
        <div className="px-3 pt-2 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Mode selector */}
          <div className="relative flex-shrink-0">
            <button onClick={() => { setShowGenTypeMenu(!showGenTypeMenu); setShowModelMenu(false); }} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
              {g?.label || '智能问数'} <ChevronDown size={12} />
            </button>
            {showGenTypeMenu && (
              <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 w-36 overflow-hidden">
                {genTypesMobile.map(gt => (
                  <button key={gt.key} onClick={() => { setGenType(gt.key); setShowGenTypeMenu(false); setSuggestionPage(0); }} className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-gray-50 ${genType === gt.key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}>
                    <gt.icon size={13} /> {gt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Model selector */}
          <div className="relative flex-shrink-0">
            <button onClick={() => { setShowModelMenu(!showModelMenu); setShowGenTypeMenu(false); }} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 max-w-[160px] truncate">
              {selectedModel} <ChevronDown size={12} />
            </button>
            {showModelMenu && (
              <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 w-52 overflow-hidden">
                {modelOptions.map(m => (
                  <button key={m} onClick={() => { setSelectedModel(m); setShowModelMenu(false); }} className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${selectedModel === m ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}>{m}</button>
                ))}
              </div>
            )}
          </div>
          {/* Dataset selector */}
          <button onClick={() => setShowDatasetPicker(true)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 flex-shrink-0">
            <Database size={12} /> 选择数据集{selectedDatasets.length > 0 && <span className="bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{selectedDatasets.length}</span>}
          </button>
        </div>
        {/* Input row */}
        <div className="px-3 pb-3 pt-1 flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 flex-shrink-0">
            <Plus size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="请询问我..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
          />
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-50 flex-shrink-0">
            <Wand2 size={18} />
          </button>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 智能体列表页
// ============================================
const MobileAgents = ({ onSelectAgent }) => {
  const [search, setSearch] = useState('');
  const filtered = agentsData.filter(a => a.name.includes(search) || a.desc.includes(search));
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-bold text-gray-800 mb-1">BI 智能体</h2>
        <p className="text-xs text-gray-400 mb-4">选择一个智能体开始对话</p>
        <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索智能体..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" /></div>
      </div>
      <div className="px-5 space-y-3">
        {filtered.map(agent => (
          <div key={agent.id} onClick={() => onSelectAgent(agent)} className="bg-white border border-gray-100 rounded-xl p-4 active:bg-gray-50 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-white" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><h4 className="text-sm font-semibold text-gray-800 truncate">{agent.name}</h4><span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded-full border border-green-100">{agent.status}</span></div>
                <p className="text-xs text-gray-400 line-clamp-2">{agent.desc}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-300"><User size={10} /> {agent.owner}</div>
              </div>
              <ChevronRight size={16} className="text-gray-300 mt-3 flex-shrink-0" />
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="flex flex-col items-center py-16 text-gray-300"><Bot size={36} className="mb-2" /><p className="text-sm">未找到匹配的智能体</p></div>}
      </div>
    </div>
  );
};

// ============================================
// 报告与看板
// ============================================
const MobileReports = () => {
  const reports = [
    { id: 1, name: '2024年12月份经营分析报告', creator: '张三', date: '2026-01-20', type: 'report' },
    { id: 2, name: '流失用户洞察看板', creator: '管理员', date: '2026-01-19', type: 'board' },
    { id: 3, name: '月度经营分析看板', creator: '管理员', date: '2026-01-18', type: 'board' },
    { id: 4, name: '各省份收入对比分析报告', creator: '李四', date: '2026-01-15', type: 'report' },
    { id: 5, name: '宽带收入异常下降检测看板', creator: '王五', date: '2026-01-14', type: 'board' },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="px-5 pt-5 pb-3"><h2 className="text-lg font-bold text-gray-800 mb-1">报告与看板</h2><p className="text-xs text-gray-400 mb-4">查看已生成的分析报告和看板</p></div>
      <div className="px-5 space-y-3">
        {reports.map(r => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.type === 'board' ? 'bg-cyan-50 text-cyan-600' : 'bg-purple-50 text-purple-600'}`}>{r.type === 'board' ? <LayoutDashboard size={18} /> : <FileText size={18} />}</div>
              <div className="flex-1 min-w-0"><h4 className="text-sm font-medium text-gray-800 mb-1 truncate">{r.name}</h4><div className="flex items-center gap-3 text-[10px] text-gray-400"><span className="flex items-center gap-1"><User size={10} /> {r.creator}</span><span>{r.date}</span></div></div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-gray-50">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100"><Globe size={13} /> 查看</button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg active:bg-emerald-100"><Download size={13} /> 下载</button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-purple-600 bg-purple-50 rounded-lg active:bg-purple-100"><Share2 size={13} /> 分享</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 设置
// ============================================
const MobileSettings = () => (
  <div className="flex-1 overflow-y-auto pb-4">
    <div className="px-5 pt-5 pb-3"><h2 className="text-lg font-bold text-gray-800 mb-1">设置</h2><p className="text-xs text-gray-400 mb-4">管理账户和应用设置</p></div>
    <div className="px-5 mb-5">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><User size={24} /></div><div><h3 className="font-bold text-base">当前用户</h3><p className="text-xs text-white/70">yuchen@chatbi.com</p></div></div>
        <div className="flex gap-4 text-xs text-white/80"><div><span className="text-white font-bold text-lg">156</span> 次查询</div><div><span className="text-white font-bold text-lg">23</span> 份报告</div><div><span className="text-white font-bold text-lg">8</span> 个看板</div></div>
      </div>
    </div>
    <div className="px-5 space-y-3">
      {[
        { label: '切换到 PC 版', desc: '在浏览器中打开完整版', icon: Monitor, action: () => { const url = new URL(window.location.href); url.searchParams.delete('mobile'); window.location.href = url.toString(); }},
        { label: '通知设置', desc: '管理推送通知和公告', icon: Bell },
        { label: '数据源管理', desc: '配置数据连接和数据集', icon: Database },
        { label: '主题设置', desc: '自定义看板和报告主题', icon: Sparkles },
        { label: '关于 ChatBI', desc: '版本 v2.0.0', icon: BrainCircuit },
      ].map((item, i) => (
        <button key={i} onClick={item.action} className="w-full flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 active:bg-gray-50 text-left">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0"><item.icon size={18} /></div>
          <div className="flex-1 min-w-0"><div className="text-sm font-medium text-gray-800">{item.label}</div><div className="text-xs text-gray-400">{item.desc}</div></div>
          <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
        </button>
      ))}
    </div>
  </div>
);

// ============================================
// Main Mobile App
// ============================================
export default function MobileApp() {
  const [screen, setScreen] = useState('tabs'); // 'tabs' | 'module'
  const [tab, setTab] = useState('home');
  const [activeModule, setActiveModule] = useState('qa');

  const openModule = (key) => { setActiveModule(key); setScreen('module'); };
  const goBackToTabs = () => setScreen('tabs');

  const shell = (children) => (
    <div className="h-screen w-full max-w-md mx-auto flex flex-col bg-gray-50 overflow-hidden" style={{ maxHeight: '100dvh' }}>
      {children}
    </div>
  );

  // Module chat page (full screen)
  if (screen === 'module') {
    return shell(
      <MobileModuleChatPage genTypeKey={activeModule} onBack={goBackToTabs} onGoHome={goBackToTabs} />
    );
  }

  // Main tabs
  const tabs = [
    { key: 'home', label: '首页', icon: Home },
    { key: 'agents', label: '智能体', icon: Bot },
    { key: 'reports', label: '报告', icon: FileText },
    { key: 'settings', label: '设置', icon: Settings },
  ];

  return shell(
    <>
      <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><Sparkles size={14} className="text-white" /></div>
          <span className="text-sm font-bold text-gray-800">ChatBI</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded-full font-medium">Mobile</span>
        </div>
        <button onClick={() => { const url = new URL(window.location.href); url.searchParams.delete('mobile'); window.open(url.toString(), '_blank'); }} className="flex items-center gap-1 text-xs text-gray-400 px-2 py-1 rounded-lg hover:bg-gray-50"><Monitor size={13} /> PC版</button>
      </div>
      {tab === 'home' && <MobileHome onSelectModule={openModule} onStartChat={(q, t) => { setActiveModule(t); setScreen('module'); }} />}
      {tab === 'agents' && <MobileAgents onSelectAgent={(agent) => { setActiveModule('qa'); setScreen('module'); }} />}
      {tab === 'reports' && <MobileReports />}
      {tab === 'settings' && <MobileSettings />}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 safe-bottom">
        <div className="flex items-center">
          {tabs.map(t => {
            const isActive = tab === t.key;
            return (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                <t.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
