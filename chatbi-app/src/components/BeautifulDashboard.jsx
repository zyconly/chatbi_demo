import React from 'react';
import { Download, Copy, ChevronDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell
} from 'recharts';

const dataCategoryProfit = [
  { category: 'Outerwear', profit: 92 },
  { category: 'Dresses', profit: 50 },
  { category: 'Bottoms', profit: 28 },
  { category: 'Tops', profit: 15 },
];

const dataProductProfit = [
  { sku: 'sku_cut_028', profit: 5000 },
  { sku: 'sku_cut_015', profit: 4500 },
  { sku: 'sku_cut_005', profit: 4000 },
  { sku: 'sku_cut_022', profit: 4000 },
  { sku: 'sku_cut_021', profit: 3950 },
  { sku: 'sku_cut_014', profit: 3900 },
  { sku: 'sku_cut_019', profit: 3850 },
  { sku: 'sku_cut_018', profit: 3700 },
  { sku: 'sku_cut_025', profit: 3500 },
  { sku: 'sku_cut_024', profit: 3450 },
  { sku: 'sku_cut_007', profit: 3400 },
  { sku: 'sku_cut_016', profit: 3400 },
  { sku: 'sku_cut_030', profit: 3350 },
  { sku: 'sku_cut_027', profit: 3300 },
  { sku: 'sku_cut_026', profit: 3260 },
].reverse();

const dataSizeProfit = [
  { size: 'XS', profit: 18880, color: '#1890ff' },
  { size: 'XL', profit: 20280, color: '#52c41a' },
  { size: 'S', profit: 36270, color: '#fa8c16' },
  { size: 'L', profit: 51870, color: '#f5222d' },
  { size: 'M', profit: 59720, color: '#722ed1' },
];

const dataRevenueVsProfit = [
  { sku: 'sku_out_028', revenue: 1.55, profit: 0.45 },
  { sku: 'sku_out_015', revenue: 1.50, profit: 0.40 },
  { sku: 'sku_out_005', revenue: 1.45, profit: 0.42 },
  { sku: 'sku_out_014', revenue: 1.42, profit: 0.38 },
  { sku: 'sku_out_012', revenue: 1.40, profit: 0.22 },
  { sku: 'sku_out_019', revenue: 1.39, profit: 0.35 },
  { sku: 'sku_out_007', revenue: 1.35, profit: 0.37 },
  { sku: 'sku_out_024', revenue: 1.33, profit: 0.34 },
  { sku: 'sku_out_022', revenue: 1.30, profit: 0.36 },
  { sku: 'sku_out_018', revenue: 1.28, profit: 0.35 },
  { sku: 'sku_out_016', revenue: 1.25, profit: 0.34 },
  { sku: 'sku_out_002', revenue: 1.20, profit: 0.33 },
  { sku: 'sku_out_027', revenue: 1.18, profit: 0.32 },
  { sku: 'sku_out_025', revenue: 1.15, profit: 0.35 },
];

const dataSizeRates = [
  { size: 'XS', profit_margin: 19.0, refund_rate: 9.5, return_rate: 12.0 },
  { size: 'XL', profit_margin: 17.5, refund_rate: 11.0, return_rate: 14.1 },
  { size: 'S',  profit_margin: 24.5, refund_rate: 4.5, return_rate: 5.2 },
  { size: 'L',  profit_margin: 24.8, refund_rate: 4.1, return_rate: 5.0 },
  { size: 'M',  profit_margin: 23.7, refund_rate: 4.8, return_rate: 6.0 },
];

const ChartCard = ({ title, children, className }) => (
  <div className={`bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-5 border border-gray-100 flex flex-col ${className || ''}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-800 font-bold text-[15px]">{title}</h3>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1 bg-gray-100/80 hover:bg-gray-200 text-gray-600 text-[11px] rounded-md transition-colors font-medium">
          AI Chart <ChevronDown size={12} />
        </button>
        <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors"><Download size={14} /></button>
        <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors"><Copy size={14} /></button>
      </div>
    </div>
    <div className="flex-1 w-full min-h-0 relative flex flex-col items-center justify-center">
      <h4 className="absolute top-0 text-center w-full text-gray-800 font-bold text-[15px]">{title}</h4>
      <div className="w-full h-full mt-6">
        {children}
      </div>
    </div>
  </div>
);

export default function BeautifulDashboard() {
  return (
    <div className="w-full h-full bg-[#f4f6f8] overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title somewhat inspired by the screenshot's 'canvas_1' header */}
        <div className="flex items-center gap-3 mb-2 pt-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-800 leading-tight">canvas_1</h1>
            <p className="text-[11px] text-gray-500">共享看板</p>
          </div>
        </div>

        {/* Top Row: 3 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          {/* Chart 1 */}
          <ChartCard title="Total Net Profit by Category">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategoryProfit} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} ticks={[0,20,40,60,80,100]} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="profit" fill="#007BFF" radius={[2, 2, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 2 */}
          <ChartCard title="Top 15 Products by Net Profit">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dataProductProfit} margin={{ top: 20, right: 20, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} ticks={[0,1000,2000,3000,4000,5000,6000]} />
                <YAxis type="category" dataKey="sku" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6B7280' }} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="profit" fill="#007BFF" radius={[0, 2, 2, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 3 */}
          <ChartCard title="Total Net Profit by Size">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSizeProfit} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} ticks={[0,10000,20000,30000,40000,50000,60000]} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="profit" maxBarSize={8} radius={[4, 4, 0, 0]}>
                  {dataSizeProfit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                {/* Custom legend mimicking screenshot */}
                <Legend 
                  content={() => (
                    <div className="flex flex-wrap justify-center gap-4 text-[10px] text-gray-700 font-medium mb-4">
                      {dataSizeProfit.map(entry => (
                        <div key={entry.size} className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-sm" style={{backgroundColor: entry.color}}></span>
                          {entry.profit.toLocaleString().replace(/,/g, '.').substring(0, 5)} 
                        </div>
                      ))}
                    </div>
                  )}
                  verticalAlign="top"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Bottom Row: 2 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
          {/* Chart 4 */}
          <ChartCard title="Top 20 Products Revenue vs Net Profit">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataRevenueVsProfit} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="sku" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6B7280', angle: -35, textAnchor: 'end' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} ticks={[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8]} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 500, paddingBottom: 15 }} verticalAlign="top"/>
                <Bar dataKey="revenue" name="total_revenue" fill="#007BFF" radius={[2, 2, 0, 0]} maxBarSize={12} />
                <Bar dataKey="profit" name="total_net_profit" fill="#32D74B" radius={[2, 2, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Chart 5 */}
          <ChartCard title="Profit Margin, Refund & Return Rate by Size">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSizeRates} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="size" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} ticks={[0, 5, 10, 15, 20, 25]} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 500, paddingBottom: 15 }} verticalAlign="top"/>
                <Bar dataKey="profit_margin" name="profit_margin_pct" fill="#007BFF" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="refund_rate" name="refund_rate_pct" fill="#32D74B" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="return_rate" name="return_rate_pct" fill="#FF9500" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Text Summary Card */}
        <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-6 border border-gray-100 flex flex-col mb-10">
          <div className="text-gray-600 font-bold text-sm mb-4">canvas-summary-1769755731682848</div>
          <h2 className="text-[22px] font-bold text-gray-800 mb-6">Fashion E-Commerce Business Performance Analysis</h2>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <h3 className="text-[15px] font-bold text-gray-700">Executive Summary</h3>
          </div>
          
          <div className="px-4">
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              The fashion e-commerce business demonstrates <strong className="text-gray-800">strong overall profitability</strong> with total revenue of <strong className="text-gray-800">$837,938.68</strong> and net profit of <strong className="text-gray-800">$189,093.33</strong>, achieving a <strong className="text-gray-800">22.57% profit margin</strong>. All 120 products are profitable, but significant performance disparities exist across categories, products, and sizes.
            </p>
            <p className="text-[13px] font-bold text-gray-800 mb-2">Key Findings:</p>
            <ul className="list-disc pl-5 text-[13px] text-gray-600 leading-relaxed space-y-1.5 mb-8">
              <li><strong className="text-gray-800">Outerwear</strong> dominates profitability (49.7% of total profit, 25.06% margin)</li>
              <li><strong className="text-gray-800">Tops</strong> significantly underperforms (7.8% of total profit, 15.75% margin)</li>
              <li><strong className="text-gray-800">XS and XL sizes</strong> face elevated return risks (12-14% return rates vs. 5-6% for core sizes)</li>
              <li>Two high-revenue products <strong className="text-gray-800">(sku_out_012, sku_out_006)</strong> show concerning low margins (14.90-17.49%)</li>
              <li>All products exceed expected margins by average <strong className="text-gray-800">20.66 percentage points</strong></li>
            </ul>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <h3 className="text-[15px] font-bold text-gray-700">Key Performance Insights</h3>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="text-center text-gray-400 text-xs py-4 flex items-center justify-center gap-1">
          技术支持 <span className="font-medium text-gray-500">Ada</span>
        </div>

      </div>
    </div>
  );
}
