
import React from 'react';
import { getOrders, getMachines, getInventory, getQCEntries } from '../services/dataService';
import { Package, AlertTriangle, Activity, CheckCircle, Factory } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const orders = getOrders();
  const machines = getMachines();
  const inventory = getInventory();
  const qc = getQCEntries();
  const { t } = useLanguage();

  const pendingOrders = orders.filter(o => o.status !== 'Completed').length;
  const activeMachines = machines.filter(m => m.status === 'ทำงาน').length;
  const lowStockItems = inventory.filter(i => i.quantity < 100).length;
  const passedQC = qc.filter(q => q.status === 'Passed').length;

  const orderTrendData = orders.slice(0, 10).map(o => ({
    name: o.name.substring(0, 10) + '...',
    quantity: o.quantity,
    delivered: o.quantityDelivered || 0
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{t('pending_orders')}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{pendingOrders}</h3>
            <p className="text-xs text-blue-600 mt-1 font-medium">+12% {t('from_last_week')}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{t('active_machines')}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{activeMachines} <span className="text-lg text-slate-400 font-normal">/ {machines.length}</span></h3>
            <p className="text-xs text-emerald-600 mt-1 font-medium">92% {t('efficiency')}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <Factory className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{t('low_stock_alerts')}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{lowStockItems}</h3>
            <p className="text-xs text-amber-600 mt-1 font-medium">{t('requires_attention')}</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{t('qc_passed_today')}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{passedQC}</h3>
            <p className="text-xs text-slate-500 mt-1">{t('total_inspections')} {qc.length}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">{t('order_fulfillment_trend')}</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="quantity" name={t('total_qty')} fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivered" name={t('delivered')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">{t('recent_activities')}</h4>
          <div className="space-y-4">
            {qc.slice(0, 5).map((q) => (
              <div key={q.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${q.status === 'Passed' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">QC {q.status}: {q.productName}</p>
                  <p className="text-xs text-slate-500">{t('lot')}: {q.lotNumber} • {t('inspector')}: {q.qcInspector}</p>
                </div>
                <span className="text-xs text-slate-400">{q.qcDate || 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
