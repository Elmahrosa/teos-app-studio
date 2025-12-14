import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const trafficData = [
  { name: 'Mon', active: 4000, api: 2400 },
  { name: 'Tue', active: 3000, api: 1398 },
  { name: 'Wed', active: 2000, api: 9800 },
  { name: 'Thu', active: 2780, api: 3908 },
  { name: 'Fri', active: 1890, api: 4800 },
  { name: 'Sat', active: 2390, api: 3800 },
  { name: 'Sun', active: 3490, api: 4300 },
];

const performanceData = [
  { name: 'Auth', latency: 120 },
  { name: 'DB Read', latency: 45 },
  { name: 'AI Gen', latency: 800 },
  { name: 'Render', latency: 200 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-100 mb-2">Performance Analytics</h1>
        <p className="text-slate-400">Real-time telemetry from your api-orchestrator node.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-stone-200 mb-6">API Traffic vs Active Users</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f5f5f4' }} 
                  itemStyle={{ color: '#f5f5f4' }}
                />
                <Area type="monotone" dataKey="api" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#colorApi)" />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-stone-200 mb-6">Service Latency (ms)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                   cursor={{fill: '#1e293b'}}
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f5f5f4' }} 
                />
                <Bar dataKey="latency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
           <div>
             <div className="text-sm text-slate-500">Total API Calls</div>
             <div className="text-xl font-bold text-stone-100">1.2M</div>
           </div>
           <div className="text-xs text-green-400 font-mono">+12%</div>
         </div>
         <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
           <div>
             <div className="text-sm text-slate-500">Error Rate</div>
             <div className="text-xl font-bold text-stone-100">0.02%</div>
           </div>
           <div className="text-xs text-green-400 font-mono">Stable</div>
         </div>
         <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
           <div>
             <div className="text-sm text-slate-500">SDG Impact Score</div>
             <div className="text-xl font-bold text-amber-400">A+</div>
           </div>
           <div className="text-xs text-amber-400 font-mono">High</div>
         </div>
      </div>
    </div>
  );
};