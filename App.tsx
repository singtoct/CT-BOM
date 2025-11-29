
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Orders } from './components/Orders';
import { Production } from './components/Production';
import { ProductManagement } from './components/ProductManagement';
import { QC } from './components/QC';
import { Employees } from './components/Employees';
import { Procurement } from './components/Procurement';
import { Bell, Search, User, Settings, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Language } from './services/translations';

function AppContent() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { t, language, setLanguage } = useLanguage();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'orders':
        return <Orders />;
      case 'production':
        return <Production />;
      case 'product_management':
        return <ProductManagement />;
      case 'qc':
        return <QC />;
      case 'employees':
        return <Employees />;
      case 'procurement':
        return <Procurement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600">{t('under_construction')}</h3>
            <p className="text-sm">{t('coming_soon', { module: t(currentView) || currentView })}</p>
          </div>
        );
    }
  };

  const LanguageButton = ({ lang, label }: { lang: Language; label: string }) => (
    <button
      onClick={() => setLanguage(lang)}
      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
        language === lang
          ? 'bg-blue-100 text-blue-700 border border-blue-200'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize">
            {t(currentView)}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 mr-4 bg-slate-50 p-1 rounded-lg border border-slate-100">
              <Globe className="w-4 h-4 text-slate-400 ml-2 mr-1" />
              <LanguageButton lang="th" label="TH" />
              <LanguageButton lang="en" label="EN" />
              <LanguageButton lang="zh" label="CN" />
            </div>

            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('search_placeholder')} 
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-full text-sm outline-none transition-all w-64"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium border border-blue-200">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;