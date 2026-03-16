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
  Code,
  Copy,
  Check,
  StarOff,
  Pencil,
  Eye
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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

const TEMPLATE_CSS_RAW = `
/* 全局样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* 主色调 */
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    --primary-light: #3b82f6;
    
    /* 辅助色 */
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    
    /* 中性色 */
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-light: #9ca3af;
    --border-color: #e5e7eb;
    --bg-light: #f9fafb;
    --bg-white: #ffffff;
    
    /* 商务背景色 */
    --business-bg-primary: #f8f9fb;
    --business-bg-secondary: #eef1f5;
    --business-bg-accent: #e8ecf2;
    
    /* 阴影 */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* 圆角 */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* 过渡 */
    --transition: all 0.3s ease;
    
    /* A4 纸张尺寸 */
    --a4-width: 210mm;
    --a4-padding: 15mm;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background: linear-gradient(135deg, 
        #dfe6ed 0%, 
        #c8d4e0 50%, 
        #d5dfe8 100%);
    background-attachment: fixed;
    max-width: var(--a4-width);
    margin: 0 auto;
    padding: 20px 0;
    min-height: 100vh;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--a4-width);
    height: 100vh;
    background: linear-gradient(180deg, 
        #ffffff 0%, 
        #fafbfc 30%, 
        #f8f9fa 70%, 
        #ffffff 100%);
    box-shadow: 
        0 0 40px rgba(0, 0, 0, 0.08),
        0 0 80px rgba(0, 0, 0, 0.04),
        inset 0 0 0 1px rgba(0, 0, 0, 0.02);
    z-index: -1;
    pointer-events: none;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--bg-white);
    box-shadow: var(--shadow-md);
    z-index: 1000;
    height: 64px;
    display: block;
    border-top: 3px solid var(--primary-color);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-color);
}

.brand-icon {
    font-size: 28px;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 8px;
}

.nav-link {
    display: block;
    padding: 10px 20px;
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    border-radius: var(--radius-md);
    transition: var(--transition);
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-color);
    background: rgba(37, 99, 235, 0.08);
}

.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 100px 32px 60px;
    margin-top: 64px;
    border-bottom: 4px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
        0 4px 12px rgba(102, 126, 234, 0.3),
        inset 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.hero-content {
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
}

.hero-title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
}

.hero-subtitle {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 24px;
}

.hero-meta {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    opacity: 0.9;
}

.main-content {
    max-width: 100%;
    margin: 0 auto;
    overflow-x: hidden;
}

.section {
    padding: 15mm;
    margin-bottom: 0;
    box-shadow: none;
    border-radius: 0;
    page-break-inside: auto;
    page-break-after: auto;
    border-bottom: 1px solid #e5e7eb;
    background: white !important;
    overflow-x: hidden;
}

.section-header {
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--bg-light);
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.section-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border-radius: var(--radius-md);
    font-size: 18px;
    font-weight: 700;
}

.section-desc {
    font-size: 14px;
    color: var(--text-secondary);
    margin-left: 52px;
}
`;

const TEMPLATE_HTML_RAW = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>上海产业园区春节前后人流数据分析报告</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand"><span class="brand-icon">📊</span><span class="brand-text">数据分析报告</span></div>
            <ul class="nav-menu">
                <li><a href="#overview" class="nav-link active">总览</a></li>
                <li><a href="#population" class="nav-link">人群画像</a></li>
                <li><a href="#trends" class="nav-link">人流趋势</a></li>
                <li><button onclick="window.print()" class="nav-link" style="background:#2563eb;color:#fff;border:none;">导出PDF</button></li>
            </ul>
        </div>
    </nav>
    <header class="hero">
        <div class="hero-content">
            <h1 class="hero-title">上海产业园区春节前后人流数据分析报告</h1>
            <p class="hero-subtitle">基于工业、科技、金融三类园区的综合分析</p>
            <div class="hero-meta">
                <span class="meta-item">📅 春节前后31天</span>
                <span class="meta-item">🏢 工业/科技/金融</span>
                <span class="meta-item">📍 上海全市</span>
            </div>
        </div>
    </header>
    <main class="main-content">
        <section id="overview" class="section">
            <div class="section-header">
                <h2 class="section-title"><span class="section-number">01</span>整体分析总览</h2>
                <p class="section-desc">人流量变化趋势与复工情况总览</p>
            </div>
            <div class="section-summary">
                <div class="summary-icon">💡</div>
                <div class="summary-content">
                    <h4>核心洞察</h4>
                    <p>春节前后园区人流呈现 V 型复苏态势，节后复工率达到 87.6%，科技园区新增人员比例最高（8.2%）。</p>
                </div>
            </div>
        </section>
    </main>
    <footer class="footer">
        <div class="footer-content">
            <p class="footer-text">© 2024 上海产业园区春节前后人流数据分析报告</p>
            <p class="footer-text">数据来源：园区人脸识别系统</p>
        </div>
    </footer>
</body>
</html>
`;

const TEMPLATE_HTML_WITH_CSS = TEMPLATE_HTML_RAW
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${TEMPLATE_CSS_RAW}</style>`)
  .replace('<script src="script.js"></script>', '');

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
    id: 'report-manage',
    label: '报告管理',
    icon: Sparkles,
    type: 'submenu',
    children: [
      { id: 'report-favorite', label: '报告收藏', type: 'item', view: 'report-favorite' },
      { id: 'html-template-manage', label: 'HTML模版管理', type: 'item', view: 'html-template-manage' }
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

const suggestionsMap = {
  qa: [
    { title: '指标查询', query: '收入情况如何？', files: [{ name: '各省份营收表.xlsx', size: '24.1MB' }] },
    { title: '精准查询', query: '2024年12月湖北省通话收入是多少？', files: [{ name: '用户通信费用日表.csv', size: '13.39k' }] },
    { title: '趋势分析', query: '去年每月通话收入趋势如何？', files: [{ name: '月度收入趋势表.xlsx', size: '5.2MB' }] },
    { title: '多表关联分析', query: '分析用户套餐与投诉率的关联关系', files: [{ name: '用户套餐明细.csv', size: '45.2MB' }, { name: '投诉记录_2025.csv', size: '102k' }] },
    { title: '同比环比', query: '对比近三个月各省通话收入的环比增长率', files: [{ name: '月度收入趋势表.xlsx', size: '5.2MB' }] },
    { title: 'TOP排名', query: '通话收入最高的前10个省份是哪些？', files: [{ name: '各省份营收表.xlsx', size: '24.1MB' }] },
  ],
  report: [
    { title: '月度经营报告', query: '帮我生成2024年12月份经营分析报告', files: [{ name: '月度经营数据.xlsx', size: '18.5MB' }] },
    { title: '用户发展报告', query: '生成本季度用户发展情况分析报告', files: [{ name: '用户发展统计表.csv', size: '8.7MB' }] },
    { title: '收入分析报告', query: '生成各省份收入对比分析报告', files: [{ name: '各省份营收表.xlsx', size: '24.1MB' }] },
    { title: '成本分析报告', query: '帮我生成网络运维成本分析报告', files: [{ name: '运维成本明细.csv', size: '32.4MB' }] },
    { title: '竞争分析报告', query: '生成与竞对运营商的市场份额对比报告', files: [{ name: '行业数据汇总.xlsx', size: '15.3MB' }] },
    { title: '满意度报告', query: '生成客户满意度调查分析报告', files: [{ name: '满意度调查数据.csv', size: '6.1MB' }] },
  ],
  brief: [
    { title: '经营简报', query: '仿写一份本月经营情况通报', files: [{ name: '月度经营数据.xlsx', size: '18.5MB' }] },
    { title: '网络质量通报', query: '仿写一份网络质量分析通报', files: [{ name: '网络质量指标.csv', size: '12.3MB' }] },
    { title: '客户投诉通报', query: '仿写本周客户投诉处理情况通报', files: [{ name: '投诉记录_2025.csv', size: '102k' }] },
    { title: '营销活动通报', query: '仿写一份营销活动效果总结通报', files: [{ name: '营销数据汇总.xlsx', size: '9.8MB' }] },
    { title: '安全生产通报', query: '仿写一份安全生产检查情况通报', files: [{ name: '安全检查记录.csv', size: '3.2MB' }] },
    { title: '人员培训通报', query: '仿写一份员工培训完成情况通报', files: [{ name: '培训记录表.xlsx', size: '2.1MB' }] },
  ],
  explore: [
    { title: '用户行为洞察', query: '分析���价值用户的消费行为特征', files: [{ name: '用户消费明细.csv', size: '56.8MB' }] },
    { title: '流失原因探索', query: '探索用户流失的主要原因和关键因素', files: [{ name: '用户流失数据.csv', size: '23.4MB' }] },
    { title: '区域差异分析', query: '探索不同区域用户消费习惯的差异', files: [{ name: '区域消费数据.xlsx', size: '34.7MB' }] },
    { title: '异常检测', query: '检测近一个月的收入异常波动数据', files: [{ name: '日收入明细.csv', size: '41.2MB' }] },
    { title: '关联规则挖掘', query: '挖掘套餐订购与增值业务使用的关联规则', files: [{ name: '业务订购数据.csv', size: '67.3MB' }] },
    { title: '聚类分析', query: '对用户群体进行消费行为聚类分析', files: [{ name: '用户画像数据.xlsx', size: '28.9MB' }] },
  ],
  html: [
    { title: '流失用户分析', query: '帮我生成一个流失用户分析报告', files: [{ name: '用户流失数据.csv', size: '23.4MB' }], template: '通用仪表盘' },
    { title: '园区人流看板', query: '生成产业园区春节前后人流数据分析页面', files: [{ name: '园区人流统计.xlsx', size: '15.6MB' }], template: '运营看板' },
    { title: '收入趋势大屏', query: '生成各省份月度收入趋势可视化大屏', files: [{ name: '各省份营收表.xlsx', size: '24.1MB' }], template: '通用仪表盘' },
    { title: '用户画像页面', query: '生成用户画像分析交互页面', files: [{ name: '用户画像数据.xlsx', size: '28.9MB' }], template: '用户分析' },
    { title: '投诉分析看板', query: '生成客户投诉数据分析可视化页面', files: [{ name: '投诉记录_2025.csv', size: '102k' }], template: '运营看板' },
    { title: '套餐对比页面', query: '生成各类套餐使用情况对比分析页面', files: [{ name: '套餐明细数据.csv', size: '19.5MB' }], template: '用户分析' },
  ],
  board: [
    { title: '经营分析看板', query: '帮我生成一个经营分析的看板并对时间进行过滤查询', files: [{ name: '经营数据汇总.xlsx', size: '18.5MB' }] },
    { title: '宽带业务看板', query: '生成一个宽带业务看板', files: [{ name: '宽带业务数据.csv', size: '12.3MB' }] },
    { title: '营业厅业绩看板', query: '生成各属地营业厅业绩看板', files: [{ name: '营业厅业绩表.xlsx', size: '15.6MB' }] },
    { title: '区域对比看板', query: '生成各区域新增业务对比看板', files: [{ name: '区域业务数据.csv', size: '9.8MB' }] },
  ],
};

const announcements = [
  { id: 1, tag: '通知', title: '系统新版本升级通知，新功能介绍...', isRed: true, time: '10分钟前' },
  { id: 2, tag: '通知', title: '国庆节放假安排通知，请提前做好准备...', isRed: true, time: '1小时前' },
  { id: 3, tag: '通知', title: '系统新版本升级通知，新功能介绍...', isRed: true, time: '今天 09:45' },
  { id: 4, tag: '通知', title: '产品试用期即将到期，请尽快续费...', isRed: true, time: '昨天 18:20' },
  { id: 5, tag: '通知', title: '国庆节团购活动通知，限时优惠开启...', isRed: true, time: '昨天 15:06' },
  { id: 6, tag: '通知', title: '产品试用期即将到期，请尽快续费...', isRed: true, time: '10月01日' },
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
  { id: 1, name: '舆情分析助手', status: '已发布', desc: '智能化舆情监测与分析，实时掌握网络动态，精准洞察公众情绪', owner: '胡维达', update: '2026-02-09 17:44:04' },
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
const simulateAIResponse = (query, mode = 'qa', templateTitle = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mode === 'board') {
        const q = query.toLowerCase();
        const isRemove = q.includes('删除') || q.includes('去掉') || q.includes('移除') || q.includes('取消');
        const isAdd = q.includes('增加') || q.includes('添加') || q.includes('加上') || q.includes('加个');
        const isFilterOp = q.includes('过滤') || q.includes('筛选');

        // Column keyword mapping — all possible columns
        const colKeywords = [
          { key: 'date', kw: ['日期', '时间'] }, { key: 'area', kw: ['属地', '地区', '城市'] },
          { key: 'district', kw: ['���县', '区', '县'] }, { key: 'street', kw: ['街道', '乡镇'] },
          { key: 'grid', kw: ['网格'] }, { key: 'hall', kw: ['营业厅'] },
          { key: 'newCount', kw: ['新增办理量', '新增办理', '新增量'] }, { key: 'newRevenue', kw: ['新增收入'] },
          { key: 'broadbandCount', kw: ['宽带办理量', '宽带办理', '宽带量'] }, { key: 'broadbandRevenue', kw: ['宽带收入'] },
          { key: 'profit', kw: ['利润'] }, { key: 'profitRate', kw: ['利润率'] },
          { key: 'userCount', kw: ['用户数', '用户量'] }, { key: 'churnRate', kw: ['流失率'] }, { key: 'satisfaction', kw: ['满意度'] },
        ];
        const matchedCols = colKeywords.filter(c => c.kw.some(kw => q.includes(kw)));

        // Filter definitions for filter bar
        const filterDefs = [
          { type: 'date', keywords: ['日期', '时间', '日期过滤', '时间过滤', '日期筛选', '时间筛选'], label: '日期筛选' },
          { type: 'area', keywords: ['属地', '地区', '区域', '城市'], label: '属地筛选' },
          { type: 'district', keywords: ['区县'], label: '区县筛选' },
          { type: 'grid', keywords: ['网格'], label: '网格筛选' },
          { type: 'hall', keywords: ['营业厅'], label: '营业厅筛选' },
        ];

        // --- Remove columns or filters ---
        if (isRemove && matchedCols.length > 0 && !isFilterOp) {
          const names = matchedCols.map(c => BOARD_ALL_COLUMNS[c.key]?.label || c.key);
          resolve({ type: 'board_column_change', action: 'remove', columns: matchedCols.map(c => c.key), text: `好的，已为您移除${names.map(n => `「${n}」`).join('、')}列。` });
          return;
        }
        if (isRemove && isFilterOp) {
          const matched = filterDefs.find(f => f.keywords.some(kw => q.includes(kw)));
          if (matched) {
            resolve({ type: 'board_filter_change', action: 'remove', filterType: matched.type, text: `好的，已为您移除「${matched.label}」条件。` });
          } else {
            resolve({ type: 'board_filter_change', action: 'remove_all', text: '好的，已为您清除所有筛选条件。' });
          }
          return;
        }
        if (isRemove) {
          const matched = filterDefs.find(f => f.keywords.some(kw => q.includes(kw)));
          if (matched) { resolve({ type: 'board_filter_change', action: 'remove', filterType: matched.type, text: `好的，已为您移除「${matched.label}」条件。` }); return; }
          resolve({ type: 'board_filter_change', action: 'remove_all', text: '好的，已为您清除所有筛选条件。' }); return;
        }

        // --- Add columns or filters ---
        if (isAdd && matchedCols.length > 0 && !isFilterOp && !q.includes('看板')) {
          const names = matchedCols.map(c => BOARD_ALL_COLUMNS[c.key]?.label || c.key);
          resolve({ type: 'board_column_change', action: 'add', columns: matchedCols.map(c => c.key), text: `好的，已为您添加${names.map(n => `「${n}」`).join('、')}列。看板已更新。` });
          return;
        }
        if ((isAdd || isFilterOp) && !q.includes('看板')) {
          const matchedFilters = filterDefs.filter(f => f.keywords.some(kw => q.includes(kw)));
          if (matchedFilters.length > 0) {
            resolve({ type: 'board_filter_change', action: 'add', filters: matchedFilters.map(m => ({ type: m.type, label: m.label })), text: `好的，已为您添加${matchedFilters.map(m => `「${m.label}」`).join('、')}条件。看板已更新。` });
            return;
          }
        }

        // --- Default: generate dashboard ---
        const title = query.includes('经营') ? '经营分析看板' : query.includes('宽带') ? '宽带业务看板' : query.includes('营业厅') ? '营业厅业绩看板' : query.slice(0, 10) + '看板';
        const initFilters = filterDefs.filter(f => f.keywords.some(kw => q.includes(kw))).map(f => ({ type: f.type, label: f.label }));
        resolve({
          type: 'board_dashboard',
          title,
          initFilters,
          text: `好的，我已根据您的需求生成了「${title}」。看板包含${initFilters.length > 0 ? initFilters.map(f => f.label).join('、') : '日期过滤器'}和详细数据表格，涵盖新增业务和宽带业务的办理量与收入数据。您可以通过对话添加或删除列与筛选条件，也可以右键点击维度列进行下钻。`,
        });
        return;
      }
      if (mode === 'html') {
        const safeTitle = templateTitle || query.trim() || '页面原型';
        const fileBase = safeTitle.replace(/\s+/g, '').slice(0, 8) || 'prototype';
        const fileName = `${fileBase}.html`;
        const previewHtml = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f6f8fb; padding:24px;">
            <div style="max-width:860px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
              <div style="padding:28px 32px;border-bottom:1px solid #f1f5f9;background:linear-gradient(90deg,#eef2ff,#f8fafc);">
                <div style="font-size:14px;color:#64748b;letter-spacing:0.6px;">HTML 页面原型预览</div>
                <div style="font-size:26px;font-weight:700;color:#0f172a;margin-top:6px;">${safeTitle}</div>
                <div style="font-size:14px;color:#64748b;margin-top:10px;max-width:520px;">这是一份可直接落地的页面原型，可按你的需求继续细化模块与视觉风格。</div>
              </div>
              <div style="padding:24px 32px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
                <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                  <div style="font-size:12px;color:#94a3b8;">模块</div>
                  <div style="font-size:16px;font-weight:600;color:#0f172a;margin-top:6px;">核心指标</div>
                  <div style="font-size:12px;color:#64748b;margin-top:10px;">展示关键KPI卡片与趋势。</div>
                </div>
                <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                  <div style="font-size:12px;color:#94a3b8;">模块</div>
                  <div style="font-size:16px;font-weight:600;color:#0f172a;margin-top:6px;">用户分群</div>
                  <div style="font-size:12px;color:#64748b;margin-top:10px;">呈现人群画像与洞察。</div>
                </div>
                <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                  <div style="font-size:12px;color:#94a3b8;">模块</div>
                  <div style="font-size:16px;font-weight:600;color:#0f172a;margin-top:6px;">行动建议</div>
                  <div style="font-size:12px;color:#64748b;margin-top:10px;">输出可执行的策略建议。</div>
                </div>
              </div>
              <div style="padding:0 32px 28px;">
                <button style="background:#4f46e5;color:#fff;border:none;border-radius:10px;padding:10px 18px;font-weight:600;cursor:pointer;">开始使用</button>
                <button style="background:#ffffff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:10px;padding:10px 18px;font-weight:600;margin-left:10px;cursor:pointer;">查看详情</button>
              </div>
            </div>
          </div>
        `;
        const code = TEMPLATE_HTML_WITH_CSS.replace('上海产业园区春节前后人流数据分析报告', safeTitle);
        resolve({
          type: 'html_prototype',
          title: safeTitle,
          fileName,
          code,
          sql: `-- SQL 示例\nSELECT province_id, SUM(call_fee) AS call_revenue\nFROM user_comm_fee_daily\nWHERE stat_date BETWEEN '2025-01-01' AND '2025-12-31'\nGROUP BY province_id\nORDER BY call_revenue DESC;`,
          python: `# Python 示例\nimport pandas as pd\n\ndf = pd.read_csv("user_comm_fee_daily.csv")\nresult = (\n    df.query("stat_date >= '2025-01-01' and stat_date <= '2025-12-31'")\n      .groupby("province_id", as_index=False)["call_fee"].sum()\n      .sort_values("call_fee", ascending=False)\n)\nprint(result.head())`,
          previewHtml: code
        });
        return;
      }
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

// Hierarchical location data for drill-down
const LOCATION_HIERARCHY = {
  '南京': { districts: ['玄武区', '鼓楼区', '建邺区', '秦淮区', '栖霞区'], grids: ['玄武网格', '鼓楼网格', '建邺网格'], halls: ['新街口营业厅', '河西营业厅', '仙林营业厅'] },
  '苏州': { districts: ['姑苏区', '吴中区', '工业园区', '虎丘区', '相城区'], grids: ['姑苏网格', '吴中网格', '工业园网格'], halls: ['观前街营业厅', '吴中营业厅', '园区营业厅'] },
  '无锡': { districts: ['梁溪区', '锡山区', '滨湖区', '惠山区', '新吴区'], grids: ['梁溪网格', '锡山网格', '滨湖网格'], halls: ['中山路营业厅', '锡山营业厅', '滨湖营业厅'] },
  '常州': { districts: ['天宁区', '钟楼区', '新北区', '武进区'], grids: ['天宁网格', '钟楼网格'], halls: ['南大街营业厅', '钟楼营业厅'] },
  '南通': { districts: ['崇川区', '通州区', '海门区', '如皋市'], grids: ['崇川网格', '通州网格'], halls: ['崇川营业厅', '通州营业厅'] },
};

const DISTRICT_STREETS = {
  '玄武区': ['梅园新村街道', '孝陵卫街道', '玄武门街道'], '鼓楼区': ['宁海路街道', '华侨路街道', '湖南路街道'], '建邺区': ['沙洲街道', '双闸街道', '江心洲街道'],
  '秦淮区': ['夫子庙街道', '朝天宫街道', '大光路街道'], '栖霞区': ['仙林街道', '马群街道', '尧化街道'],
  '姑苏区': ['平江街道', '��阊街道', '沧浪街道'], '吴中区': ['木渎镇', '甪直镇', '胥口镇'], '工业园区': ['娄葑街道', '斜塘街道', '唯亭街道'],
  '虎丘区': ['狮山街道', '枫桥街道'], '相城区': ['元和街道', '太平街道'],
  '梁溪区': ['崇安寺街道', '通江街道', '广瑞路街道'], '锡山区': ['东亭街道', '安镇街道'], '滨湖区': ['河埒街道', '荣巷街道', '蠡湖街道'],
  '惠山区': ['堰桥街道', '长安街道'], '新吴区': ['旺庄街道', '硕放街道'],
  '天宁区': ['雕庄街道', '青龙街道'], '钟楼区': ['北港街道', '西林街道'], '新北区': ['河海街道', '三井街道'], '武进区': ['湖塘镇', '牛塘镇'],
  '崇川区': ['城东街道', '和平桥街道'], '通州区': ['金沙街道', '兴仁镇'], '海门区': ['海门街道', '三厂街道'], '如皋市': ['如城街道', '白蒲镇'],
};

// All possible columns definition
const BOARD_ALL_COLUMNS = {
  // Dimensions
  date:     { key: 'date', label: '日期', group: 'dim', isDim: true },
  area:     { key: 'area', label: '属地', group: 'dim', isDim: true, drillChildren: ['district'] },
  district: { key: 'district', label: '区县', group: 'dim', isDim: true, drillChildren: ['street'], drillParent: 'area' },
  street:   { key: 'street', label: '街道', group: 'dim', isDim: true, drillParent: 'district' },
  grid:     { key: 'grid', label: '网格', group: 'dim', isDim: true },
  hall:     { key: 'hall', label: '营业厅', group: 'dim', isDim: true },
  // Metrics — grouped
  newCount:          { key: 'newCount', label: '新增办理量', group: '新增业务', groupColor: 'blue' },
  newRevenue:        { key: 'newRevenue', label: '新增收入', group: '新增业务', groupColor: 'blue', format: 'money' },
  broadbandCount:    { key: 'broadbandCount', label: '宽带办理量', group: '宽带业务', groupColor: 'emerald' },
  broadbandRevenue:  { key: 'broadbandRevenue', label: '宽带收入', group: '宽带业务', groupColor: 'emerald', format: 'money' },
  // Extra metrics available for adding
  profit:            { key: 'profit', label: '利润', group: '利润指标', groupColor: 'orange', format: 'money' },
  profitRate:        { key: 'profitRate', label: '利润率', group: '利润指标', groupColor: 'orange', format: 'percent' },
  userCount:         { key: 'userCount', label: '用户数', group: '用户指标', groupColor: 'purple' },
  churnRate:         { key: 'churnRate', label: '流失率', group: '用户指标', groupColor: 'purple', format: 'percent' },
  satisfaction:      { key: 'satisfaction', label: '满意度', group: '用户指标', groupColor: 'purple', format: 'percent' },
};

const BOARD_DEFAULT_COLUMNS = ['date', 'area', 'grid', 'hall', 'newCount', 'newRevenue', 'broadbandCount', 'broadbandRevenue'];

const DASHBOARD_MOCK_DATA = (() => {
  const areas = Object.keys(LOCATION_HIERARCHY);
  const rows = [];
  for (let m = 1; m <= 3; m++) {
    for (let d = 1; d <= 10; d++) {
      const area = areas[(m * 3 + d) % areas.length];
      const loc = LOCATION_HIERARCHY[area];
      const gi = (d + m) % loc.grids.length;
      const hi = (d + m) % loc.halls.length;
      const di = (d + m) % loc.districts.length;
      const district = loc.districts[di];
      const streets = DISTRICT_STREETS[district] || ['未知街道'];
      const si = (d + m * 2) % streets.length;
      const date = `2025-${String(m).padStart(2, '0')}-${String(d * 3 > 28 ? 28 : d * 3).padStart(2, '0')}`;
      rows.push({
        date,
        area,
        district,
        street: streets[si],
        grid: loc.grids[gi],
        hall: loc.halls[hi],
        newCount: Math.floor(50 + Math.random() * 200),
        newRevenue: Math.floor(2000 + Math.random() * 8000),
        broadbandCount: Math.floor(10 + Math.random() * 80),
        broadbandRevenue: Math.floor(1000 + Math.random() * 5000),
        profit: Math.floor(500 + Math.random() * 3000),
        profitRate: Math.floor(10 + Math.random() * 40),
        userCount: Math.floor(100 + Math.random() * 500),
        churnRate: +(1 + Math.random() * 8).toFixed(1),
        satisfaction: Math.floor(75 + Math.random() * 25),
      });
    }
  }
  return rows;
})();

// SmartBuilderView removed — board mode is now handled inline in HomeView

const ChatAgentView = ({ onBack, onNavigate, onGenTypeChange, favoriteReports, setFavoriteReports, agentInfo }) => (
  <HomeView
    onNavigate={onNavigate || (() => {})}
    favoriteReports={favoriteReports}
    setFavoriteReports={setFavoriteReports}
    agentInfo={agentInfo || { name: '舆情分析助手', desc: '智能化舆情监测与分析，实时掌握网络动态，精准洞察公众情绪，为决策提供数据支持' }}
    onGenTypeChange={onGenTypeChange}
  />
);

const AgentsView = ({ onNavigate }) => {
  const publishedAgents = agentManageData.filter(item => item.status === '已发布');
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500"><Bot size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">更多BI智能体</h2>
              <p className="text-sm text-gray-400">已发布的智能体 ({publishedAgents.length} 个在线)</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
          {publishedAgents.map((item) => (
            <div key={item.id} onClick={() => onNavigate('chat-agent-1')} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-3">
                <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${item.id}`} alt="avatar" className="w-10 h-10 rounded-xl bg-blue-50" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{item.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-emerald-600 font-medium">{item.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-xs mt-3 min-h-[18px] line-clamp-2">{item.desc}</div>
              <div className="h-px bg-gray-100 my-3"></div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.owner}</span>
                <span>最近编辑：{item.update}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500"><Settings size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">智能体管理</h2>
              <p className="text-sm text-gray-400">管理和配置 BI 智能体</p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
            <Plus size={16} /> 创建智能体
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 mb-5">
          <div className="bg-gray-100 rounded-xl p-1 flex items-center">
            {['全部', '已发布', '未发布'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="搜索智能体"
              className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 relative hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${item.id}`} alt="avatar" className="w-10 h-10 rounded-xl bg-blue-50" />
                  <div>
                    <div className="text-sm font-bold text-gray-800 mb-1">{item.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className={`w-2 h-2 rounded-full ${item.status === '已发布' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                      <span className={`${item.status === '已发布' ? 'text-emerald-600' : 'text-gray-400'} font-medium`}>{item.status}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)} className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="text-gray-400 text-xs mt-3 min-h-[18px] line-clamp-2">{item.desc}</div>
              <div className="h-px bg-gray-100 my-3"></div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.owner}</span>
                <span>最近编辑：{item.update}</span>
              </div>

              {menuOpenId === item.id && (
                <div className="absolute right-4 top-12 bg-white rounded-xl border border-gray-200 shadow-xl w-28 py-1.5 z-20">
                  {['发布', '赋权', '修改', '复制'].map((action) => (
                    <button key={action} className="w-full text-left px-4 py-1.5 text-xs text-gray-700 hover:bg-gray-50">{action}</button>
                  ))}
                  <button className="w-full text-left px-4 py-1.5 text-xs text-red-500 hover:bg-red-50">删除</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- HomeView：集成多轮对话流引擎 ---
const HomeView = ({ onNavigate, favoriteReports, setFavoriteReports, agentInfo, onGenTypeChange }) => {
  const [inputText, setInputText] = useState('');
  const [activeFiles, setActiveFiles] = useState([{ name: '用户通信费用日表.csv', size: '13.39k' }]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('fast');
  const [generationType, setGenerationTypeRaw] = useState('qa');
  const setGenerationType = (val) => {
    setGenerationTypeRaw(val);
    onGenTypeChange?.(val);
    // Reset board state when switching away
    if (val !== 'board') { setBoardDashboardVisible(false); setBoardStreamingMsgId(null); setBoardSteps([]); setBoardStreamingText(''); setBoardFilters([]); setBoardColumns(BOARD_DEFAULT_COLUMNS); setBoardContextMenu(null); }
  };
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [expandedThinking, setExpandedThinking] = useState(null);
  const [htmlTabById, setHtmlTabById] = useState({});
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [tempSelectedTemplateId, setTempSelectedTemplateId] = useState(null);
  const [selectedModel, setSelectedModel] = useState('Qwen3-30B-A3B');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showFavoriteConfirm, setShowFavoriteConfirm] = useState(false);
  const [favoriteInputName, setFavoriteInputName] = useState('');
  const [showFavoriteSuccess, setShowFavoriteSuccess] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [showTemplateWarning, setShowTemplateWarning] = useState(false);
  const [showTemplateChangeConfirm, setShowTemplateChangeConfirm] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState(null);
  const [showMoreApps, setShowMoreApps] = useState(false);
  const [preferredAppIds, setPreferredAppIds] = useState(() => {
    const saved = window.localStorage.getItem('chatbi_preferred_apps');
    return saved ? JSON.parse(saved) : ['qa', 'report', 'brief', 'explore', 'html'];
  });
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState('sql');
  const [htmlStage, setHtmlStage] = useState(0);
  const [htmlCodeDone, setHtmlCodeDone] = useState(false);
  const [streamedTextById, setStreamedTextById] = useState({});
  const [streamedCodeById, setStreamedCodeById] = useState({ sql: '', python: '', html: '' });
  const [rightTab, setRightTab] = useState('sync'); // 'sync' | 'files'
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [openedFile, setOpenedFile] = useState(null); // 'sql' | 'python' | 'html' | null
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showChatShareModal, setShowChatShareModal] = useState(false);
  const [chatShareLink, setChatShareLink] = useState('');
  const [chatShareCopied, setChatShareCopied] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedElInfo, setSelectedElInfo] = useState(null); // { tag, text, rect, path }
  const [editInstruction, setEditInstruction] = useState('');
  const [isApplyingEdit, setIsApplyingEdit] = useState(false);
  // Board (智能看板) state
  const [boardDashboardVisible, setBoardDashboardVisible] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardStreamingText, setBoardStreamingText] = useState('');
  const [boardStreamingMsgId, setBoardStreamingMsgId] = useState(null);
  const [boardSteps, setBoardSteps] = useState([]);
  // Dynamic filters: [{ id, type: 'date'|'area'|'grid'|'hall', label, values: {start,end} | Set }]
  const [boardFilters, setBoardFilters] = useState([]);
  // Dynamic table columns (ordered list of column keys)
  const [boardColumns, setBoardColumns] = useState(BOARD_DEFAULT_COLUMNS);
  // Right-click drill-down context menu
  const [boardContextMenu, setBoardContextMenu] = useState(null); // { x, y, colKey, cellValue }
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [msgVotes, setMsgVotes] = useState({}); // { [msgId]: 'up' | 'down' | null }

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const modelDropdownRef = useRef(null);
  const codeScrollRef = useRef(null);
  const previewIframeRef = useRef(null);
  const leftChatRef = useRef(null);

  const modelOptions = ['qwen3-max', 'qwen3-32b', 'Qwen3-30B-A3B', 'qwen3-coder-plus', 'deepseek-v3.2', 'qwen2-72b-instruct'];
  const htmlTemplates = [
    { id: 'tpl-1', title: '通用仪表盘', author: 'Admin', date: '2026-10-11', heat: 20 },
    { id: 'tpl-2', title: '用户分析', author: 'Admin', date: '2026-10-11', heat: 20 },
    { id: 'tpl-3', title: '运营看板', author: 'Admin', date: '2026-10-11', heat: 20 }
  ];
  const appButtons = [
    { id: 'qa', label: '智能问数', icon: Sparkles, action: () => { setGenerationType('qa'); setShowAllSuggestions(false); } },
    { id: 'report', label: '报告生成', icon: FileText, action: () => { setGenerationType('report'); setShowAllSuggestions(false); }, iconClass: 'text-green-500' },
    { id: 'brief', label: '通报仿写', icon: FileTextIcon, action: () => { setGenerationType('brief'); setShowAllSuggestions(false); } },
    { id: 'explore', label: '探索分析', icon: PieChart, action: () => { setGenerationType('explore'); setShowAllSuggestions(false); }, iconClass: 'text-orange-500' },
    { id: 'html', label: 'HTML页面生成', icon: Code, action: () => { setGenerationType('html'); setShowAllSuggestions(false); }, iconClass: 'text-indigo-500' },
    { id: 'board', label: '智能看板', icon: Layout, action: () => { setGenerationType('board'); setShowAllSuggestions(false); }, iconClass: 'text-blue-500' }
  ];
  const appMap = Object.fromEntries(appButtons.map((app) => [app.id, app]));
  const primaryApps = preferredAppIds.map((id) => appMap[id]).filter(Boolean).slice(0, 5);
  const moreApps = appButtons.filter((app) => !primaryApps.some((p) => p.id === app.id));
  const latestHtmlMsg = [...messages].reverse().find(msg => msg.type === 'html_prototype');
  const publicBase = import.meta.env.BASE_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // 左侧聊天区也滚到底部
    if (leftChatRef.current) {
      leftChatRef.current.scrollTop = leftChatRef.current.scrollHeight;
    }
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

  useEffect(() => {
    window.localStorage.setItem('chatbi_preferred_apps', JSON.stringify(preferredAppIds));
  }, [preferredAppIds]);

  useEffect(() => {
    if (!latestHtmlMsg) return;
    let step = 0;
    setHtmlStage(0);
    setHtmlCodeDone(false);
    setActiveArtifact('sql');
    setStreamedCodeById({ sql: '', python: '', html: '' });
    setRightTab('sync');
    setOpenedFile(null);
    const timer = setInterval(() => {
      step += 1;
      if (step === 1) {
        setHtmlStage(1);
        setActiveArtifact('sql');
      } else if (step === 2) {
        setHtmlStage(2);
        setActiveArtifact('python');
      } else if (step === 3) {
        setHtmlStage(3);
        setActiveArtifact('html');
        clearInterval(timer);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, [latestHtmlMsg]);

  useEffect(() => {
    if (!latestHtmlMsg) return;
    const fullText = `已生成 HTML 页面原型草稿：${latestHtmlMsg.fileName}。将按 SQL → Python → HTML 的顺序产出文件，并在右侧预览。`;
    let i = 0;
    const id = latestHtmlMsg.id;
    const timer = setInterval(() => {
      i += 1;
      setStreamedTextById((prev) => ({ ...prev, [id]: fullText.slice(0, i) }));
      if (i >= fullText.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [latestHtmlMsg]);

  useEffect(() => {
    if (!latestHtmlMsg) return;
    if (htmlStage === 1) {
      const full = latestHtmlMsg.sql || '';
      let i = 0;
      const timer = setInterval(() => {
        i += 4;
        setStreamedCodeById((prev) => ({ ...prev, sql: full.slice(0, i) }));
        if (i >= full.length) clearInterval(timer);
      }, 3);
      return () => clearInterval(timer);
    }
    if (htmlStage === 2) {
      const full = latestHtmlMsg.python || '';
      let i = 0;
      const timer = setInterval(() => {
        i += 4;
        setStreamedCodeById((prev) => ({ ...prev, python: full.slice(0, i) }));
        if (i >= full.length) clearInterval(timer);
      }, 3);
      return () => clearInterval(timer);
    }
    if (htmlStage === 3) {
      const full = latestHtmlMsg.code || '';
      let i = 0;
      const timer = setInterval(() => {
        i += 6;
        setStreamedCodeById((prev) => ({ ...prev, html: full.slice(0, i) }));
        if (i >= full.length) {
          clearInterval(timer);
          setActiveArtifact('preview');
          setHtmlCodeDone(true);
        }
      }, 2);
      return () => clearInterval(timer);
    }
  }, [latestHtmlMsg, htmlStage]);

  // 右侧代码区自动滚动到底部
  useEffect(() => {
    if (codeScrollRef.current) {
      codeScrollRef.current.scrollTop = codeScrollRef.current.scrollHeight;
    }
  }, [streamedCodeById, activeArtifact]);

  // 切换时清理选择模式
  useEffect(() => {
    setSelectionMode(false);
    setSelectedElInfo(null);
  }, [activeArtifact, openedFile, rightTab]);

  const handleChatShare = () => {
    const reportUrl = `${window.location.origin}${publicBase}yuanqu/index.html`;
    const chatHtml = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ChatBI 会话分享</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;background:#f4f6f8;color:#1f2937;line-height:1.6}
.container{max-width:900px;margin:0 auto;padding:24px 16px}
.header{text-align:center;padding:32px 0 24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px}
.header h1{font-size:22px;font-weight:700;color:#1f2937}
.header p{font-size:13px;color:#9ca3af;margin-top:6px}
.msg{margin-bottom:16px;display:flex;gap:12px}
.msg.user{justify-content:flex-end}
.msg.user .bubble{background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px 16px 4px 16px;max-width:75%}
.msg.ai{justify-content:flex-start}
.avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;border:1px solid #e5e7eb;background:#fff}
.bubble{padding:10px 16px;font-size:14px;border-radius:16px 16px 16px 4px;max-width:75%;background:#fff;border:1px solid #e5e7eb;white-space:pre-line}
.bubble.edit{background:#ecfdf5;border-color:#a7f3d0}
.edit-tag{font-size:11px;color:#059669;font-weight:600;margin-bottom:4px}
.report-frame{margin-top:24px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;background:#fff}
.report-frame .frame-header{background:#f9fafb;border-bottom:1px solid #e5e7eb;padding:8px 16px;font-size:12px;color:#6b7280}
.report-frame iframe{width:100%;height:600px;border:0}
.footer{text-align:center;padding:24px 0;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;margin-top:32px}
</style></head><body>
<div class="container">
<div class="header"><h1>ChatBI 会话分享</h1><p>生成时间：${new Date().toLocaleString('zh-CN')}</p></div>
${messages.map(msg => {
  if (msg.role === 'user') {
    return `<div class="msg user"><div class="bubble">${msg.content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div></div>`;
  }
  const isEdit = msg.type === 'edit_reply';
  const text = msg.text || msg.queryInfo || '已生成回复。';
  return `<div class="msg ai"><div class="avatar">🤖</div><div class="bubble${isEdit ? ' edit' : ''}">${isEdit ? '<div class="edit-tag">✅ 修改已完成</div>' : ''}${text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div></div>`;
}).join('\\n')}
<div class="report-frame"><div class="frame-header">📊 生成的报告预览</div><iframe src="${reportUrl}"></iframe></div>
<div class="footer">由 ChatBI 生成 · AI 决策助手</div>
</div></body></html>`;

    const blob = new Blob([chatHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setChatShareLink(url);
    setShowChatShareModal(true);
    setChatShareCopied(false);
  };

  const isReportFavorited = latestHtmlMsg ? favoriteReports.some(r => r.id === latestHtmlMsg.id) : false;

  const toggleFavoriteReport = () => {
    if (!latestHtmlMsg) return;
    if (isReportFavorited) {
      setFavoriteReports(prev => prev.filter(r => r.id !== latestHtmlMsg.id));
    } else {
      setFavoriteInputName(latestHtmlMsg.fileName.replace('.html', ''));
      setShowFavoriteConfirm(true);
    }
  };

  const confirmFavorite = () => {
    if (!latestHtmlMsg) return;
    setFavoriteReports(prev => [...prev, {
      id: latestHtmlMsg.id,
      name: (favoriteInputName.trim() || latestHtmlMsg.fileName.replace('.html', '')),
      creator: '当前用户',
      createdAt: new Date().toLocaleString('zh-CN'),
    }]);
    setShowFavoriteConfirm(false);
    setFavoriteInputName('');
    setShowFavoriteSuccess(true);
    setTimeout(() => setShowFavoriteSuccess(false), 3000);
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const removeFavoriteReport = (reportId) => {
    setFavoriteReports(prev => prev.filter(r => r.id !== reportId));
  };

  const handleDownloadZip = async () => {
    const baseUrl = `${publicBase}yuanqu/`;
    const files = ['index.html', 'styles.css', 'script.js'];
    const zip = new JSZip();
    await Promise.all(files.map(async (name) => {
      const res = await fetch(baseUrl + name);
      const text = await res.text();
      zip.file(name, text);
    }));
    const blob = await zip.generateAsync({ type: 'blob' });
    const zipName = latestHtmlMsg ? latestHtmlMsg.fileName.replace('.html', '') : 'report';
    saveAs(blob, `${zipName}.zip`);
  };

  // 选择模式 - 注入 iframe 交互
  const enableSelectionMode = () => {
    setSelectionMode(true);
    setSelectedElInfo(null);
    const iframe = previewIframeRef.current;
    if (!iframe || !iframe.contentDocument) return;
    const doc = iframe.contentDocument;

    // 注入高亮样式
    if (!doc.getElementById('__select_style')) {
      const style = doc.createElement('style');
      style.id = '__select_style';
      style.textContent = `
        .__hover_highlight { outline: 2px dashed #3b82f6 !important; outline-offset: 2px; cursor: crosshair !important; }
        .__selected_highlight { outline: 3px solid #3b82f6 !important; outline-offset: 2px; background-color: rgba(59,130,246,0.06) !important; }
      `;
      doc.head.appendChild(style);
    }

    let lastHovered = null;

    const onMouseOver = (e) => {
      if (lastHovered && lastHovered !== e.target) lastHovered.classList.remove('__hover_highlight');
      e.target.classList.add('__hover_highlight');
      lastHovered = e.target;
    };
    const onMouseOut = (e) => { e.target.classList.remove('__hover_highlight'); };
    const onClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // 清理之前的选中
      doc.querySelectorAll('.__selected_highlight').forEach(el => el.classList.remove('__selected_highlight'));
      if (lastHovered) lastHovered.classList.remove('__hover_highlight');

      const el = e.target;
      el.classList.add('__selected_highlight');

      // 获取元素信息
      const iframeRect = iframe.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setSelectedElInfo({
        tag: el.tagName.toLowerCase(),
        text: el.innerText?.slice(0, 80) || '',
        className: el.className.replace(/__\w+_highlight/g, '').trim(),
        // 相对于 iframe 容器的位置
        rect: {
          top: iframeRect.top + elRect.top,
          left: iframeRect.left + elRect.left,
          width: elRect.width,
          height: elRect.height,
          bottom: iframeRect.top + elRect.bottom,
          right: iframeRect.left + elRect.right,
        },
        element: el,
      });
      setEditInstruction('');
    };

    doc.addEventListener('mouseover', onMouseOver, true);
    doc.addEventListener('mouseout', onMouseOut, true);
    doc.addEventListener('click', onClick, true);

    // 存引用以便清理
    iframe.__selectionCleanup = () => {
      doc.removeEventListener('mouseover', onMouseOver, true);
      doc.removeEventListener('mouseout', onMouseOut, true);
      doc.removeEventListener('click', onClick, true);
      doc.querySelectorAll('.__hover_highlight, .__selected_highlight').forEach(el => {
        el.classList.remove('__hover_highlight', '__selected_highlight');
      });
    };
  };

  const disableSelectionMode = () => {
    setSelectionMode(false);
    setSelectedElInfo(null);
    const iframe = previewIframeRef.current;
    if (iframe && iframe.__selectionCleanup) {
      iframe.__selectionCleanup();
      iframe.__selectionCleanup = null;
    }
  };

  // 保存 iframe 快照
  const saveSnapshot = () => {
    const iframe = previewIframeRef.current;
    if (!iframe?.contentDocument) return null;
    return iframe.contentDocument.documentElement.innerHTML;
  };

  // 恢复 iframe 快照
  const restoreSnapshot = (snapshot) => {
    const iframe = previewIframeRef.current;
    if (!iframe?.contentDocument || !snapshot) return;
    iframe.contentDocument.documentElement.innerHTML = snapshot;
    // 重新注入选择模式（如果处于选择状态）
    if (selectionMode) {
      disableSelectionMode();
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const currentSnapshot = saveSnapshot();
    setRedoStack(prev => [...prev, currentSnapshot]);
    const prevSnapshot = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    restoreSnapshot(prevSnapshot);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const currentSnapshot = saveSnapshot();
    setUndoStack(prev => [...prev, currentSnapshot]);
    const nextSnapshot = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    restoreSnapshot(nextSnapshot);
  };

  const handleApplyEdit = () => {
    if (!editInstruction.trim() || !selectedElInfo?.element) return;
    setIsApplyingEdit(true);

    const instruction = editInstruction.trim();
    const elementDesc = selectedElInfo.text?.slice(0, 30) || `<${selectedElInfo.tag}>`;

    // 1. 左侧发送用户消息
    const userMsg = { id: Date.now(), role: 'user', content: `[选中元素: ${elementDesc}] ${instruction}` };
    setMessages(prev => [...prev, userMsg]);

    // 保存当前状态到 undoStack
    const snapshot = saveSnapshot();
    if (snapshot) {
      setUndoStack(prev => [...prev, snapshot]);
      setRedoStack([]);
    }

    // 模拟 AI 处理
    setTimeout(() => {
      const el = selectedElInfo.element;
      const lowerInstruction = instruction.toLowerCase();
      let actionDesc = '';

      if (lowerInstruction.includes('红色') || lowerInstruction.includes('red')) {
        el.style.color = '#ef4444';
        actionDesc = '已将文字颜色修改为红色';
      } else if (lowerInstruction.includes('加粗') || lowerInstruction.includes('bold')) {
        el.style.fontWeight = '700';
        actionDesc = '已将文字加粗显示';
      } else if (lowerInstruction.includes('放大') || lowerInstruction.includes('大')) {
        el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * 1.3) + 'px';
        actionDesc = '已放大文字尺寸';
      } else if (lowerInstruction.includes('隐藏') || lowerInstruction.includes('删除') || lowerInstruction.includes('去掉')) {
        el.style.display = 'none';
        actionDesc = '已隐藏该元素';
      } else if (lowerInstruction.includes('蓝色') || lowerInstruction.includes('blue')) {
        el.style.color = '#3b82f6';
        actionDesc = '已将文字颜色修改为蓝色';
      } else if (lowerInstruction.includes('背景')) {
        el.style.backgroundColor = '#fef3c7';
        actionDesc = '已为该元素添加高亮背景色';
      } else {
        if (el.children.length === 0) {
          el.textContent = instruction;
        }
        actionDesc = '已更新元素内容';
      }

      // 2. 左侧返回 AI 回复
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        type: 'edit_reply',
        text: `${actionDesc}。\n\n针对「${elementDesc}」的修改已应用到右侧预览中，请查看效果。如需调整可继续选择元素修改，或点击撤销恢复。`,
      };
      setMessages(prev => [...prev, aiMsg]);

      setIsApplyingEdit(false);
      setSelectedElInfo(null);
      setEditInstruction('');
      const iframe = previewIframeRef.current;
      if (iframe?.contentDocument) {
        iframe.contentDocument.querySelectorAll('.__selected_highlight').forEach(node => node.classList.remove('__selected_highlight'));
      }
    }, 800);
  };

  const togglePreferredApp = (id) => {
    setPreferredAppIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length < 5) {
        return [...prev, id];
      }
      return [...prev.slice(1), id];
    });
  };

  const handleAppSelect = (app) => {
    app.action?.();
    setShowMoreApps(false);
  };

  const handleSuggestionClick = (item) => {
    setActiveFiles(item.files);
    setInputText(item.query);
    if (item.template && generationType === 'html') {
      const tpl = htmlTemplates.find(t => t.title === item.template);
      if (tpl) setSelectedTemplateId(tpl.id);
    }
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

    // HTML 模式下必须选择模版
    if (generationType === 'html' && !selectedTemplateId) {
      setShowTemplateWarning(true);
      setTimeout(() => setShowTemplateWarning(false), 3000);
      return;
    }

    const newUserMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);

    const templateTitle = htmlTemplates.find(t => t.id === selectedTemplateId)?.title || '';
    const responseData = await simulateAIResponse(text, generationType, templateTitle);

    if (generationType === 'board' && (responseData.type === 'board_dashboard' || responseData.type === 'board_filter_change' || responseData.type === 'board_column_change')) {
      const aiMsgId = Date.now() + 1;
      setBoardStreamingMsgId(aiMsgId);
      setBoardStreamingText('');
      setBoardSteps([]);
      const fullReply = responseData.text;

      if (responseData.type === 'board_column_change') {
        // Column add/remove
        const stepTexts = ['正在分析需求...', '正在调整表格结构...', '看板已更新'];
        let charIdx = 0;
        const streamTimer = setInterval(() => {
          charIdx += 1;
          setBoardStreamingText(fullReply.slice(0, charIdx));
          if (charIdx >= fullReply.length) clearInterval(streamTimer);
        }, 18);

        setTimeout(() => setBoardSteps([stepTexts[0]]), 200);
        setTimeout(() => {
          setBoardSteps([stepTexts[0], stepTexts[1]]);
          if (responseData.action === 'add') {
            setBoardColumns(prev => {
              const cols = [...prev];
              for (const key of responseData.columns) {
                if (!cols.includes(key) && BOARD_ALL_COLUMNS[key]) {
                  // Insert dimensions before metrics, metrics at end
                  if (BOARD_ALL_COLUMNS[key].isDim) {
                    const lastDimIdx = cols.reduce((acc, c, i) => BOARD_ALL_COLUMNS[c]?.isDim ? i : acc, -1);
                    cols.splice(lastDimIdx + 1, 0, key);
                  } else {
                    cols.push(key);
                  }
                }
              }
              return cols;
            });
          } else if (responseData.action === 'remove') {
            setBoardColumns(prev => prev.filter(c => !responseData.columns.includes(c)));
          }
        }, 800);
        setTimeout(() => setBoardSteps([stepTexts[0], stepTexts[1], stepTexts[2]]), 1400);
        setTimeout(() => {
          clearInterval(streamTimer);
          setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: fullReply, type: 'board_column_change' }]);
          setBoardStreamingMsgId(null);
          setBoardStreamingText('');
          setBoardSteps([]);
          setIsLoading(false);
        }, 2000);
      } else if (responseData.type === 'board_filter_change') {
        // Filter modification: shorter streaming, update filters
        const stepTexts = ['正在分析需求...', '正在更新筛选条件...', '看板已更新'];
        let charIdx = 0;
        const streamTimer = setInterval(() => {
          charIdx += 1;
          setBoardStreamingText(fullReply.slice(0, charIdx));
          if (charIdx >= fullReply.length) clearInterval(streamTimer);
        }, 18);

        setTimeout(() => setBoardSteps([stepTexts[0]]), 200);
        setTimeout(() => {
          setBoardSteps([stepTexts[0], stepTexts[1]]);
          // Apply filter changes
          if (responseData.action === 'add') {
            setBoardFilters(prev => {
              const newFilters = [...prev];
              for (const f of responseData.filters) {
                if (!newFilters.some(ef => ef.type === f.type)) {
                  newFilters.push({ id: Date.now() + '_' + f.type, type: f.type, label: f.label, value: f.type === 'date' ? { start: '', end: '' } : '' });
                }
              }
              return newFilters;
            });
          } else if (responseData.action === 'remove') {
            setBoardFilters(prev => prev.filter(f => f.type !== responseData.filterType));
          } else if (responseData.action === 'remove_all') {
            setBoardFilters([]);
          }
        }, 800);
        setTimeout(() => setBoardSteps([stepTexts[0], stepTexts[1], stepTexts[2]]), 1400);
        setTimeout(() => {
          clearInterval(streamTimer);
          setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: fullReply, type: 'board_filter_change' }]);
          setBoardStreamingMsgId(null);
          setBoardStreamingText('');
          setBoardSteps([]);
          setIsLoading(false);
        }, 2000);
      } else {
        // Initial dashboard generation
        const stepTexts = ['正在分析需求...', '正在生成看板组件...', '看板已生成，请在右侧查看'];
        let charIdx = 0;
        const streamTimer = setInterval(() => {
          charIdx += 1;
          setBoardStreamingText(fullReply.slice(0, charIdx));
          if (charIdx >= fullReply.length) clearInterval(streamTimer);
        }, 18);

        setTimeout(() => setBoardSteps([stepTexts[0]]), 300);
        setTimeout(() => setBoardSteps([stepTexts[0], stepTexts[1]]), 1200);
        setTimeout(() => {
          setBoardSteps([stepTexts[0], stepTexts[1], stepTexts[2]]);
          setBoardDashboardVisible(true);
          setBoardTitle(responseData.title);
          // Set initial filters from AI response
          const initFilters = (responseData.initFilters || [{ type: 'date', label: '日期筛选' }]).map(f => ({
            id: Date.now() + '_' + f.type, type: f.type, label: f.label, value: f.type === 'date' ? { start: '', end: '' } : ''
          }));
          setBoardFilters(initFilters);
        }, 2200);
        setTimeout(() => {
          clearInterval(streamTimer);
          setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: fullReply, type: 'board_dashboard' }]);
          setBoardStreamingMsgId(null);
          setBoardStreamingText('');
          setBoardSteps([]);
          setIsLoading(false);
        }, 3200);
      }
      return;
    }

    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', ...responseData }]);
    setIsLoading(false);
    setActiveArtifact('sql');
  };

  // 通过内联函数直接返回 JSX，避免焦点丢失
  const renderInputBox = () => (
    <div className="w-full bg-white border-2 border-purple-600 rounded-2xl shadow-xl p-2 transition-all focus-within:ring-4 focus-within:ring-purple-100 pointer-events-auto relative">
      {/* 未选模版提示 */}
      {showTemplateWarning && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 bg-red-500 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
          请先选择一个报告模版再发送
        </div>
      )}
      {activeFiles.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {activeFiles.map((file, index) => (
            <div key={index} className="inline-flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 text-[11px] shadow-sm">
              <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center text-green-600"><FileSpreadsheet size={10} /></div>
              <span className="text-gray-700 max-w-[150px] truncate font-medium">{file.name}</span>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-500 hover:bg-white rounded-full p-0.5 transition-colors"><X size={12} /></button>
            </div>
          ))}
          {selectedTemplateId && (
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 text-[11px] shadow-sm">
              <div className="w-4 h-4 bg-emerald-100 rounded flex items-center justify-center text-emerald-600"><LayoutTemplate size={10} /></div>
              <span className="text-emerald-700 max-w-[150px] truncate font-medium">{htmlTemplates.find(t => t.id === selectedTemplateId)?.title}</span>
              <button onClick={() => {
                if (isChatting) {
                  setPendingTemplateId('__remove__');
                  setShowTemplateChangeConfirm(true);
                } else {
                  setSelectedTemplateId(null);
                }
              }} className="text-emerald-400 hover:text-emerald-600 hover:bg-white rounded-full p-0.5 transition-colors"><X size={12} /></button>
            </div>
          )}
        </div>
      )}

      <textarea
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
        className="w-full h-6 resize-none border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-sm bg-transparent p-0 mb-1 leading-relaxed"
        placeholder=""
      ></textarea>

      <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-0.5 rounded-lg">
            <button onClick={() => setAnalysisMode('fast')} className={`flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md transition-all ${analysisMode === 'fast' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <Zap size={14} />
            </button>
            <button onClick={() => setAnalysisMode('deep')} className={`flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md transition-all ${analysisMode === 'deep' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <BrainCircuit size={14} />
            </button>
          </div>

          <div className="h-5 w-px bg-gray-200"></div>

          <button onClick={() => setShowDatasetModal(true)} className="flex items-center justify-center text-xs font-medium text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-blue-200 transition-colors shadow-sm">
            <Database size={14} />
          </button>
          {generationType === 'html' && (
            <div className="relative">
              <button
                onClick={() => { setTempSelectedTemplateId(selectedTemplateId); setShowTemplateMenu(true); setShowTemplateWarning(false); }}
                className={`flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors shadow-sm ${showTemplateWarning ? 'text-red-600 bg-red-50 border-red-300 animate-pulse' : !selectedTemplateId ? 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100' : 'text-gray-600 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 border-transparent hover:border-emerald-200'}`}
              >
                <LayoutTemplate size={14} />
              </button>
              {showTemplateMenu && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/30" onClick={() => setShowTemplateMenu(false)}></div>
                  <div className="relative w-[760px] bg-white border border-blue-500 rounded-2xl shadow-2xl py-6 px-6">
                    <button onClick={() => setShowTemplateMenu(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
                    <div className="text-base font-semibold text-gray-700 mb-6">报告模板选择</div>
                    <div className="grid grid-cols-3 gap-6">
                      {htmlTemplates.map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => setTempSelectedTemplateId(tpl.id)}
                          className={`text-left border-2 rounded-2xl p-4 transition-colors ${
                            tempSelectedTemplateId === tpl.id ? 'border-blue-500 shadow-sm' : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          <div className="h-28 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-500 text-white flex items-center justify-center text-xs font-semibold">
                            2026年上/中/下旬问题多人群画像分析报告
                          </div>
                          <div className="mt-3 text-base font-semibold text-gray-800">{tpl.title}</div>
                          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                            <span>{tpl.author}</span>
                            <span>{tpl.date}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>共 67 条</span>
                        <div className="flex items-center gap-1">
                          {['1', '2', '3', '4', '5', '6', '7'].map((p) => (
                            <button key={p} className={`w-8 h-8 rounded-lg border ${p === '1' ? 'border-blue-400 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600'}`}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setShowTemplateMenu(false)} className="w-24 h-9 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50">取消</button>
                        <button
                          onClick={() => {
                            if (!tempSelectedTemplateId) return;
                            // 已在对话中且切换了不同模版，弹确认
                            if (isChatting && selectedTemplateId && tempSelectedTemplateId !== selectedTemplateId) {
                              setPendingTemplateId(tempSelectedTemplateId);
                              setShowTemplateMenu(false);
                              setShowTemplateChangeConfirm(true);
                            } else {
                              setSelectedTemplateId(tempSelectedTemplateId);
                              setShowTemplateMenu(false);
                            }
                          }}
                          className="w-24 h-9 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                        >
                          确定
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center text-xs font-medium text-gray-600 hover:text-green-600 bg-gray-50 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-green-200 transition-colors shadow-sm">
            <FileSpreadsheet size={14} />
          </button>
          {generationType === 'explore' && (
            <button onClick={() => setWebSearchEnabled(!webSearchEnabled)} className={`flex items-center justify-center text-xs font-medium transition-colors px-3 py-1.5 rounded-lg border shadow-sm ${webSearchEnabled ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-gray-50 text-gray-600 border-transparent hover:bg-indigo-50 hover:text-indigo-600'}`}>
              <Globe size={14} />
            </button>
          )}
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

      if (msg.type === 'html_prototype') {
        const activeTab = htmlTabById[msg.id] || 'preview';
        return (
          <div key={msg.id} className="flex items-start gap-4 mb-6 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white border border-gray-200 shadow-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white"><Code size={14} /></div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-gray-800">HTML 页面原型已生成</div>
                  <div className="text-xs text-gray-500 mt-1">文件：{msg.fileName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHtmlTabById(prev => ({ ...prev, [msg.id]: 'code' }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${activeTab === 'code' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                  >
                    代码
                  </button>
                  <button
                    onClick={() => setHtmlTabById(prev => ({ ...prev, [msg.id]: 'preview' }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${activeTab === 'preview' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                  >
                    预览
                  </button>
                </div>
              </div>

              {activeTab === 'code' ? (
                <div className="mt-4 relative">
                  <button
                    onClick={() => handleCopyCode(msg.code, `inline-${msg.id}`)}
                    className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                  >
                    {copiedCodeId === `inline-${msg.id}` ? <><Check size={12} /> 已复制</> : <><Copy size={12} /> 复制代码</>}
                  </button>
                  <pre className="text-xs bg-gray-900 text-gray-100 rounded-xl p-4 overflow-auto max-h-[420px] whitespace-pre-wrap">
                    {msg.code}
                  </pre>
                </div>
              ) : (
                <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs text-gray-500">HTML 页面预览</div>
                    <iframe
                      title="html-preview-inline"
                      className="w-full border-0"
                      style={{ height: '460px' }}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      src={`${publicBase}yuanqu/index.html`}
                    />
                </div>
              )}

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-600 px-2 py-1 border border-indigo-100"><Code size={12} /> 可继续迭代视觉与模块结构</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-600 px-2 py-1 border border-emerald-100"><LayoutTemplate size={12} /> 基于需求快速出原型</span>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const isChatting = messages.length > 0;
  const isHtmlWorkspace = generationType === 'html' && Boolean(latestHtmlMsg);
  const isBoardWorkspace = generationType === 'board' && (boardDashboardVisible || boardStreamingMsgId);

  const boardFilteredData = DASHBOARD_MOCK_DATA.filter(row => {
    for (const f of boardFilters) {
      if (f.type === 'date' && f.value) {
        if (f.value.start && row.date < f.value.start) return false;
        if (f.value.end && row.date > f.value.end) return false;
      }
      if (f.type === 'area' && f.value && row.area !== f.value) return false;
      if (f.type === 'district' && f.value && row.district !== f.value) return false;
      if (f.type === 'grid' && f.value && row.grid !== f.value) return false;
      if (f.type === 'hall' && f.value && row.hall !== f.value) return false;
    }
    return true;
  });

  // Extract unique values for dropdown filters
  const boardUniqueAreas = [...new Set(DASHBOARD_MOCK_DATA.map(r => r.area))];
  const boardUniqueDistricts = [...new Set(DASHBOARD_MOCK_DATA.map(r => r.district))];
  const boardUniqueGrids = [...new Set(DASHBOARD_MOCK_DATA.map(r => r.grid))];
  const boardUniqueHalls = [...new Set(DASHBOARD_MOCK_DATA.map(r => r.hall))];

  const updateBoardFilter = (filterId, newValue) => {
    setBoardFilters(prev => prev.map(f => f.id === filterId ? { ...f, value: newValue } : f));
  };

  const removeBoardFilter = (filterId) => {
    setBoardFilters(prev => prev.filter(f => f.id !== filterId));
  };

  // Drill-down handler: insert child column after parent
  const handleBoardDrill = (parentKey, childKey) => {
    setBoardColumns(prev => {
      if (prev.includes(childKey)) return prev; // already there
      const idx = prev.indexOf(parentKey);
      const newCols = [...prev];
      newCols.splice(idx + 1, 0, childKey);
      return newCols;
    });
    setBoardContextMenu(null);
  };

  // Compute dynamic metric groups for merged headers
  const boardDimCols = boardColumns.filter(k => BOARD_ALL_COLUMNS[k]?.isDim);
  const boardMetricCols = boardColumns.filter(k => !BOARD_ALL_COLUMNS[k]?.isDim);
  const boardMetricGroups = [];
  for (const mk of boardMetricCols) {
    const def = BOARD_ALL_COLUMNS[mk];
    const last = boardMetricGroups[boardMetricGroups.length - 1];
    if (last && last.group === def.group) {
      last.cols.push(mk);
    } else {
      boardMetricGroups.push({ group: def.group, color: def.groupColor || 'gray', cols: [mk] });
    }
  }

  return (
    <div className={`flex h-full justify-center overflow-hidden transition-colors duration-500 ${isChatting ? 'bg-[#f4f6f8]' : 'bg-white'}`}>
      <style>{styles}</style>
      <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx,.xls" multiple onChange={handleFileUpload} />
      {showDatasetModal && <DatasetSelectionModal onClose={() => setShowDatasetModal(false)} onConfirm={handleDatasetConfirm} />}

      {/* 收藏确认弹窗 */}
      {showFavoriteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center" onClick={() => setShowFavoriteConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Sparkles size={18} className="text-orange-400" /> 收藏报告</h3>
              <button onClick={() => setShowFavoriteConfirm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">报告名称</label>
              <input
                type="text"
                value={favoriteInputName}
                onChange={(e) => setFavoriteInputName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') confirmFavorite(); }}
                placeholder="请输入报告名称"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                autoFocus
              />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-orange-700 leading-relaxed">收藏后可在左侧菜单「报告管理」中查看、分享和下载。</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowFavoriteConfirm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={confirmFavorite}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center gap-1.5"
              >
                <Sparkles size={14} /> 确认收藏
              </button>
            </div>
          </div>
        </div>
      )}

      {showFavoriteSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white border border-green-200 rounded-2xl shadow-xl px-6 py-4 flex items-start gap-3 max-w-md">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckSquare size={18} className="text-green-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-800 mb-0.5">收藏成功</div>
              <div className="text-xs text-gray-500 leading-relaxed">恭喜您，报告收藏成功！收藏的报告可以在左侧菜单「报告管理」中查看。</div>
            </div>
            <button onClick={() => setShowFavoriteSuccess(false)} className="text-gray-300 hover:text-gray-500 flex-shrink-0 mt-0.5"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* 分享弹窗 */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[480px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Share2 size={18} className="text-blue-600" /> 创建分享链接</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-amber-700 leading-relaxed">任何获得链接的人都可以查看你生成的报告内容，请检查是否包含敏感或隐私内容。</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 truncate select-all">
                {`${window.location.origin}${publicBase}yuanqu/index.html`}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}${publicBase}yuanqu/index.html`);
                  setShareLinkCopied(true);
                  setTimeout(() => setShareLinkCopied(false), 2000);
                }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${shareLinkCopied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {shareLinkCopied ? '已复制' : '复制链接'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 下载确认弹窗 */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDownloadModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Download size={18} className="text-blue-600" /> 下载报告文件</h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-600 mb-2">将下载以下文件的压缩包：</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-700"><FileText size={14} className="text-blue-500" /> index.html</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Code size={14} className="text-yellow-500" /> styles.css</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Code size={14} className="text-emerald-500" /> script.js</div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDownloadModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={() => { setShowDownloadModal(false); handleDownloadZip(); }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                确认下载
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 切换模版确认弹窗 */}
      {showTemplateChangeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowTemplateChangeConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><RefreshCw size={18} className="text-orange-500" /> 切换报告模版</h3>
              <button onClick={() => setShowTemplateChangeConfirm(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-orange-700 leading-relaxed font-medium mb-1">切换模版将重置当前会话</p>
              <p className="text-sm text-orange-600 leading-relaxed">所有对话记录、生成的文件和报告预览都将被清除并重新生成，此操作不可撤销。</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowTemplateChangeConfirm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={() => {
                  if (pendingTemplateId === '__remove__') {
                    setSelectedTemplateId(null);
                  } else {
                    setSelectedTemplateId(pendingTemplateId);
                  }
                  setMessages([]);
                  setHtmlStage(0);
                  setStreamedCodeById({ sql: '', python: '', html: '' });
                  setStreamedTextById({});
                  setActiveArtifact('sql');
                  setRightTab('sync');
                  setOpenedFile(null);
                  setUndoStack([]);
                  setRedoStack([]);
                  setShowTemplateChangeConfirm(false);
                  setPendingTemplateId(null);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                确认切换
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 会话分享弹窗 */}
      {showChatShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => { setShowChatShareModal(false); if (chatShareLink) URL.revokeObjectURL(chatShareLink); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><MessageSquare size={18} className="text-blue-600" /> 分享会话</h3>
              <button onClick={() => { setShowChatShareModal(false); if (chatShareLink) URL.revokeObjectURL(chatShareLink); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
              <p className="text-sm text-blue-700 leading-relaxed">分享链接将包含完整的对话记录和生成的报告预览，收到链接的人可以查看全部内容。</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5">
              <div className="text-xs text-gray-400 mb-2">分享内容包含：</div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-full px-2.5 py-1 text-gray-600"><MessageSquare size={11} /> 全部对话 ({messages.length} 条)</span>
                <span className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-full px-2.5 py-1 text-gray-600"><FileText size={11} /> 生成报告预览</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  // 下载分享页面 HTML 文件
                  const a = document.createElement('a');
                  a.href = chatShareLink;
                  a.download = 'chatbi-share.html';
                  a.click();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> 下载分享页面
              </button>
              <button
                onClick={() => {
                  // 在新标签页打开预览
                  window.open(chatShareLink, '_blank');
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Globe size={14} /> 预览分享页面
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center overflow-hidden custom-scrollbar relative h-full">
        {!isChatting && !agentInfo && (
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

        <div className={`w-full mx-auto flex flex-col items-center relative z-10 ${isChatting ? 'flex-1 min-h-0' : 'min-h-full justify-center py-10'}`}>

          {!isChatting ? (
            <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
              <div className="mb-8 mt-4 w-full max-w-5xl">
                {agentInfo ? (
                  <div className="flex flex-col items-center px-4">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-gray-100"><img src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${agentInfo.name}`} alt="Icon" className="w-12 h-12" /></div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{agentInfo.name}</h2>
                    <p className="text-gray-400 text-center max-w-lg mb-4 text-sm leading-relaxed">{agentInfo.desc}</p>
                    <p className="text-sm font-medium text-gray-600 mb-4">您好，我是您的数据分析智能助手！</p>
                    <div className="space-y-2.5 w-full max-w-md">
                      {['各省份通话收入情况如何?', '本月用户投诉热点有哪些?', '竞争对手最新市场活动分析'].map((q, i) => (
                        <button key={i} onClick={() => { setInputText(q); setTimeout(() => inputRef.current?.focus(), 0); }} className="w-full text-left px-4 py-3 bg-white hover:bg-blue-50 rounded-xl text-sm text-gray-700 flex items-center gap-3 transition-colors border border-gray-200 hover:border-blue-300 shadow-sm"><MessageSquare size={14} className="text-gray-400 flex-shrink-0" />{q}</button>
                      ))}
                    </div>
                  </div>
                ) : (
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
                )}
              </div>

              {/* 顶部悬浮功能按钮 */}
              <div className="flex flex-col items-center gap-3 mb-10 w-full">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {primaryApps.map((app) => {
                    const Icon = app.icon;
                    const isActive = app.id === generationType;
                    return (
                      <button
                        key={app.id}
                        onClick={app.action}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border shadow-sm transition-colors ${isActive ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                      >
                        <Icon size={14} className={isActive ? '' : (app.iconClass || '')} /> {app.label}
                      </button>
                    );
                  })}
                  <div className="relative">
                      <button
                        onClick={() => setShowMoreApps((prev) => !prev)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
                      >
                        <Grid size={14} /> 更多应用
                      </button>
                      {showMoreApps && (
                        <div className="absolute left-0 top-[calc(100%+8px)] w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-30">
                          <div className="px-4 py-2 text-[11px] text-gray-400">自定义前 5 个应用</div>
                          {appButtons.map((app) => {
                            const Icon = app.icon;
                            const isPreferred = preferredAppIds.includes(app.id);
                            const isActive = app.id === generationType;
                            return (
                              <div
                                key={app.id}
                                className={`px-4 py-2 text-xs flex items-center justify-between gap-2 ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
                              >
                                <div className="flex items-center gap-2" onClick={() => handleAppSelect(app)}>
                                  <Icon size={14} className={app.iconClass} />
                                  <span className={`${isActive ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>{app.label}</span>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); togglePreferredApp(app.id); }}
                                  className={`text-[10px] px-2 py-0.5 rounded-full border ${isPreferred ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-gray-400 border-gray-200'}`}
                                >
                                  固定
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                </div>
              </div>

              {/* 中央输入框 */}
              <div className="w-full max-w-4xl mb-12">
                 {renderInputBox()}
              </div>

              {/* 提问示例 - 智能体模式下不显示（已在欢迎区展示） */}
              {!agentInfo && (() => {
                const allItems = suggestionsMap[generationType] || suggestionsMap.qa;
                const visibleItems = showAllSuggestions ? allItems : allItems.slice(0, 4);
                return (
                  <div className="w-full max-w-4xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 text-sm">提问示例 (点击填充问题，发送后开始问答)</h3>
                      {allItems.length > 4 && (
                        <button
                          onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                        >
                          {showAllSuggestions ? '收起' : `查看更多 (${allItems.length})`}
                          <ChevronDown size={14} className={`transition-transform ${showAllSuggestions ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {visibleItems.map((item, index) => (
                        <div key={index} onClick={() => handleSuggestionClick(item)} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all shadow-sm flex flex-col justify-between group hover:-translate-y-1">
                          <div className="font-bold text-gray-800 text-sm mb-2 group-hover:text-blue-600 transition-colors">{item.title}</div>
                          <div className="text-xs text-gray-500 leading-relaxed mb-2">{item.query}</div>
                          {item.template && (
                            <div className="flex items-center gap-1 mt-auto">
                              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">模版: {item.template}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : isHtmlWorkspace ? (
            <div className="w-full max-w-none mx-auto flex-1 min-h-0">
              <div className={`grid gap-0 border border-gray-200 rounded-none bg-white h-full min-h-0 overflow-hidden ${showRightPanel ? 'grid-cols-1 lg:grid-cols-[44%_56%]' : 'grid-cols-1'}`}>
                <div className="border-r border-gray-200 bg-white flex flex-col h-full overflow-hidden">

                  <div ref={leftChatRef} className="px-6 pb-4 pt-4 flex-1 space-y-4 overflow-y-auto min-h-0">
                    {messages.map((msg) => (
                      msg.role === 'user' ? (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-[85%] bg-blue-50 text-gray-800 border border-blue-100 px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div key={msg.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600"><Bot size={14} /></div>
                          <div className="flex-1">
                            {msg.type === 'edit_reply' ? (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs mb-1.5"><CheckSquare size={13} /> 修改已完成</div>
                                <div className="whitespace-pre-line">{msg.text}</div>
                              </div>
                            ) : (
                              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed">
                                {msg.type === 'html_prototype'
                                  ? (streamedTextById[msg.id] || '')
                                  : (msg.text || msg.queryInfo || '已生成回复。')}
                              </div>
                            )}
                            {msg.type === 'html_prototype' && (
                              <div className="mt-3 space-y-2">
                                {htmlStage >= 1 && (
                                  <button
                                    onClick={() => { setShowRightPanel(true); setRightTab('files'); setOpenedFile('sql'); }}
                                    className={`w-full text-left border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors animate-in fade-in slide-in-from-bottom-1 ${rightTab === 'files' && openedFile === 'sql' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                  >
                                    {htmlStage === 1 && <Loader2 size={14} className="inline animate-spin mr-1.5 text-blue-500" />}
                                    {htmlStage > 1 ? '✓ ' : ''}编写SQL文件
                                  </button>
                                )}
                                {htmlStage >= 2 && (
                                  <button
                                    onClick={() => { setShowRightPanel(true); setRightTab('files'); setOpenedFile('python'); }}
                                    className={`w-full text-left border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors animate-in fade-in slide-in-from-bottom-1 ${rightTab === 'files' && openedFile === 'python' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                  >
                                    {htmlStage === 2 && <Loader2 size={14} className="inline animate-spin mr-1.5 text-blue-500" />}
                                    {htmlStage > 2 ? '✓ ' : ''}编写Python文件
                                  </button>
                                )}
                                {htmlStage >= 3 && (
                                  <button
                                    onClick={() => { setShowRightPanel(true); setRightTab('files'); setOpenedFile('html'); }}
                                    className={`w-full text-left border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors animate-in fade-in slide-in-from-bottom-1 ${rightTab === 'files' && openedFile === 'html' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                  >
                                    {!htmlCodeDone && <Loader2 size={14} className="inline animate-spin mr-1.5 text-blue-500" />}
                                    {htmlCodeDone ? '✓ ' : ''}编写HTML文件
                                  </button>
                                )}
                                {htmlCodeDone && (
                                  <>
                                    <button
                                      onClick={() => { setShowRightPanel(true); setRightTab('files'); setOpenedFile('html_preview'); }}
                                      className="w-full text-left border rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 bg-white flex items-center gap-3 transition-colors hover:border-blue-300 hover:bg-blue-50 cursor-pointer animate-in fade-in slide-in-from-bottom-1"
                                    >
                                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><FileText size={16} /></div>
                                      {latestHtmlMsg.fileName}
                                    </button>
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-sm text-emerald-700 font-medium animate-in fade-in slide-in-from-bottom-1">
                                      您的 HTML 报告已生成，请点击上方文件查看
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                            {/* 点赞点踩 / 分享 / 重新生成 */}
                            <div className="flex items-center gap-1 mt-2">
                              <button
                                onClick={() => setMsgVotes(prev => ({ ...prev, [msg.id]: prev[msg.id] === 'up' ? null : 'up' }))}
                                className={`p-1.5 rounded-lg transition-colors ${msgVotes[msg.id] === 'up' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                                title="点赞"
                              ><ThumbsUp size={13} /></button>
                              <button
                                onClick={() => setMsgVotes(prev => ({ ...prev, [msg.id]: prev[msg.id] === 'down' ? null : 'down' }))}
                                className={`p-1.5 rounded-lg transition-colors ${msgVotes[msg.id] === 'down' ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                                title="点踩"
                              ><ThumbsDown size={13} /></button>
                              <button
                                onClick={handleChatShare}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                                title="分享会话"
                              ><Share2 size={13} /></button>
                              <button
                                onClick={() => {
                                  // 找到这条 AI 消息之前最近的用户消息
                                  const idx = messages.findIndex(m => m.id === msg.id);
                                  let userText = '';
                                  for (let i = idx - 1; i >= 0; i--) {
                                    if (messages[i].role === 'user') {
                                      userText = messages[i].content;
                                      break;
                                    }
                                  }
                                  if (!userText) return;
                                  // HTML 模式下清空历史，开启全新对话
                                  if (generationType === 'html') {
                                    setMessages([]);
                                    setHtmlStage(0);
                                    setHtmlCodeDone(false);
                                    setStreamedCodeById({});
                                    setStreamedTextById({});
                                    setOpenedFile(null);
                                    setRightTab('sync');
                                    setShowRightPanel(true);
                                    setActiveArtifact('sql');
                                    setTimeout(() => handleSendMessage(userText), 50);
                                  } else {
                                    handleSendMessage(userText);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                                title="重新生成"
                              ><RotateCcw size={13} /></button>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="px-6 pb-6 mt-auto">
                    {renderInputBox()}
                  </div>
                </div>

                {showRightPanel && <div className="bg-white flex flex-col h-full overflow-hidden">
                  {/* 右侧顶部 tab 切换 */}
                  <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <button
                        onClick={() => { if (isLoading || htmlStage < 3) setRightTab('sync'); }}
                        className={`pb-2 transition-colors ${htmlStage >= 3 && !isLoading ? 'text-gray-300 cursor-not-allowed' : rightTab === 'sync' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        title={htmlStage >= 3 && !isLoading ? '生成已完成，请在文件中查看' : ''}
                      >
                        实时追随
                      </button>
                      <button
                        onClick={() => setRightTab('files')}
                        className={`pb-2 transition-colors ${rightTab === 'files' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        文件
                      </button>
                    </div>
                    <button onClick={() => setShowRightPanel(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                  </div>

                  {rightTab === 'sync' ? (
                    <>
                      {/* 实时追随：流式代码 + 完成后预览 */}
                      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-orange-50 text-orange-600">⋯</span>
                          {latestHtmlMsg.fileName}
                          <button onClick={toggleFavoriteReport} className={`transition-colors text-sm ${isReportFavorited ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`} title={isReportFavorited ? '取消收藏' : '收藏'}>★</button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            onClick={() => setActiveArtifact('html')}
                            className={`px-3 py-1 rounded-full border transition-colors ${activeArtifact !== 'preview' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                          >
                            代码
                          </button>
                          <button
                            onClick={() => setActiveArtifact('preview')}
                            className={`px-3 py-1 rounded-full border transition-colors ${activeArtifact === 'preview' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                          >
                            预览
                          </button>
                          <div className="h-4 w-px bg-gray-200"></div>
                          <button onClick={handleUndo} disabled={undoStack.length === 0} className={`p-1 rounded-md border transition-colors ${undoStack.length > 0 ? 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`} title="撤销"><Undo2 size={14} /></button>
                          <button onClick={handleRedo} disabled={redoStack.length === 0} className={`p-1 rounded-md border transition-colors ${redoStack.length > 0 ? 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`} title="前进"><Redo2 size={14} /></button>
                          <div className="h-4 w-px bg-gray-200"></div>
                          <button onClick={() => { setShowShareModal(true); setShareLinkCopied(false); }} className="px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300">分享</button>
                          <button onClick={() => setShowDownloadModal(true)} className="px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300">下载</button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-hidden min-h-0">
                        {activeArtifact === 'preview' ? (
                          <div className="h-full flex flex-col overflow-hidden relative">
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs text-gray-500 flex-shrink-0">HTML 页面预览</div>
                            <div className="flex-1 relative overflow-hidden">
                              <iframe
                                ref={previewIframeRef}
                                title="html-preview"
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                src={`${publicBase}yuanqu/index.html`}
                                onLoad={() => { if (selectionMode) { disableSelectionMode(); } }}
                              />
                              {/* 悬浮选择按钮 */}
                              <button
                                onClick={() => selectionMode ? disableSelectionMode() : enableSelectionMode()}
                                className={`absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${selectionMode ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:shadow-xl hover:border-blue-300'}`}
                                title={selectionMode ? '退出选择' : '选择元素'}
                              >
                                <MousePointer2 size={18} />
                              </button>
                              {/* 选择模式遮罩提示 */}
                              {selectionMode && !selectedElInfo && (
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
                                  点击报告中的元素进行选择
                                </div>
                              )}
                              {/* 选中后的编辑弹窗 */}
                              {selectedElInfo && (
                                <div className="absolute bottom-16 right-4 z-30 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <div className="text-sm font-bold text-gray-800">编辑选中内容</div>
                                    <button onClick={() => setSelectedElInfo(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                  </div>
                                  <div className="px-4 py-3">
                                    <div className="bg-gray-50 rounded-xl px-3 py-2 mb-3 border border-gray-100">
                                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">选中元素</div>
                                      <div className="text-xs text-gray-700 truncate">{selectedElInfo.text || `<${selectedElInfo.tag}>`}</div>
                                    </div>
                                    <textarea
                                      value={editInstruction}
                                      onChange={(e) => setEditInstruction(e.target.value)}
                                      placeholder="用自然语言描述你想要的修改，例如：把这个数字改成红色、放大标题、隐藏这个区域..."
                                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 placeholder:text-gray-300"
                                      rows={3}
                                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleApplyEdit(); } }}
                                    />
                                  </div>
                                  <div className="px-4 pb-3 flex justify-end gap-2">
                                    <button onClick={() => setSelectedElInfo(null)} className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">取消</button>
                                    <button
                                      onClick={handleApplyEdit}
                                      disabled={!editInstruction.trim() || isApplyingEdit}
                                      className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                    >
                                      {isApplyingEdit ? <><Loader2 size={12} className="animate-spin" /> 处理中...</> : <><Wand2 size={12} /> 应用修改</>}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            <button
                              onClick={() => {
                                const code = (activeArtifact === 'sql' && streamedCodeById.sql) || (activeArtifact === 'python' && streamedCodeById.python) || (activeArtifact === 'html' && streamedCodeById.html) || '';
                                handleCopyCode(code, `sync-${activeArtifact}`);
                              }}
                              className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
                            >
                              {copiedCodeId === `sync-${activeArtifact}` ? <><Check size={12} className="text-green-500" /> 已复制</> : <><Copy size={12} /> 复制代码</>}
                            </button>
                            <pre ref={codeScrollRef} className="text-xs bg-[#f8fafc] text-gray-700 p-6 whitespace-pre-wrap h-full max-h-full overflow-y-auto">
                              {activeArtifact === 'sql' && htmlStage >= 1 && streamedCodeById.sql}
                              {activeArtifact === 'python' && htmlStage >= 2 && streamedCodeById.python}
                              {activeArtifact === 'html' && htmlStage >= 3 && streamedCodeById.html}
                            </pre>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 文件列表 */}
                      {openedFile ? (
                        <>
                          <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setOpenedFile(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowLeft size={16} /></button>
                              <span className="text-sm font-medium text-gray-700">
                                {openedFile === 'sql' && `${latestHtmlMsg.fileName.replace('.html', '')}.sql`}
                                {openedFile === 'python' && `${latestHtmlMsg.fileName.replace('.html', '')}.py`}
                                {(openedFile === 'html' || openedFile === 'html_preview') && latestHtmlMsg.fileName}
                              </span>
                              {(openedFile === 'html' || openedFile === 'html_preview') && (
                                <button onClick={toggleFavoriteReport} className={`transition-colors ${isReportFavorited ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'}`} title={isReportFavorited ? '取消收藏' : '收藏'}><Sparkles size={14} /></button>
                              )}
                            </div>
                            {(openedFile === 'html' || openedFile === 'html_preview') && (
                              <div className="flex items-center gap-2 text-xs">
                                <button
                                  onClick={() => setOpenedFile('html')}
                                  className={`px-3 py-1 rounded-full border transition-colors ${openedFile === 'html' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                                >
                                  代码
                                </button>
                                <button
                                  onClick={() => setOpenedFile('html_preview')}
                                  className={`px-3 py-1 rounded-full border transition-colors ${openedFile === 'html_preview' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                                >
                                  预览
                                </button>
                                <div className="h-4 w-px bg-gray-200"></div>
                                <button onClick={handleUndo} disabled={undoStack.length === 0} className={`p-1 rounded-md border transition-colors ${undoStack.length > 0 ? 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`} title="撤销"><Undo2 size={14} /></button>
                                <button onClick={handleRedo} disabled={redoStack.length === 0} className={`p-1 rounded-md border transition-colors ${redoStack.length > 0 ? 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`} title="前进"><Redo2 size={14} /></button>
                                <div className="h-4 w-px bg-gray-200"></div>
                                <button onClick={() => { setShowShareModal(true); setShareLinkCopied(false); }} className="px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300">分享</button>
                                <button onClick={() => setShowDownloadModal(true)} className="px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300">下载</button>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden min-h-0">
                            {openedFile === 'html' ? (
                              <div className="relative h-full">
                                <button
                                  onClick={() => handleCopyCode(streamedCodeById.html || latestHtmlMsg.code, 'file-html')}
                                  className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
                                >
                                  {copiedCodeId === 'file-html' ? <><Check size={12} className="text-green-500" /> 已复制</> : <><Copy size={12} /> 复制代码</>}
                                </button>
                                <pre className="text-xs bg-[#f8fafc] text-gray-700 p-6 whitespace-pre-wrap h-full max-h-full overflow-y-auto">
                                  {streamedCodeById.html || latestHtmlMsg.code}
                                </pre>
                              </div>
                            ) : openedFile === 'html_preview' ? (
                              <div className="relative w-full h-full">
                                <iframe
                                  ref={previewIframeRef}
                                  title="html-preview-file"
                                  className="w-full h-full border-0"
                                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                  src={`${publicBase}yuanqu/index.html`}
                                  onLoad={() => { if (selectionMode) { disableSelectionMode(); } }}
                                />
                                {/* 悬浮选择按钮 */}
                                <button
                                  onClick={() => selectionMode ? disableSelectionMode() : enableSelectionMode()}
                                  className={`absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${selectionMode ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:shadow-xl hover:border-blue-300'}`}
                                  title={selectionMode ? '退出选择' : '选择元素'}
                                >
                                  <MousePointer2 size={18} />
                                </button>
                                {selectionMode && !selectedElInfo && (
                                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
                                    点击报告中的元素进行选择
                                  </div>
                                )}
                                {selectedElInfo && (
                                  <div className="absolute bottom-16 right-4 z-30 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                      <div className="text-sm font-bold text-gray-800">编辑选中内容</div>
                                      <button onClick={() => setSelectedElInfo(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                    </div>
                                    <div className="px-4 py-3">
                                      <div className="bg-gray-50 rounded-xl px-3 py-2 mb-3 border border-gray-100">
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">选中元素</div>
                                        <div className="text-xs text-gray-700 truncate">{selectedElInfo.text || `<${selectedElInfo.tag}>`}</div>
                                      </div>
                                      <textarea
                                        value={editInstruction}
                                        onChange={(e) => setEditInstruction(e.target.value)}
                                        placeholder="用自然语言描述你想要的修改，例如：把这个数字改成红色、放大标题、隐藏这个区域..."
                                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 placeholder:text-gray-300"
                                        rows={3}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleApplyEdit(); } }}
                                      />
                                    </div>
                                    <div className="px-4 pb-3 flex justify-end gap-2">
                                      <button onClick={() => setSelectedElInfo(null)} className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">取消</button>
                                      <button
                                        onClick={handleApplyEdit}
                                        disabled={!editInstruction.trim() || isApplyingEdit}
                                        className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                      >
                                        {isApplyingEdit ? <><Loader2 size={12} className="animate-spin" /> 处理中...</> : <><Wand2 size={12} /> 应用修改</>}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="relative h-full">
                                <button
                                  onClick={() => {
                                    const code = (openedFile === 'sql' && (streamedCodeById.sql || latestHtmlMsg.sql)) || (openedFile === 'python' && (streamedCodeById.python || latestHtmlMsg.python)) || '';
                                    handleCopyCode(code, `file-${openedFile}`);
                                  }}
                                  className="absolute top-3 right-3 z-10 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
                                >
                                  {copiedCodeId === `file-${openedFile}` ? <><Check size={12} className="text-green-500" /> 已复制</> : <><Copy size={12} /> 复制代码</>}
                                </button>
                                <pre className="text-xs bg-[#f8fafc] text-gray-700 p-6 whitespace-pre-wrap h-full max-h-full overflow-y-auto">
                                  {openedFile === 'sql' && (streamedCodeById.sql || latestHtmlMsg.sql)}
                                  {openedFile === 'python' && (streamedCodeById.python || latestHtmlMsg.python)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 overflow-y-auto p-6 space-y-2">
                          <div
                            onClick={() => htmlStage >= 1 && setOpenedFile('sql')}
                            className={`w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${htmlStage >= 1 ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${htmlStage >= 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-300'}`}><Database size={16} /></div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{latestHtmlMsg.fileName.replace('.html', '')}.sql</div>
                              <div className="text-xs text-gray-400 mt-0.5">SQL 查询文件</div>
                            </div>
                            {htmlStage >= 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const content = streamedCodeById.sql || latestHtmlMsg.sql || '';
                                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                                  saveAs(blob, `${latestHtmlMsg.fileName.replace('.html', '')}.sql`);
                                }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="下载"
                              ><Download size={14} /></button>
                            )}
                          </div>
                          <div
                            onClick={() => htmlStage >= 2 && setOpenedFile('python')}
                            className={`w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${htmlStage >= 2 ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${htmlStage >= 2 ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-300'}`}><Code size={16} /></div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{latestHtmlMsg.fileName.replace('.html', '')}.py</div>
                              <div className="text-xs text-gray-400 mt-0.5">Python 数据处理</div>
                            </div>
                            {htmlStage >= 2 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const content = streamedCodeById.python || latestHtmlMsg.python || '';
                                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                                  saveAs(blob, `${latestHtmlMsg.fileName.replace('.html', '')}.py`);
                                }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="下载"
                              ><Download size={14} /></button>
                            )}
                          </div>
                          <div
                            onClick={() => htmlStage >= 3 && setOpenedFile('html')}
                            className={`w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${htmlStage >= 3 ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${htmlStage >= 3 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-300'}`}><FileText size={16} /></div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{latestHtmlMsg.fileName}</div>
                              <div className="text-xs text-gray-400 mt-0.5">HTML 页面原型</div>
                            </div>
                            {htmlStage >= 3 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const content = streamedCodeById.html || latestHtmlMsg.code || '';
                                  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
                                  saveAs(blob, latestHtmlMsg.fileName);
                                }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="下载"
                              ><Download size={14} /></button>
                            )}
                          </div>
                          {htmlCodeDone && (
                            <button
                              onClick={async () => {
                                const zip = new JSZip();
                                const baseName = latestHtmlMsg.fileName.replace('.html', '');
                                if (streamedCodeById.sql || latestHtmlMsg.sql) zip.file(`${baseName}.sql`, streamedCodeById.sql || latestHtmlMsg.sql);
                                if (streamedCodeById.python || latestHtmlMsg.python) zip.file(`${baseName}.py`, streamedCodeById.python || latestHtmlMsg.python);
                                if (streamedCodeById.html || latestHtmlMsg.code) zip.file(latestHtmlMsg.fileName, streamedCodeById.html || latestHtmlMsg.code);
                                const blob = await zip.generateAsync({ type: 'blob' });
                                saveAs(blob, `${baseName}.zip`);
                              }}
                              className="w-full mt-2 border border-blue-200 bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <Download size={14} />
                              一键打包下载所有文件
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>}
              </div>
            </div>
          ) : isBoardWorkspace ? (
            <div className="w-full max-w-none mx-auto flex-1 min-h-0">
              <div className={`grid gap-0 border border-gray-200 rounded-none bg-white h-full min-h-0 overflow-hidden ${boardDashboardVisible ? 'grid-cols-1 lg:grid-cols-[44%_56%]' : 'grid-cols-1'}`}>
                {/* Left: Chat Panel */}
                <div className="border-r border-gray-200 bg-white flex flex-col h-full min-h-0 overflow-hidden">
                  <div ref={leftChatRef} className="px-6 pb-4 pt-4 flex-1 space-y-4 overflow-y-auto min-h-0">
                    {messages.map(msg => msg.role === 'user' ? (
                      <div key={msg.id} className="flex justify-end">
                        <div className="max-w-[85%] bg-blue-50 text-gray-800 border border-blue-100 px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed">{msg.content}</div>
                      </div>
                    ) : (
                      <div key={msg.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600"><Bot size={14} /></div>
                        <div className="flex-1">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{msg.content || msg.text || ''}</div>
                        </div>
                      </div>
                    ))}
                    {boardStreamingMsgId && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600"><Bot size={14} /></div>
                        <div className="flex-1">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed">
                            {boardStreamingText}<span className="inline-block w-0.5 h-4 bg-blue-500 animate-pulse ml-0.5 align-text-bottom"></span>
                          </div>
                          {boardSteps.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {boardSteps.map((step, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-1">
                                  {i < boardSteps.length - 1 || boardSteps.length === 3 ? (
                                    <Check size={14} className="text-green-500" />
                                  ) : (
                                    <Loader2 size={14} className="text-blue-500 animate-spin" />
                                  )}
                                  <span className={i < boardSteps.length - 1 || boardSteps.length === 3 ? 'text-green-700' : 'text-blue-600'}>{step}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 mt-auto flex-shrink-0">
                    {renderInputBox()}
                  </div>
                </div>

                {/* Right: Dashboard Preview */}
                {boardDashboardVisible && (
                  <div className="bg-gray-50 flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-2">
                    <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><BarChart2 size={16} /></div>
                        <h3 className="text-sm font-bold text-gray-800">{boardTitle}</h3>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                      {/* Dynamic Filters */}
                      {boardFilters.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {boardFilters.map(filter => (
                            <div key={filter.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 flex-wrap animate-in fade-in slide-in-from-top-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Filter size={14} className="text-gray-400" />
                                <span className="font-medium">{filter.label}</span>
                              </div>
                              {filter.type === 'date' && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500">开始日期</label>
                                    <input type="date" value={filter.value?.start || ''} onChange={e => updateBoardFilter(filter.id, { ...filter.value, start: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500">结束日期</label>
                                    <input type="date" value={filter.value?.end || ''} onChange={e => updateBoardFilter(filter.id, { ...filter.value, end: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                                  </div>
                                </>
                              )}
                              {filter.type === 'area' && (
                                <select value={filter.value || ''} onChange={e => updateBoardFilter(filter.id, e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 min-w-[120px]">
                                  <option value="">全部属地</option>
                                  {boardUniqueAreas.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                              )}
                              {filter.type === 'district' && (
                                <select value={filter.value || ''} onChange={e => updateBoardFilter(filter.id, e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 min-w-[120px]">
                                  <option value="">全部区县</option>
                                  {boardUniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                              )}
                              {filter.type === 'grid' && (
                                <select value={filter.value || ''} onChange={e => updateBoardFilter(filter.id, e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 min-w-[120px]">
                                  <option value="">全部网格</option>
                                  {boardUniqueGrids.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                              )}
                              {filter.type === 'hall' && (
                                <select value={filter.value || ''} onChange={e => updateBoardFilter(filter.id, e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 min-w-[120px]">
                                  <option value="">全部营业厅</option>
                                  {boardUniqueHalls.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                              )}
                              <button onClick={() => removeBoardFilter(filter.id)} className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50" title="移除此筛选">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          <div className="flex items-center justify-end text-xs text-gray-400">共 {boardFilteredData.length} 条记录</div>
                        </div>
                      )}
                      {boardFilters.length === 0 && (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 mb-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                          <Filter size={14} /> 暂无筛选条件，可通过左侧对话添加
                        </div>
                      )}

                      {/* Data Table — dynamic columns */}
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden relative" onClick={() => setBoardContextMenu(null)}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              {/* Row 1: dimension headers (rowSpan 2) + metric group headers */}
                              <tr className="bg-gray-50 border-b border-gray-200">
                                {boardDimCols.map(k => {
                                  const def = BOARD_ALL_COLUMNS[k];
                                  return <th key={k} rowSpan={boardMetricGroups.length > 0 ? 2 : 1} className="px-3 py-2 text-left text-xs font-bold text-gray-600 border-r border-gray-100 whitespace-nowrap">{def.label}</th>;
                                })}
                                {boardMetricGroups.map((mg) => {
                                  const colorMap = { blue: 'text-blue-600 bg-blue-50/50', emerald: 'text-emerald-600 bg-emerald-50/50', orange: 'text-orange-600 bg-orange-50/50', purple: 'text-purple-600 bg-purple-50/50', gray: 'text-gray-600 bg-gray-50/50' };
                                  return <th key={mg.group} colSpan={mg.cols.length} className={`px-3 py-2 text-center text-xs font-bold border-r border-gray-100 ${colorMap[mg.color] || colorMap.gray}`}>{mg.group}</th>;
                                })}
                              </tr>
                              {/* Row 2: individual metric sub-headers */}
                              {boardMetricGroups.length > 0 && (
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  {boardMetricCols.map((mk, mi) => (
                                    <th key={mk} className={`px-3 py-1.5 text-center text-xs font-medium text-gray-500 border-r border-gray-100 whitespace-nowrap`}>{BOARD_ALL_COLUMNS[mk].label}</th>
                                  ))}
                                </tr>
                              )}
                            </thead>
                            <tbody>
                              {boardFilteredData.map((row, i) => (
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
                                  {boardMetricCols.map((mk, mi) => {
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
                    </div>
                  </div>
                )}
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

      {isChatting && !isHtmlWorkspace && !isBoardWorkspace && (
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
  const [activeGenType, setActiveGenType] = useState('qa');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  const [favoriteReports, setFavoriteReports] = useState(() => {
    const saved = window.localStorage.getItem('chatbi_favorite_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const publicBase = import.meta.env.BASE_URL;

  useEffect(() => {
    window.localStorage.setItem('chatbi_favorite_reports', JSON.stringify(favoriteReports));
  }, [favoriteReports]);

  const [pendingRemoveReportId, setPendingRemoveReportId] = useState(null);
  const [showManagerShareModal, setShowManagerShareModal] = useState(false);
  const [managerShareCopied, setManagerShareCopied] = useState(false);
  const [showManagerDownloadModal, setShowManagerDownloadModal] = useState(false);
  const [htmlTemplates, setHtmlTemplates] = useState([
    { id: 't1', name: '园区人流分析报告模版', creator: 'yuchen', createdAt: '2026-02-10 14:30', file: { name: '园区人流分析报告.html', size: 25600 } },
    { id: 't2', name: '通信费用月度报告模版', creator: 'admin', createdAt: '2026-02-08 09:15', file: { name: '通信费用月度报告.html', size: 18432 } },
    { id: 't3', name: '经营数据看板模版', creator: 'yuchen', createdAt: '2026-01-20 16:45', file: { name: '经营数据看板.html', size: 31744 } },
  ]);
  const [pendingDeleteTemplateId, setPendingDeleteTemplateId] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateEditName, setTemplateEditName] = useState('');
  const [templateEditFile, setTemplateEditFile] = useState(null);
  const [isDraggingEditFile, setIsDraggingEditFile] = useState(false);
  const editTemplateFileRef = useRef(null);
  const [favoriteSearchQuery, setFavoriteSearchQuery] = useState('');
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateFile, setNewTemplateFile] = useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const addTemplateFileRef = useRef(null);

  const handleAddTemplateFile = (file) => {
    if (file && file.name.endsWith('.html')) {
      setNewTemplateFile(file);
    }
  };

  const handleAddTemplateConfirm = () => {
    if (!newTemplateName.trim() || !newTemplateFile) return;
    setHtmlTemplates(prev => [...prev, {
      id: `t-${Date.now()}`,
      name: newTemplateName.trim(),
      creator: '当前用户',
      createdAt: new Date().toLocaleString('zh-CN'),
      file: newTemplateFile,
    }]);
    setShowAddTemplateModal(false);
    setNewTemplateName('');
    setNewTemplateFile(null);
  };

  const removeFavoriteReport = (reportId) => {
    setFavoriteReports(prev => prev.filter(r => r.id !== reportId));
    setPendingRemoveReportId(null);
  };

  const handleDownloadZipFromManager = async () => {
    const baseUrl = `${publicBase}yuanqu/`;
    try {
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');
      const zip = new JSZip();
      const files = ['index.html', 'styles.css', 'script.js'];
      for (const f of files) {
        const resp = await fetch(baseUrl + f);
        const text = await resp.text();
        zip.file(f, text);
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, '报告.zip');
    } catch (e) {
      console.error('Download failed:', e);
    }
  };

  const visibleNotifications = showAllNotifications ? announcements : announcements.slice(0, 3);

  const goHome = () => {
    setCurrentView('home');
    setHomeViewKey(prev => prev + 1);
  };

  const isAgentView = currentView === 'chat-agent-1';
  const historyData = isAgentView ? agentHistoryData : globalHistoryData;
  const historyTitle = isAgentView ? '舆情助手历史' : '历史对话';

  const genTypeLabel = { qa: '智能问数', report: '报告生成', brief: '通报仿写', explore: '探索分析', html: 'HTML页面生成', board: '智能看板' };

  const buildBreadcrumbs = () => {
    const crumbs = [{ label: '首页', action: goHome }];
    if (currentView === 'home') {
      crumbs.push({ label: genTypeLabel[activeGenType] || '智能问数' });
    } else if (currentView === 'agent-manage') {
      crumbs.push({ label: 'BI智能体' });
      crumbs.push({ label: '智能体管理' });
    } else if (currentView === 'agents') {
      crumbs.push({ label: '智能体广场' });
    } else if (currentView === 'chat-agent-1') {
      const agent = agentManageData.find(a => a.id === 1);
      crumbs.push({ label: agent?.name || '舆情分析助手', action: () => setCurrentView('chat-agent-1') });
      crumbs.push({ label: genTypeLabel[activeGenType] || '智能问数' });
    } else if (currentView === 'smart-builder') {
      crumbs.push({ label: '智能看板' });
    } else if (currentView === 'report-favorite') {
      crumbs.push({ label: '报告管理' });
      crumbs.push({ label: '报告收藏' });
    } else if (currentView === 'html-template-manage') {
      crumbs.push({ label: '报告管理' });
      crumbs.push({ label: 'HTML模版管理' });
    }
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // smart-builder view is now handled inline as board mode in HomeView

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
            <div className="hidden md:flex items-center text-sm text-gray-500 gap-1">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={14} className="text-gray-300" />}
                  {crumb.action ? (
                    <button onClick={crumb.action} className="text-gray-500 hover:text-blue-600 transition-colors">{crumb.label}</button>
                  ) : (
                    <span className="text-gray-800 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
              <div className="relative">
              <div
                className="relative cursor-pointer p-1.5 rounded hover:bg-gray-100"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) {
                    setShowAllNotifications(false);
                  }
                }}
              >
                <Bell size={20} className="text-gray-500" />
              </div>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white shadow-xl rounded-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <h3 className="font-bold text-gray-800 text-sm">公告</h3>
                    {announcements.length > 3 && (
                      <button
                        onClick={() => setShowAllNotifications((prev) => !prev)}
                        className="text-xs text-blue-500 hover:text-blue-600"
                      >
                        {showAllNotifications ? '收起' : '查看更多'}
                      </button>
                    )}
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {visibleNotifications.map((item) => (
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
        {currentView === 'home' && <HomeView key={homeViewKey} onNavigate={setCurrentView} favoriteReports={favoriteReports} setFavoriteReports={setFavoriteReports} onGenTypeChange={setActiveGenType} />}
        {currentView === 'agent-manage' && <AgentManageView />}
        {currentView === 'agents' && <AgentsView onNavigate={setCurrentView} />}
        {currentView === 'chat-agent-1' && <ChatAgentView onBack={goHome} favoriteReports={favoriteReports} setFavoriteReports={setFavoriteReports} agentInfo={agentManageData.find(a => a.id === 1)} onNavigate={setCurrentView} onGenTypeChange={setActiveGenType} />}
        {currentView === 'report-favorite' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500"><Sparkles size={20} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">报告收藏</h2>
                    <p className="text-sm text-gray-400">收藏的 HTML 报告在这里集中管理</p>
                  </div>
                </div>
                {favoriteReports.length > 0 && (
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={favoriteSearchQuery}
                      onChange={(e) => setFavoriteSearchQuery(e.target.value)}
                      placeholder="搜索报告名称"
                      className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm w-56 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                    />
                  </div>
                )}
              </div>
              {favoriteReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <Sparkles size={48} className="mb-4 text-gray-200" />
                  <div className="text-base font-medium mb-1">暂无收藏报告</div>
                  <div className="text-sm">生成报告后点击收藏按钮即可添加到这里</div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-xs bg-gray-50/50">
                        <th className="text-left px-6 py-3 font-medium">报告名称</th>
                        <th className="text-left px-4 py-3 font-medium">创建人</th>
                        <th className="text-left px-4 py-3 font-medium">收藏时间</th>
                        <th className="text-right px-6 py-3 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favoriteReports.filter(r => r.name.toLowerCase().includes(favoriteSearchQuery.toLowerCase())).map((report) => (
                        <tr key={report.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0"><FileText size={13} /></div>
                              <span className="font-medium text-gray-700 truncate max-w-[240px]">{report.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{report.creator}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{report.createdAt}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => window.open(`${window.location.origin}${publicBase}yuanqu/index.html`, '_blank')}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="查看"
                              ><Globe size={14} /></button>
                              <button
                                onClick={() => setShowManagerDownloadModal(true)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="下载"
                              ><Download size={14} /></button>
                              <button
                                onClick={() => { setShowManagerShareModal(true); setManagerShareCopied(false); }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                                title="分享"
                              ><Share2 size={14} /></button>
                              <button
                                onClick={() => setPendingRemoveReportId(report.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                                title="取消收藏"
                              ><StarOff size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
        {currentView === 'html-template-manage' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500"><LayoutTemplate size={20} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">HTML 模版管理</h2>
                    <p className="text-sm text-gray-400">管理报告生成所使用的 HTML 模版</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={templateSearchQuery}
                      onChange={(e) => setTemplateSearchQuery(e.target.value)}
                      placeholder="搜索模版名称"
                      className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <button
                    onClick={() => { setShowAddTemplateModal(true); setNewTemplateName(''); setNewTemplateFile(null); }}
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus size={16} /> 添加模版
                  </button>
                </div>
              </div>
              {htmlTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <LayoutTemplate size={48} className="mb-4 text-gray-200" />
                  <div className="text-base font-medium mb-1">暂无模版</div>
                  <div className="text-sm">添加 HTML 模版后将在这里展示</div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-xs bg-gray-50/50">
                        <th className="text-left px-6 py-3 font-medium">模版名称</th>
                        <th className="text-left px-4 py-3 font-medium">创建人</th>
                        <th className="text-left px-4 py-3 font-medium">创建时间</th>
                        <th className="text-right px-6 py-3 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {htmlTemplates.filter(t => t.name.toLowerCase().includes(templateSearchQuery.toLowerCase())).map((tpl) => (
                        <tr key={tpl.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0"><LayoutTemplate size={13} /></div>
                              <span className="font-medium text-gray-700 truncate max-w-[240px]">{tpl.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{tpl.creator}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{tpl.createdAt}</td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => { setEditingTemplate(tpl); setTemplateEditName(tpl.name); setTemplateEditFile(tpl.file || null); setIsDraggingEditFile(false); }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="修改"
                              ><Pencil size={14} /></button>
                              <button
                                onClick={() => window.open(`${window.location.origin}${publicBase}yuanqu/index.html`, '_blank')}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                title="查看"
                              ><Eye size={14} /></button>
                              <button
                                onClick={() => handleDownloadZipFromManager()}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="下载"
                              ><Download size={14} /></button>
                              <button
                                onClick={() => setPendingDeleteTemplateId(tpl.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="删除"
                              ><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 添加模版弹窗 */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center" onClick={() => setShowAddTemplateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Plus size={18} className="text-blue-600" /> 添加模版</h3>
              <button onClick={() => setShowAddTemplateModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">模版名称</label>
              <input
                type="text"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="请输入模版名称"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                autoFocus
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">模版上传</label>
                <a
                  href={`${publicBase}yuanqu/index.html`}
                  download="template.html"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Download size={12} /> 下载 HTML 模版示例
                </a>
              </div>

              <input
                ref={addTemplateFileRef}
                type="file"
                accept=".html"
                className="hidden"
                onChange={(e) => { if (e.target.files[0]) handleAddTemplateFile(e.target.files[0]); e.target.value = ''; }}
              />

              {newTemplateFile ? (
                <div className="border border-blue-200 bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                    <FileText size={16} className="text-blue-500" />
                    {newTemplateFile.name}
                    <span className="text-xs text-blue-400 font-normal">({(newTemplateFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button onClick={() => setNewTemplateFile(null)} className="text-blue-400 hover:text-blue-600"><X size={14} /></button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl px-4 py-8 text-center cursor-pointer transition-colors ${isDraggingFile ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  onClick={() => addTemplateFileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(false);
                    const file = e.dataTransfer.files[0];
                    if (file) handleAddTemplateFile(file);
                  }}
                >
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDraggingFile ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
                      <FileText size={24} />
                    </div>
                    <div className="text-sm font-medium text-gray-500">点击或将文件拖拽到这里</div>
                    <div className="text-xs text-gray-400">上传 HTML 文件（文件中可以包含 JS 和 CSS 代码）</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowAddTemplateModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={handleAddTemplateConfirm}
                disabled={!newTemplateName.trim() || !newTemplateFile}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Plus size={14} /> 确认添加
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 模版修改弹窗 */}
      {editingTemplate && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center" onClick={() => setEditingTemplate(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Pencil size={18} className="text-blue-600" /> 修改模版</h3>
              <button onClick={() => setEditingTemplate(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">模版名称</label>
              <input
                type="text"
                value={templateEditName}
                onChange={(e) => setTemplateEditName(e.target.value)}
                placeholder="请输入模版名称"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                autoFocus
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">模版文件</label>
                <a
                  href={`${publicBase}yuanqu/index.html`}
                  download="template.html"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Download size={12} /> 下载 HTML 模版示例
                </a>
              </div>

              <input
                ref={editTemplateFileRef}
                type="file"
                accept=".html"
                className="hidden"
                onChange={(e) => { if (e.target.files[0] && e.target.files[0].name.endsWith('.html')) setTemplateEditFile(e.target.files[0]); e.target.value = ''; }}
              />

              {templateEditFile ? (
                <div className="border border-blue-200 bg-blue-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                    <FileText size={16} className="text-blue-500" />
                    {templateEditFile.name}
                    {templateEditFile.size && <span className="text-xs text-blue-400 font-normal">({(templateEditFile.size / 1024).toFixed(1)} KB)</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => editTemplateFileRef.current?.click()} className="text-xs text-blue-600 hover:text-blue-700 font-medium">重新上传</button>
                    <button onClick={() => setTemplateEditFile(null)} className="text-blue-400 hover:text-blue-600"><X size={14} /></button>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl px-4 py-8 text-center cursor-pointer transition-colors ${isDraggingEditFile ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  onClick={() => editTemplateFileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingEditFile(true); }}
                  onDragLeave={() => setIsDraggingEditFile(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingEditFile(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.name.endsWith('.html')) setTemplateEditFile(file);
                  }}
                >
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDraggingEditFile ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
                      <FileText size={24} />
                    </div>
                    <div className="text-sm font-medium text-gray-500">点击或将文件拖拽到这里</div>
                    <div className="text-xs text-gray-400">上传 HTML 文件（文件中可以包含 JS 和 CSS 代码）</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setEditingTemplate(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={() => {
                  if (templateEditName.trim()) {
                    setHtmlTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...t, name: templateEditName.trim(), ...(templateEditFile ? { file: templateEditFile } : {}) } : t));
                    setEditingTemplate(null);
                  }
                }}
                disabled={!templateEditName.trim()}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Pencil size={14} /> 确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 模版删除确认弹窗 */}
      {pendingDeleteTemplateId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center" onClick={() => setPendingDeleteTemplateId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"><Trash2 size={20} className="text-red-500" /></div>
              <h3 className="text-lg font-bold text-gray-800">确认删除模版</h3>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-red-700 leading-relaxed">删除后该模版将永久移除，此操作不可撤销。</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setPendingDeleteTemplateId(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={() => { setHtmlTemplates(prev => prev.filter(t => t.id !== pendingDeleteTemplateId)); setPendingDeleteTemplateId(null); }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {showManagerShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setShowManagerShareModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[480px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Share2 size={18} className="text-blue-600" /> 创建分享链接</h3>
              <button onClick={() => setShowManagerShareModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-amber-700 leading-relaxed">任何获得链接的人都可以查看你生成的报告内容，请检查是否包含敏感或隐私内容。</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 truncate select-all">
                {`${window.location.origin}${publicBase}yuanqu/index.html`}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}${publicBase}yuanqu/index.html`);
                  setManagerShareCopied(true);
                  setTimeout(() => setManagerShareCopied(false), 2000);
                }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${managerShareCopied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {managerShareCopied ? '已复制' : '复制链接'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showManagerDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40" onClick={() => setShowManagerDownloadModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Download size={18} className="text-blue-600" /> 下载报告文件</h3>
              <button onClick={() => setShowManagerDownloadModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-600 mb-2">将下载以下文件的压缩包：</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-gray-700"><FileText size={14} className="text-blue-500" /> index.html</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Code size={14} className="text-yellow-500" /> styles.css</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Code size={14} className="text-emerald-500" /> script.js</div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowManagerDownloadModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button
                onClick={() => { setShowManagerDownloadModal(false); handleDownloadZipFromManager(); }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                确认下载
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingRemoveReportId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center" onClick={() => setPendingRemoveReportId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"><StarOff size={20} className="text-red-500" /></div>
              <h3 className="text-lg font-bold text-gray-800">确认取消收藏</h3>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-red-700 leading-relaxed">取消收藏后该报告将从收藏列表中移除，此操作不可撤销。</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setPendingRemoveReportId(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">取消</button>
              <button onClick={() => removeFavoriteReport(pendingRemoveReportId)} className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">确认取消收藏</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
