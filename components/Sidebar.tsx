
import React from 'react';
import { LayoutDashboard, Package, Box, Factory, Users, ClipboardCheck, Settings, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'orders', label: t('orders'), icon: Package },
    { id: 'production', label: t('production'), icon: Factory },
    { id: 'inventory', label: t('inventory'), icon: Box },
    { id: 'qc', label: t('qc'), icon: ClipboardCheck },
    { id: 'employees', label: t('employees'), icon: Users },
    { id: 'reports', label: t('reports'), icon: BarChart3 },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-10">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Factory className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">CT Electric</h1>
          <p className="text-xs text-slate-400">{t('factory_erp')}</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
            MG
          </div>
          <div>
            <p className="text-sm font-medium">{t('manager')}</p>
            <p className="text-xs text-slate-500">{t('online')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
