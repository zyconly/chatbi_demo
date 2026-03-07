import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Database,
  Settings,
  Search,
  Plus,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  FileText,
  Link,
  Layers,
  Cpu,
  Flame,
  Menu,
  AppWindow,
  Home,
  ChevronLeft,
  Sparkles,
  PieChart,
  Presentation,
  Layout,
  Grid,
  Zap,
  AtSign,
  Paperclip,
  Globe,
  Send,
  X,
  FileSpreadsheet,
  BookOpen,
  Bot,
  Loader2,
  ArrowLeft,
  MessageSquare,
  History,
  Monitor,
  Smartphone,
  Lock,
  RefreshCw,
  Printer,
  Share2,
  Undo2,
  Redo2,
  Save,
  MousePointer2,
  Move,
  Type,
  Image as ImageIcon,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Wand2,
  Table,
  Hash,
  Calendar,
  CheckSquare,
  Square,
  BarChart2,
  Filter,
  Palette,
  LayoutTemplate,
  FileText as FileTextIcon,
  TrendingUp,
  BarChart,
  Lightbulb,
  BrainCircuit,
  LogOut,
  Users,
  Languages,
  UserCircle,
  QrCode,
  ScanLine,
  Trash2,
  List,
  Type as TextIcon,
  Download,
  Code
} from 'lucide-react';
import ipMascot from './assets/img.png';

// --- 样式注入 ---
const styles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ai-response ul { list-style-type: disc; margin-left: 20px; margin-top: 8px; margin-bottom: 8px; }
  .ai-response li { margin-bottom: 4px; }
  .ai-response strong { color: #4b5563; font-weight: 700; }

  /* 选中图表的边框动画 */
  .chart-selected {
    outline: 2px solid #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    z-index: 10;
  }

  @keyframes float-squirrel {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(1deg); }
  }

  .animate-float-squirrel {
    animation: float-squirrel 4s infinite ease-in-out;
  }
`;

// --- 数据常量定义 ---
const menuStructure = [
  { id: 'home', label: '首页', icon: Home, type: 'item', view: 'home' },
  {
    id: 'bi-agent',
    label: 'BI智能体',
    icon: Cpu,
    type: 'submenu',
    children: [
      { id: 'bi-agent-manage', label: 'BI智能体管理', type: 'item', view: 'agent-manage' },
      { id: 'workflow-manage', label: '工作流管理', type: 'item' }
    ]
  },
  {
    id: 'report-copy',
    label: '通报仿写',
    icon: FileText,
    type: 'submenu',
    children: [
      { id: 'report-agent', label: '报告智能体', type: 'item' },
      { id: 'report-list', label: '报告列表', type: 'item' },
      { id: 'mail-manage', label: '邮件管理', type: 'item' }
    ]
  },
  {
    id: 'datasource',
    label: '数据源',
    icon: Database,
    type: 'submenu',
    children: [
      { id: 'data-connect', label: '数据连接', type: 'item' },
      { id: 'dataset', label: '数据集', type: 'item' },
      { id: 'dim-manage', label: '维度管理', type: 'item' }
    ]
  },
  {
    id: 'semantics',
    label: '语义管理',
    icon: BookOpen,
    type: 'submenu',
    children: [
      {
        id: 'metric-manage-group',
        label: '指标管理',
        type: 'submenu',
        children: [
          { id: 'metric-manage', label: '指标管理', type: 'item' },
          { id: 'metric-catalog', label: '指标目录', type: 'item' },
          { id: 'metric-caliber', label: '指标口径', type: 'item', active: true },
          { id: 'attr-dim', label: '归因维度', type: 'item' },
          { id: 'attr-metric', label: '归因指标', type: 'item' },
          { id: 'dim-wave', label: '维度波动', type: 'item' },
          { id: 'metric-wave', label: '指标波动', type: 'item' }
        ]
      },
      {
        id: 'permission-manage',
        label: '权限管理',
        type: 'submenu',
        children: [
          { id: 'row-permission', label: '数据行权限', type: 'item' },
          { id: 'col-permission', label: '数据列权限', type: 'item' }
        ]
      },
      {
        id: 'knowledge-manage',
        label: '知识管理',
        type: 'submenu',
        children: [
          { id: 'biz-def', label: '业务定义', type: 'item' },
          { id: 'knowledge-base', label: '知识库', type: 'item' },
          { id: 'sql-sample', label: 'SQL样本库', type: 'item' },
          { id: 'case-lib', label: '案例库', type: 'item' },
          {
            id: 'data-interpret',
            label: '数据解读',
            type: 'submenu',
            children: [
              { id: 'interpret-template', label: '解读模版', type: 'item' },
              { id: 'dataset-template', label: '数据集模版', type: 'item' }
            ]
          },
          { id: 'guess-ask', label: '猜你想问', type: 'item' }
        ]
      }
    ]
  },
  {
    id: 'operation',
    label: '运营管理',
    icon: LayoutDashboard,
    type: 'submenu',
    children: [
      { id: 'model-manage', label: '模型管理', type: 'item' },
      { id: 'topic-manage', label: '专题管理', type: 'item' },
      { id: 'qa-feedback', label: '问答反馈', type: 'item' },
      { id: 'notice-manage', label: '公告管理', type: 'item' },
      { id: 'batch-verify', label: '批量验证', type: 'item' },
      { id: 'op-stat', label: '运营统计', type: 'item' }
    ]
  },
  {
    id: 'system',
    label: '系统管理',
    icon: Settings,
    type: 'submenu',
    children: [
      { id: 'biz-space', label: '业务空间', type: 'item' },
      { id: 'user-manage', label: '用户管理', type: 'item' },
      { id: 'role-manage', label: '角色管理', type: 'item' },
      { id: 'script-manage', label: '脚本管理', type: 'item' },
      { id: 'sys-setting', label: '系统设置', type: 'item' }
    ]
  }
];

const initialAgents = [
  { id: 1, title: '经营分析助手', description: '针对通信行业经营分析场景，通过智能指标查询、简报生成等功能，提升经营决策效率', author: 'yuchen', date: '2026-02-06 13:30', heat: 3420 },
  { id: 2, title: '市场调查助手', description: '快速收集市场动态，分析竞争对手数据，自动生成市场趋势报告。', author: 'admin', date: '2026-02-06 14:15', heat: 1205 },
  { id: 3, title: '网络故障诊断专家', description: '基于历史故障库和实时告警数据，快速定位网络问题根因。', author: 'network_ops', date: '2026-02-05 09:10', heat: 8902 },
  { id: 4, title: '客户流失预测模型', description: '通过分析用户行为数据，识别高风险流失用户，并推荐个性化挽留方案。', author: 'data_sci', date: '2026-02-04 16:45', heat: 560 },
  { id: 5, title: '学术文献综述助手', description: '自动检索相关领域的学术论文，生成摘要和综述报告。', author: 'researcher', date: '2026-02-03 11:20', heat: 231 },
  { id: 6, title: '合规性检查机器人', description: '自动扫描业务流程和文档，识别潜在的合规风险。', author: 'legal_team', date: '2026-02-02 10:00', heat: 1024 }
];

const suggestions = [
  {
    title: '指标查询',
    query: '收入情况如何？',
    files: [{ name: '各省份营收表.xlsx', size: '24.1MB' }]
  },
  {
    title: '精准查询',
    query: '2024年12月湖北省通话收入是多少？',
    files: [{ name: '用户通信费用日表.csv', size: '13.39k' }]
  },
  {
    title: '趋势分析',
    query: '去年每月通话收入趋势如何？',
    files: [{ name: '月度收入趋势表.xlsx', size: '5.2MB' }]
  },
  {
    title: '多表关联分析',
    query: '分析用户套餐与投诉率的关联关系',
    files: [
      { name: '用户套餐明细.csv', size: '45.2MB' },
      { name: '投诉记录_2025.csv', size: '102k' }
    ]
  },
];

const announcements = [
  { id: 1, tag: '通知', title: '系统新版本升级通知，新功能介绍...', isRed: true, time: '10分钟前' },
  { id: 2, tag: '通知', title: '国庆节放假安排通知，请提前做好准备...', isRed: true, time: '1小时前' },
];

const globalHistoryData = [
  { title: '各省份通话收入情况如何?', date: '2026-01-20' },
  { title: '上季度用户流失率分析', date: '2026-01-19' },
  { title: '5G套餐渗透率趋势', date: '2026-01-18' },
  { title: '核心指标异动归因分析', date: '2026-01-15' },
  { title: '政企市场竞品对比报告', date: '2026-01-12' },
];

const agentHistoryData = [
  { title: '竞品A最新负面舆情分析', date: '2026-02-10' },
  { title: '本周品牌热度趋势报告', date: '2026-02-09' },
  { title: '新产品发布用户反馈汇总', date: '2026-02-08' },
  { title: '突发公关事件传播路径', date: '2026-02-05' },
];

const agentManageData = [
  { id: 1, name: 'test-001111', status: '已发布', desc: 'test-001', owner: '胡维达', update: '2026-02-09 17:44:04' },
  { id: 2, name: 'test_176114505963', status: '未发布', desc: 'test', owner: '管理员', update: '2026-02-04 15:39:36' },
  { id: 3, name: '第一个小程序智能体', status: '已发布', desc: '第一个小程序智能体', owner: '13770737933', update: '2026-01-23 10:27:14' },
  { id: 4, name: '测试第二个小程序智能体', status: '已发布', desc: '第二个小程序智能体', owner: '13770737933', update: '2026-01-23 10:24:39' },
  { id: 5, name: '测试给小程序用的智能体', status: '已发布', desc: '给小程序用的智能体', owner: '管理员', update: '2026-01-22 14:20:35' },
  { id: 6, name: 'ffff-没有工作流', status: '已发布', desc: 'ffff', owner: '管理员', update: '2026-01-21 15:25:48' },
  { id: 7, name: 'mm测试-没有探索分析', status: '未发布', desc: '我可以查询数据库的数据', owner: '管理员', update: '2026-01-21 15:24:36' },
  { id: 8, name: 'huwd-009-探索分析', status: '已发布', desc: 'huwd-009', owner: '管理员', update: '2026-01-21 15:24:16' }
];

const datasetFields = {
  dimensions: [
    { id: 'd1', name: '省份', type: 'text' },
    { id: 'd2', name: '城市', type: 'text' },
    { id: 'd3', name: '产品类别', type: 'text' },
    { id: 'd4', name: '包装方式', type: 'text' },
    { id: 'd5', name: '订单日期', type: 'date' },
  ],
  metrics: [
    { id: 'm1', name: '订单金额', type: 'number' },
    { id: 'm2', name: '订单数量', type: 'number' },
    { id: 'm3', name: '利润金额', type: 'number' },
  ]
};

// --- API 模拟：实现多轮问答路由引擎 ---
const simulateAIResponse = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 场景 1：精准查询直接出结果
      if (query.includes('2024年12月') && query.includes('湖北省') && query.includes('通话收入')) {
        resolve({
          type: 'rich_result',
          queryInfo: "查询表：用户通信费用日表，查询结果：通话收入，过滤条件：日期等于2024年12月，省份等于湖北省（province_id='1100'）。",
          result: { label: "通话收入", value: "19116" },
          questions: ["2024年12月湖北省流量收入是多少？", "2024年12月湖北省通话时长是多少？", "2024年12月湖北省用户在网时长是多少？"],
          metrics: ["专线收入-当月收入", "中国联通收入增幅", "主营业务本月收入", "主营业务上月收入", "其他主营本月收入"]
        });
      }
      // 场景 2：用户回答“不要”
      else if (query === '不要') {
        resolve({
          type: 'disambiguation_3',
          text: '好的，如果您需要更细粒度的分析，请补充以下维度信息：\n按账期（例如：2025年12月、近半年趋势...）\n按省份（例如：上海、分省排名...）'
        });
      }
      // 场景 3：用户选择了“通话收入”
      else if (query === '通话收入') {
        resolve({
          type: 'disambiguation_2',
          text: '好的，为您查询“通话收入”。您的问题中没有查询维度，请问您要查询的是全部维度下的数据吗？',
          options: ['不要', '查询全部']
        });
      }
      // 场景 4：初始模糊意图问答
      else {
        resolve({
          type: 'disambiguation_1',
          text: '收入是一个泛化的概念，系统中匹配到多个相关指标。请确认您想查询以下哪一个指标：',
          options: ['开账收入', '年累计收入', '通话收入']
        });
      }
    }, 1200); // 模拟网络延迟
  });
};

// --- 组件定义 ---

const RecursiveMenuItem = ({ item, depth = 0, isCollapsed, activeId, expandedIds, onToggle, onSelect }) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.includes(item.id);
  const isActive = activeId === item.id;
  const paddingLeft = isCollapsed ? '0' : `${16 + depth * 16}px`;

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren && !isCollapsed) {
      onToggle(item.id);
    } else {
      onSelect(item.id, item.view);
    }
  };

  return (
    <div className="group relative">
      <div
        onClick={handleClick}
        className={`flex items-center min-h-[44px] cursor-pointer transition-colors select-none ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} ${isCollapsed ? 'justify-center px-2' : ''}`}
        style={{ paddingLeft: isCollapsed ? undefined : paddingLeft, paddingRight: isCollapsed ? undefined : '16px' }}
        title={isCollapsed ? item.label : ''}
      >
        <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'} w-full`}>
          {Icon && <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />}
          {!isCollapsed && <span className={`text-sm font-medium whitespace-nowrap flex-1 ${!Icon && depth > 0 ? 'ml-1' : ''}`}>{item.label}</span>}
          {!isCollapsed && hasChildren && <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />}
        </div>
        {isActive && !isCollapsed && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l"></div>}
      </div>

      {isCollapsed && hasChildren && (
        <div className="hidden group-hover:block absolute left-full top-0 ml-1 bg-white shadow-xl rounded-lg border border-gray-100 z-50 w-48 py-2 animate-in fade-in zoom-in-95 duration-150">
           <div className="px-3 py-1.5 text-xs font-bold text-gray-400 border-b border-gray-50 mb-1">{item.label}</div>
           {item.children.map(child => (
             <div key={child.id} onClick={(e) => { e.stopPropagation(); onSelect(child.id, child.view); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center justify-between">
               {child.label}
               {child.children && <ChevronRight size={12} className="text-gray-300" />}
             </div>
           ))}
        </div>
      )}

      {!isCollapsed && hasChildren && isExpanded && (
        <div className="border-l border-gray-100 ml-6 my-1">
          {item.children.map(child => (
            <RecursiveMenuItem key={child.id} item={child} depth={depth + 1} isCollapsed={isCollapsed} activeId={activeId} expandedIds={expandedIds} onToggle={onToggle} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isCollapsed, setIsCollapsed, currentView, setCurrentView, onGoHome }) => {
  const [expandedIds, setExpandedIds] = useState(['semantics', 'metric-manage-group']);
  const [activeId, setActiveId] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleExpand = (id) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelect = (id, view) => {
    setActiveId(id);
    if (view === 'home') {
      onGoHome();
      return;
    }
    if (view) setCurrentView(view);
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20 transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`h-14 flex items-center border-b border-gray-100 flex-shrink-0 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
        <div className="flex items-center overflow-hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-200">AI</div>
          <span className={`font-bold text-lg text-gray-800 ml-2 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>ChatBI</span>
        </div>
        {!isCollapsed && <button onClick={() => setIsCollapsed(true)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><ChevronLeft size={16} /></button>}
      </div>
      {isCollapsed && <div className="flex justify-center py-2 border-b border-gray-50 flex-shrink-0"><button onClick={() => setIsCollapsed(false)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600"><ChevronRight size={18} /></button></div>}

      <div className={`flex-1 py-2 custom-scrollbar overflow-x-hidden ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
        {!isCollapsed && <div className="text-xs text-gray-400 font-medium mb-2 px-4">功能应用</div>}
        {menuStructure.map(item => <RecursiveMenuItem key={item.id} item={item} isCollapsed={isCollapsed} activeId={activeId} expandedIds={expandedIds} onToggle={toggleExpand} onSelect={handleSelect} />)}
      </div>

      <div className="p-4 border-t border-gray-100 flex-shrink-0 relative">
        {showUserMenu && (
          <div className="absolute bottom-full left-4 w-48 bg-white border border-gray-200 rounded-xl shadow-lg mb-2 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-2 space-y-1">
              {[
                { label: '个人信息', icon: UserCircle },
                { label: '语言切换', icon: Languages },
                { label: '空间设置', icon: Settings },
                { label: '加入社群', icon: Users },
              ].map((menuItem) => {
                const ItemIcon = menuItem.icon;
                return (
                  <button key={menuItem.label} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <ItemIcon size={16} />
                    {menuItem.label}
                  </button>
                );
              })}
              <div className="h-px bg-gray-100 my-1"></div>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={16} />
                退出登录
              </button>
            </div>
          </div>
        )}

        <div
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors`}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 border border-gray-300">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          {!isCollapsed && <div className="flex-1 overflow-hidden"><div className="text-sm font-medium truncate">132365***30</div><div className="text-xs text-gray-400 truncate">默认空间</div></div>}
          {!isCollapsed && <MoreHorizontal size={16} className="text-gray-400 flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
};

const DatasetSelectionModal = ({ onClose, onConfirm }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDatasets, setSelectedDatasets] = useState(['1', '2', '3', '4', '5', '6']);
  const [rightTab, setRightTab] = useState('fields');
  const [fieldSearch, setFieldSearch] = useState('');

  const datasets = [
    { id: '1', name: 'ChatBI小程序应用问题清单...' },
    { id: '2', name: 'ChatBI小程序应用问题清单...' },
    { id: '3', name: 'config_chat_msg_202602...' },
    { id: '4', name: '高速公路成本费用表-Sheet...' },
    { id: '5', name: '高速公路成本费用表-Sheet...' },
    { id: '6', name: '高速公路成本费用表-Sheet...' },
    { id: '7', name: '高速公路成本费用表-Sheet...' },
    { id: '8', name: '高速公路成本费用表-Sheet...' },
    { id: '9', name: '测试0123-进行中商机趋势...' },
  ];

  // 完美复刻右侧图3的 4 个字段列
  const fieldsData = [
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'session_id', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'msg_id', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'msg_content', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: '是否默认', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'prompt_content', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'chart_data', type: '维度', format: '' },
    { physName: 'A_A8B60B2F21CC99E3C...', name: 'msg_time', type: '维度', format: 'yyyy-MM' },
    { physName: 'A_A8B60B2F21CC99E3C91', name: 'msg_type', type: '度量', format: '' },
  ];

  const toggleDataset = (id) => {
    setSelectedDatasets(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selected = datasets.filter(ds => selectedDatasets.includes(ds.id));
    onConfirm(selected);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[1000px] h-[700px] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">选择数据</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </div>

        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">数据集名称</span>
            <input type="text" placeholder="请输入关键字搜索" className="w-48 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">数据库</span>
            <div className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-400 flex justify-between items-center cursor-pointer hover:border-blue-400 transition-colors">请选择 <ChevronDown size={14} /></div>
          </div>
          <button className="px-5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg shadow-sm transition-colors">查询</button>
        </div>

        <div className="px-6 border-b border-gray-100 flex gap-6 text-sm">
          <button className="py-3 border-b-2 border-transparent text-gray-600 hover:text-blue-500 transition-colors">已选择</button>
          <button className="py-3 border-b-2 border-blue-500 text-blue-600 font-medium">全部</button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/3 border-r border-gray-100 flex flex-col bg-white">
            <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="w-8 flex justify-center"><List size={14} className="text-blue-500" /></div>
              <span className="text-sm font-medium text-gray-700 ml-2">数据集名称</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {datasets.map(ds => (
                <div key={ds.id} className={`flex items-center px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors ${selectedDatasets.includes(ds.id) ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`} onClick={() => toggleDataset(ds.id)}>
                  <div className="w-8 flex justify-center">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedDatasets.includes(ds.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'}`}>
                      {selectedDatasets.includes(ds.id) && <div className="text-white text-[10px] font-bold">✓</div>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 ml-2 truncate font-medium">{ds.name}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 flex justify-end items-center gap-2 text-sm text-gray-500 bg-white">
              <ChevronLeft size={14} className="cursor-pointer hover:text-blue-500 transition-colors" />
              <span className="px-2 py-0.5 border border-gray-200 rounded text-gray-800 font-medium">1</span>
              <span>/ 48</span>
              <ChevronRight size={14} className="cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
          </div>

          <div className="w-2/3 flex flex-col bg-white">
            <div className="flex border-b border-gray-100 px-6 mt-4 items-center">
              <button onClick={() => setRightTab('fields')} className={`pb-2 mr-6 text-sm font-medium transition-colors ${rightTab === 'fields' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>字段</button>
              <button onClick={() => setRightTab('data')} className={`pb-2 text-sm font-medium transition-colors ${rightTab === 'data' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>数据</button>
              <div className="flex-1"></div>
              <div className="relative mb-2">
                <input type="text" placeholder="搜索字段" className="w-48 pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-400 transition-colors" value={fieldSearch} onChange={e => setFieldSearch(e.target.value)} />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 pt-2">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                    <th className="py-3 font-normal">物理字段名</th>
                    <th className="py-3 font-normal">字段名</th>
                    <th className="py-3 font-normal">字段属性</th>
                    <th className="py-3 font-normal text-right">日期格式</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {fieldsData.map((field, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 truncate max-w-[150px]" title={field.physName}>{field.physName}</td>
                      <td className="py-3 font-medium text-gray-700">{field.name}</td>
                      <td className="py-3">{field.type}</td>
                      <td className="py-3 text-right">{field.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm transition-colors font-medium">取消</button>
          <button onClick={handleConfirm} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm shadow-sm transition-colors font-medium">确定</button>
        </div>
      </div>
    </div>
  );
};

const SmartBuilderView = ({ onBack }) => {
  const [activeChart, setActiveChart] = useState(null);
  const [selectedFields, setSelectedFields] = useState(['m1', 'm2', 'd5']);

  const toggleField = (fieldId) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-800 font-medium"><ArrowLeft size={18} /></button>
          <div className="h-5 w-px bg-gray-200"></div>
          <h2 className="text-sm font-bold text-gray-800">年度销售数据集的分析报表</h2>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 数据字段侧边栏 */}
        <div className="w-60 bg-white border-r border-gray-200 flex flex-col z-10 flex-shrink-0">
           <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <span className="text-xs font-bold text-gray-700">数据字段</span>
           </div>
           <div className="flex-1 overflow-y-auto p-2">
              <div className="mb-4">
                 <div className="text-[10px] text-gray-400 font-bold mb-2 uppercase px-2">维度 (Dimensions)</div>
                 {datasetFields.dimensions.map(field => (
                    <div key={field.id} className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs group ${selectedFields.includes(field.id) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`} onClick={() => toggleField(field.id)}>
                       <span className="text-gray-400">{field.type === 'date' ? <Calendar size={12} /> : <TextIcon size={12} />}</span>
                       <span className="flex-1">{field.name}</span>
                       <div className="opacity-0 group-hover:opacity-100 text-gray-400">{selectedFields.includes(field.id) ? <CheckSquare size={12} className="text-blue-500" /> : <Square size={12} />}</div>
                    </div>
                 ))}
              </div>
              <div>
                 <div className="text-[10px] text-gray-400 font-bold mb-2 uppercase px-2">指标 (Metrics)</div>
                 {datasetFields.metrics.map(field => (
                    <div key={field.id} className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs group ${selectedFields.includes(field.id) ? 'bg-green-50 text-green-600' : 'text-gray-600'}`} onClick={() => toggleField(field.id)}>
                       <span className="text-green-500 font-bold text-[10px]">#</span>
                       <span className="flex-1">{field.name}</span>
                       <div className="opacity-0 group-hover:opacity-100 text-gray-400">{selectedFields.includes(field.id) ? <CheckSquare size={12} className="text-green-500" /> : <Square size={12} />}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* 画布区域 */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto custom-scrollbar flex justify-center" onClick={() => setActiveChart(null)}>
          <div className="w-full max-w-[1000px] bg-white shadow-sm border border-gray-200 min-h-[800px] relative p-6 transition-all" onClick={(e) => e.stopPropagation()}>
             <div className="text-center mb-6"><h1 className="text-2xl font-bold text-gray-800">年度销售报表</h1></div>
             <div className="grid grid-cols-4 gap-4 mb-6">
                {[{ label: '总金额', value: '1515万', color: 'border-l-4 border-blue-500' }, { label: '数量', value: '21.8万', color: 'border-l-4 border-green-500' }].map((kpi, idx) => (
                  <div key={idx} className={`bg-white p-4 shadow-sm border border-gray-100 rounded ${kpi.color}`}><div className="text-xs text-gray-500 mb-1">{kpi.label}</div><div className="text-xl font-bold text-gray-800">{kpi.value}</div></div>
                ))}
             </div>
             {/* 占位图表 */}
             <div className={`bg-white border border-gray-100 shadow-sm rounded p-4 mb-4 h-64 relative cursor-pointer ${activeChart === 'line-chart' ? 'chart-selected' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveChart('line-chart'); }}>
                <div className="text-xs font-bold text-center">趋势图 (点击选中)</div>
                <div className="w-full h-full flex items-end justify-between px-4 pb-4 pt-8 gap-1">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="w-full bg-blue-50/30 rounded-t relative"><div className="absolute bottom-0 w-full bg-blue-400/50" style={{ height: `${30 + Math.random() * 50}%` }}></div></div>))}</div>
             </div>
          </div>
        </div>

        {/* Copilot 侧边栏 */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20 flex-shrink-0">
           <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Sparkles size={14} /></div><span className="text-sm font-bold text-gray-800">BI Copilot</span></div>
           </div>
           <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {activeChart ? (
                 <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2"><Lightbulb size={14} className="text-orange-500" /><span className="text-xs font-bold text-gray-700">针对选中图表</span></div>
                    <div className="flex flex-col gap-2">
                       <button className="text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200 hover:border-blue-400 text-gray-600 text-left">切换为堆积柱状图</button>
                    </div>
                 </div>
              ) : (
                 <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2"><Bot size={14} className="text-blue-600" /><span className="text-xs font-bold text-gray-700">当前仪表板分析</span></div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-600">Copilot 已基于当前数据为您生成初步洞察。</div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const ChatAgentView = ({ onBack }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFiles, setActiveFiles] = useState([{ name: '用户通信费用.csv', size: '13.39k' }]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-gray-600">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1 text-sm font-medium"><ArrowLeft size={16} /> 返回</button>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 pb-32">
        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><img src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=PublicOpinion" alt="Icon" className="w-14 h-14" /></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">舆情分析助手</h2>
        <p className="text-gray-500 text-center max-w-lg mb-10 text-sm leading-relaxed">一款智能化的舆情监测与分析工具，帮助用户实时掌握网络动态，精准洞察公众情绪，为决策提供数据支持。</p>
        <p className="text-sm font-medium text-gray-700 mb-4">您好，我是您的数据分析智能助手！</p>
        <div className="space-y-3 w-full max-w-md">
          {['各省份通话收入情况如何?', '本月用户投诉热点有哪些?', '竞争对手最新市场活动分析'].map((q, i) => (
            <button key={i} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 flex items-center gap-3 transition-colors border border-gray-100"><MessageSquare size={16} className="text-gray-400" />{q}</button>
          ))}
        </div>
      </div>
      <div className="p-6 flex justify-center absolute bottom-0 w-full bg-white/90 backdrop-blur-sm z-20">
        <div className="w-full max-w-4xl relative">
          <div className="absolute -top-12 left-0 flex gap-2">
            {['智能问数', '报告生成', '探索分析', 'PPT生成', '智能看板', '知识问答'].map((tag) => (
              <button key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-purple-400 hover:text-purple-600 shadow-sm flex items-center gap-1.5 transition-all">
                 {tag === '探索分析' ? <PieChart size={12} className="text-white bg-purple-600 rounded p-0.5 w-4 h-4" /> : null}{tag}
              </button>
            ))}
          </div>
          <div className="w-full bg-white border-2 border-purple-600 rounded-2xl shadow-xl p-3 flex flex-col gap-2 focus-within:ring-4 focus-within:ring-purple-100 transition-all relative">
             <div className="flex flex-wrap gap-2 mb-1">
               {activeFiles.map((file, i) => (
                 <div key={i} className="bg-gray-50 px-3 py-2 rounded-lg flex items-center justify-between border border-gray-200">
                    <div className="flex items-center gap-2"><div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-green-600"><FileSpreadsheet size={14} /></div><div className="flex flex-col"><span className="text-xs font-medium text-gray-700">{file.name}</span><span className="text-[10px] text-gray-400">{file.size} 上传完成</span></div></div>
                    <X size={14} className="text-gray-400 cursor-pointer ml-3 hover:text-red-500" onClick={() => setActiveFiles(activeFiles.filter((_, idx) => idx !== i))}/>
                 </div>
               ))}
             </div>
             <textarea className="w-full border-none focus:ring-0 text-sm resize-none h-12 bg-transparent mt-1" placeholder="请描述您想要生成的报告，比如帮我生成一个特斯拉销量分析报告？" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
             <div className="flex items-center justify-between mt-1">
               <div className="flex items-center gap-1">
                  <button className="p-1.5 text-purple-600 bg-purple-50 rounded hover:bg-purple-100"><Zap size={16} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-gray-50 rounded"><AtSign size={16} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-gray-50 rounded"><Paperclip size={16} /></button>
                  <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-gray-50 rounded"><Globe size={16} /></button>
               </div>
               <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm transition-transform active:scale-95"><Send size={16} /></button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentsView = ({ onNavigate }) => (
  <div className="flex-1 overflow-y-auto p-6 md:p-8">
    <div className="max-w-7xl mx-auto pl-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        发现BI智能体 <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-normal">{initialAgents.length} 个助手在线</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        {initialAgents.map((agent) => (
          <div key={agent.id} onClick={() => onNavigate('chat-agent-1')} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between h-full group cursor-pointer">
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0"><Bot size={24} className="text-gray-400 group-hover:text-blue-500 transition-colors" /></div>
                <div><h3 className="font-bold text-gray-800 text-base group-hover:text-blue-600">{agent.title}</h3><p className="text-xs text-gray-500 line-clamp-2 mt-1">{agent.description}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AgentManageView = () => {
  const [statusFilter, setStatusFilter] = useState('全部');
  const [searchText, setSearchText] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);

  const filtered = agentManageData.filter((item) => {
    const statusMatched = statusFilter === '全部' || item.status === statusFilter;
    const keywordMatched = !searchText.trim() || item.name.includes(searchText) || item.desc.includes(searchText);
    return statusMatched && keywordMatched;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#d8e4ff] to-[#eef2fb] p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">智能体管理</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 h-10 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm">
          <Plus size={16} /> 创建智能体
        </button>
      </div>

      <div className="flex items-center justify-end gap-4 mb-6">
        <div className="bg-[#d3dcea] rounded-xl p-1 flex items-center">
          {['全部', '已发布', '未发布'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 h-9 rounded-lg text-sm ${statusFilter === tab ? 'bg-white text-gray-800 font-medium shadow-sm' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="请输入关键词搜索"
            className="w-72 h-10 bg-white/90 border border-gray-300 rounded-xl pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white/95 rounded-2xl border border-gray-200 shadow-sm p-4 relative">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${item.id}`} alt="avatar" className="w-12 h-12 rounded-xl bg-blue-100" />
                <div>
                  <div className="text-3xl leading-none text-gray-800 font-bold mb-1">{item.name}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.status === '已发布' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                    <span className={`${item.status === '已发布' ? 'text-emerald-600' : 'text-gray-500'} font-medium`}>{item.status}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)} className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="text-gray-500 text-sm mt-4 min-h-[22px]">{item.desc}</div>
            <div className="h-px bg-gray-200 my-5"></div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{item.owner}</span>
              <span>最近编辑：{item.update}</span>
            </div>

            {menuOpenId === item.id && (
              <div className="absolute right-4 top-14 bg-white rounded-xl border border-gray-200 shadow-xl w-28 py-2 z-20">
                {['发布', '赋权', '修改', '复制'].map((action) => (
                  <button key={action} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{action}</button>
                ))}
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">删除</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HomeView：集成多轮对话流引擎 ---
const HomeView = ({ onNavigate }) => {
  const [inputText, setInputText] = useState('');
  const [activeFiles, setActiveFiles] = useState([{ name: '用户通信费用日表.csv', size: '13.39k' }]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('fast');
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [expandedThinking, setExpandedThinking] = useState(null);
  const [selectedModel, setSelectedModel] = useState('Qwen3-30B-A3B');
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const modelDropdownRef = useRef(null);

  const modelOptions = ['qwen3-max', 'qwen3-32b', 'Qwen3-30B-A3B', 'qwen3-coder-plus', 'deepseek-v3.2', 'qwen2-72b-instruct'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (item) => {
    setActiveFiles(item.files);
    setInputText(item.query);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const removeFile = (indexToRemove) => {
    setActiveFiles(activeFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleDatasetConfirm = (selectedDatasets) => {
    const newFiles = selectedDatasets.map(ds => ({ name: ds.name, size: 'Unknown' }));
    setActiveFiles([...activeFiles, ...newFiles.filter(nf => !activeFiles.some(cf => cf.name === nf.name))]);
    setShowDatasetModal(false);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({ name: file.name, size: (file.size / 1024).toFixed(2) + 'k' }));
      setActiveFiles([...activeFiles, ...newFiles.filter(nf => !activeFiles.some(cf => cf.name === nf.name))]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (textOverride) => {
    const text = textOverride || inputText;
    if (!text.trim()) return;

    const newUserMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);

    const responseData = await simulateAIResponse(text);

    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', ...responseData }]);
    setIsLoading(false);
  };

  // 通过内联函数直接返回 JSX，避免焦点丢失
  const renderInputBox = () => (
    <div className="w-full bg-white border-2 border-purple-600 rounded-2xl shadow-xl p-4 transition-all focus-within:ring-4 focus-within:ring-purple-100 pointer-events-auto relative">
      {activeFiles.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {activeFiles.map((file, index) => (
            <div key={index} className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-xs shadow-sm">
              <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center text-green-600"><FileSpreadsheet size={12} /></div>
              <span className="text-gray-700 max-w-[150px] truncate font-medium">{file.name}</span>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500 hover:bg-white rounded-full p-0.5 transition-colors"><X size={12} /></button>
            </div>
          ))}
        </div>
      )}

      <textarea
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
        className="w-full h-12 resize-none border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-base bg-transparent p-0 mb-2 leading-relaxed"
        placeholder="请输入您想查询和分析的问题，或点击上方示例快速体验..."
      ></textarea>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-0.5 rounded-lg">
            <button onClick={() => setAnalysisMode('fast')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${analysisMode === 'fast' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <Zap size={14} /> 快速分析
            </button>
            <button onClick={() => setAnalysisMode('deep')} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${analysisMode === 'deep' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <BrainCircuit size={14} /> 深度思考
            </button>
          </div>

          <div className="h-5 w-px bg-gray-200"></div>

          <button onClick={() => setShowDatasetModal(true)} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-blue-200 transition-colors shadow-sm">
            <Database size={14} /> 选择数据集
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-green-600 bg-gray-50 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-green-200 transition-colors shadow-sm">
            <FileSpreadsheet size={14} /> 上传文件
          </button>
          <button onClick={() => setWebSearchEnabled(!webSearchEnabled)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-lg border shadow-sm ${webSearchEnabled ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-gray-50 text-gray-600 border-transparent hover:bg-indigo-50 hover:text-indigo-600'}`}>
            <Globe size={14} /> 网络检索
          </button>
        </div>

        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          className={`bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 shadow-md transition-all active:scale-95 flex items-center justify-center min-w-[40px] ${isLoading || !inputText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );

  const renderMessage = (msg, index) => {
    if (msg.role === 'user') {
      return (
        <div key={msg.id} className="flex justify-end mb-6 w-full animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-white text-gray-800 border border-gray-200 px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%] text-sm leading-relaxed">
            {msg.content}
          </div>
        </div>
      );
    }

    if (msg.role === 'ai') {
      // 类型: 无选项补充说明
      if (msg.type === 'disambiguation_3') {
        return (
          <div key={msg.id} className="flex items-start gap-4 mb-6 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white"><Bot size={16} /></div>
            </div>
            <div className="flex-1">
              <div className="bg-[#eff4ff] border border-[#d6e4ff] p-5 rounded-2xl rounded-tl-sm shadow-sm">
                <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </div>
        );
      }

      // 类型 1&2: 歧义澄清带选项 (图2样式高度还原)
      if (msg.type === 'disambiguation_1' || msg.type === 'disambiguation_2') {
        return (
          <div key={msg.id} className="flex items-start gap-4 mb-6 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white"><Bot size={16} /></div>
            </div>
            <div className="flex-1">
              <div className="bg-[#eff4ff] border border-[#d6e4ff] p-5 rounded-2xl rounded-tl-sm shadow-sm">
                <p className="text-gray-800 text-sm leading-relaxed mb-4">{msg.text}</p>
                <div className="flex flex-wrap gap-3">
                  {msg.options && msg.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSendMessage(opt)}
                      className="px-5 py-2.5 bg-white text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white rounded-lg text-sm transition-all shadow-sm font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {msg.hint && (
                  <div className="mt-5 pt-4 border-t border-blue-100">
                     <p className="text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{msg.hint}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      // 类型 3: 富文本图表结果 (图1样式高度还原)
      if (msg.type === 'rich_result') {
        const isExp = expandedThinking === msg.id;
        return (
          <div key={msg.id} className="flex items-start gap-4 mb-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white"><Sparkles size={14} /></div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm p-6 relative overflow-hidden">

              {/* 思考过程 Accordion */}
              <div className="mb-4">
                <button
                  onClick={() => setExpandedThinking(isExp ? null : msg.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {isExp ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  思考完成 <span className="text-gray-400 font-normal text-xs ml-1">(用时4.9秒)</span>
                </button>
                {isExp && (
                  <div className="mt-3 ml-2 border-l-2 border-gray-100 pl-5 py-1 space-y-4 animate-in fade-in duration-200">
                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full border-2 border-white"></div>
                      <div className="text-xs text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-gray-500 mr-2 border border-gray-200">意图分析 (用时0.6秒)</span> 用户意图：查询表数据</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full border-2 border-white"></div>
                      <div className="text-xs text-gray-600 leading-relaxed"><span className="bg-gray-100 px-2 py-1 rounded text-gray-500 mr-2 border border-gray-200 block w-max mb-1.5">召回数据 (用时1秒)</span> 根据用户的问题，已经从615个表中召回3个表：用户通信费用日表（召回13个字段）、收入完全（召回29个字段）、近三年收入完成情况（召回5个字段）</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full border-2 border-white"></div>
                      <div className="text-xs text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-gray-500 mr-2 border border-gray-200">确认数据 (用时1.4秒)</span> 根据用户的问题，需要从以下表查询数据：用户通信费用日表（召回13个字段）</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="text-xs text-gray-800 font-medium"><span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 rounded mr-2">回答问题 (用时1.9秒)</span> 思考完成，开始回答用户问题。</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 查询条件解读 */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-100">{msg.queryInfo}</p>

              {/* 大数据卡片 */}
              <div className="bg-[#f8f9fa] rounded-xl p-6 mb-6 relative group flex flex-col justify-center min-h-[120px] border border-gray-100/50">
                <div className="flex items-baseline gap-4 mt-2">
                  <span className="text-gray-500 text-base font-medium">{msg.result.label} :</span>
                  <span className="text-[40px] font-bold text-[#1a73e8] tracking-tight">{msg.result.value}</span>
                </div>

                {/* 右上角操作区 */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-200 transition-colors shadow-sm">
                    <Sparkles size={14} /> 数据解读
                  </button>
                  <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-sm"><Download size={14} /></button>
                  <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-sm"><Code size={14} /></button>
                  <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-sm"><PieChart size={14} /></button>
                </div>
              </div>

              {/* 猜你想问 */}
              <div className="flex items-start gap-3 mb-4">
                 <span className="text-sm font-bold text-gray-700 whitespace-nowrap mt-1.5">猜你想问：</span>
                 <div className="flex flex-wrap gap-2">
                   {msg.questions.map(q => (
                     <button key={q} onClick={() => handleSendMessage(q)} className="flex items-center gap-1.5 bg-[#f4f8ff] text-[#1a73e8] border border-[#d6e4ff] px-4 py-1.5 rounded-full text-xs hover:bg-blue-100 transition-colors shadow-sm">
                       <MessageSquare size={12} /> {q}
                     </button>
                   ))}
                 </div>
              </div>

              {/* 推荐指标 */}
              <div className="flex items-start gap-3 mb-6">
                 <span className="text-sm font-bold text-gray-700 whitespace-nowrap mt-1.5">推荐指标：</span>
                 <div className="flex flex-wrap gap-2">
                   {msg.metrics.map(m => (
                     <button key={m} className="flex items-center gap-1 bg-white text-gray-600 border border-gray-200 hover:text-[#1a73e8] hover:border-blue-200 px-3 py-1.5 rounded-full text-xs transition-colors shadow-sm">
                       <Hash size={12} className="text-[#1a73e8]" /> {m}
                     </button>
                   ))}
                 </div>
              </div>

              {/* 底部操作栏 */}
              <div className="flex items-center justify-end gap-4 text-gray-400 border-t border-gray-100 pt-4">
                 <button className="flex items-center gap-1 text-xs hover:text-blue-600 transition-colors font-medium"><Grid size={14} /> 加入案例库</button>
                 <button className="flex items-center gap-1 text-xs hover:text-blue-600 transition-colors font-medium"><Database size={14} /> 保存为数据集</button>
                 <div className="h-3 w-px bg-gray-200"></div>
                 <button className="hover:text-blue-600 transition-colors"><RefreshCw size={14} /></button>
                 <button className="hover:text-blue-600 transition-colors"><ThumbsUp size={14} /></button>
                 <button className="hover:text-red-500 transition-colors"><ThumbsDown size={14} /></button>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const isChatting = messages.length > 0;

  return (
    <div className={`flex h-full justify-center overflow-hidden transition-colors duration-500 ${isChatting ? 'bg-[#f4f6f8]' : 'bg-white'}`}>
      <style>{styles}</style>
      <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx,.xls" multiple onChange={handleFileUpload} />
      {showDatasetModal && <DatasetSelectionModal onClose={() => setShowDatasetModal(false)} onConfirm={handleDatasetConfirm} />}

      <div className="flex-1 flex flex-col items-center overflow-y-auto custom-scrollbar relative h-full">
        {!isChatting && (
          <div ref={modelDropdownRef} className="absolute top-[30px] left-[30px] z-30">
            <button
              onClick={() => setShowModelDropdown(prev => !prev)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 min-w-[200px] h-[42px] flex items-center justify-between text-xs font-medium text-gray-700 shadow-sm hover:border-blue-300 transition-colors"
            >
              <span>{selectedModel}</span>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showModelDropdown && (
              <div className="absolute left-0 top-[calc(100%+8px)] w-[220px] max-h-[260px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl py-2">
                {modelOptions.map((model) => (
                  <button
                    key={model}
                    onClick={() => { setSelectedModel(model); setShowModelDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${selectedModel === model ? 'bg-blue-50 text-gray-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={`max-w-5xl w-full mx-auto px-6 flex flex-col items-center relative z-10 ${isChatting ? 'pb-20 pt-16' : 'min-h-full justify-center py-10'}`}>

          {!isChatting ? (
            <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
              <div className="mb-8 mt-4 w-full max-w-5xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 px-4">
                  <img
                    src={ipMascot}
                    alt="ChatBI IP"
                    className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-2xl shadow-sm flex-shrink-0"
                  />
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">ChatBI，<span className="text-purple-600">您的AI决策助手</span></h1>
                    <p className="text-gray-500 text-base">AI 为您全网找数据，生成职场级、可交付的数据报告！</p>
                  </div>
                </div>
              </div>

              {/* 顶部悬浮功能按钮 */}
              <div className="flex items-center justify-center gap-3 mb-10 w-full flex-wrap">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors"><Sparkles size={16} /><span className="font-medium text-sm">智能问数</span></button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm"><FileText size={16} className="text-green-500" /><span className="font-medium text-sm">报告生成</span></button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm"><FileTextIcon size={16} className="text-blue-500" /><span className="font-medium text-sm">通报仿写</span></button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm"><PieChart size={16} className="text-orange-500" /><span className="font-medium text-sm">探索分析</span></button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm"><Presentation size={16} className="text-red-500" /><span className="font-medium text-sm">PPT生成</span></button>
                <button onClick={() => onNavigate('smart-builder')} className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm cursor-pointer"><Layout size={16} className="text-blue-500" /><span className="font-medium text-sm">智能看板</span></button>
                <button onClick={() => onNavigate('agents')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-all shadow-sm"><Grid size={16} /><span className="font-medium text-sm">更多应用</span></button>
              </div>

              {/* 中央输入框 */}
              <div className="w-full max-w-4xl mb-12">
                 {renderInputBox()}
              </div>

              {/* 提问示例 */}
              <div className="w-full max-w-4xl">
                <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800 text-sm">提问示例 (点击填充问题，发送后开始问答)</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {suggestions.map((item, index) => (
                    <div key={index} onClick={() => handleSuggestionClick(item)} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all shadow-sm flex flex-col justify-between group hover:-translate-y-1">
                      <div className="font-bold text-gray-800 text-sm mb-3 group-hover:text-blue-600 transition-colors">{item.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.query}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // --- 对话流区域 ---
            <div className="w-full max-w-5xl mx-auto pb-32">
              {messages.map((msg, idx) => renderMessage(msg, idx))}

              {isLoading && (
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center text-white"><Bot size={16} /></div>
                  </div>
                  <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-3 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                    <span className="text-sm text-gray-500 font-medium">正在飞速思考中...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

        </div>
      </div>

      {isChatting && (
        <div className="absolute bottom-0 w-full flex justify-center p-6 bg-gradient-to-t from-[#f4f6f8] via-[#f4f6f8]/95 to-transparent transition-all duration-500 z-20 pointer-events-none">
          <div className="w-full max-w-4xl relative pointer-events-auto">
            {renderInputBox()}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [homeViewKey, setHomeViewKey] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const goHome = () => {
    setCurrentView('home');
    setHomeViewKey(prev => prev + 1);
  };

  const isAgentView = currentView === 'chat-agent-1';
  const historyData = isAgentView ? agentHistoryData : globalHistoryData;
  const historyTitle = isAgentView ? '舆情助手历史' : '历史对话';

  const breadcrumbMap = {
    home: '首页 > 智能问数',
    'agent-manage': '首页 > BI智能体 > 智能体管理',
    agents: '首页 > 智能体广场',
    'chat-agent-1': '首页 > 舆情分析助手',
    'smart-builder': '首页 > 智能看板'
  };
  const breadcrumbText = breadcrumbMap[currentView] || '首页';

  if (currentView === 'smart-builder') {
    return <SmartBuilderView onBack={goHome} />;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-800 overflow-hidden relative">
      {showQrCodeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center animate-in fade-in duration-200" onClick={() => setShowQrCodeModal(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQrCodeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><ScanLine size={32} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ChatBI 小程序体验</h3>
              <p className="text-sm text-gray-500 mb-6">请使用微信扫描下方二维码</p>
              <div className="bg-white border-2 border-gray-100 rounded-xl p-2 inline-block shadow-sm">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://chatbi.example.com" alt="QR Code" className="w-48 h-48 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Sidebar isCollapsed={isNavCollapsed} setIsCollapsed={setIsNavCollapsed} currentView={currentView} setCurrentView={setCurrentView} onGoHome={goHome} />

      <div className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-10 hidden md:flex transition-all duration-300 ${isChatCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-72 opacity-100'}`}>
        <div className="p-4 min-w-[18rem]">
          <button onClick={goHome} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium mb-6 group"><Plus size={18} /> 新建对话</button>
          <div className="space-y-2 mb-6">
             <div onClick={() => setCurrentView('chat-agent-1')} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border ${currentView === 'chat-agent-1' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-transparent'}`}>
               <div className="flex items-center gap-2"><div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-500"><User size={14} /></div><span className="text-sm text-gray-700">舆情分析助手</span></div>
             </div>
             <div onClick={() => setCurrentView('agents')} className="flex items-center justify-between p-2 bg-white border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:text-blue-600 text-gray-500 mt-2">
               <div className="flex items-center gap-2"><Grid size={14} /><span className="text-sm font-medium">更多 BI 智能体</span></div><ChevronRight size={14} />
             </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 min-w-[18rem]">
          <div className="px-2 mb-2">
            <div className="flex items-center justify-between mb-2 px-1"><div className="text-sm font-medium text-gray-500 flex items-center gap-1">{historyTitle}</div></div>
            <div className="relative mb-3"><Search size={14} className="absolute left-3 top-2.5 text-gray-400" /><input type="text" placeholder="搜索历史记录" className="w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500" /></div>
          </div>
          {historyData.map((item, i) => (
             <div key={i} className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer group relative">
               <div className="text-sm text-gray-700 font-medium mb-1 truncate pr-6">{item.title}</div>
               <div className="text-xs text-gray-400">{item.date}</div>
             </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50 relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-30">
          <button onClick={() => setIsChatCollapsed(!isChatCollapsed)} className="h-12 w-4 bg-white border border-l-0 border-gray-200 rounded-r-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-gray-50 shadow-sm">{isChatCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}</button>
        </div>
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-50 flex-shrink-0">
          <div className="flex items-center gap-4 pl-4">
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <span className="text-gray-800 font-medium">{breadcrumbText}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
              <div className="relative cursor-pointer p-1.5 rounded hover:bg-gray-100" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} className="text-gray-500" />
              </div>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50"><h3 className="font-bold text-gray-800 text-sm">通知公告</h3></div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {announcements.map((item) => (
                      <div key={item.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"><div className="flex justify-between items-start mb-1"><span className="text-[10px] px-1.5 py-0.5 rounded border text-red-500 border-red-200 bg-red-50">{item.tag}</span><span className="text-[10px] text-gray-400">{item.time}</span></div><p className="text-sm text-gray-700">{item.title}</p></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-4 w-px bg-gray-200 mx-1"></div>
            <button onClick={() => setShowQrCodeModal(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"><QrCode size={16} /><span className="hidden sm:inline">小程序体验</span></button>
          </div>
        </div>
        {currentView === 'home' && <HomeView key={homeViewKey} onNavigate={setCurrentView} />}
        {currentView === 'agent-manage' && <AgentManageView />}
        {currentView === 'agents' && <AgentsView onNavigate={setCurrentView} />}
        {currentView === 'chat-agent-1' && <ChatAgentView onBack={goHome} />}
      </div>
    </div>
  );
}
