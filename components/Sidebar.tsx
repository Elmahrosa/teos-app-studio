import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code2, 
  Store, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  Hexagon,
  CreditCard
} from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Workspace', path: '/workspace', icon: Code2 },
  { label: 'Marketplace', path: '/marketplace', icon: Store },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Compliance', path: '/compliance', icon: ShieldCheck },
  { label: 'Pricing', path: '/pricing', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Hexagon className="w-8 h-8 text-amber-400 fill-amber-400/20 mr-3" />
        <span className="text-lg font-bold tracking-tight text-stone-100">
          TEOS <span className="text-amber-400">Studio</span>
        </span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-md transition-all duration-200 group ${
                isActive
                  ? 'bg-amber-400/10 text-amber-400 border-l-2 border-amber-400'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-stone-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full px-3 py-2 text-slate-400 hover:text-stone-100 transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-sm">Settings</span>
        </button>
        <div className="mt-4 px-3 py-2 bg-slate-900 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-500 mb-1">Status</div>
          <div className="flex items-center text-xs text-green-400 font-mono">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            System Online
          </div>
        </div>
      </div>
    </aside>
  );
};