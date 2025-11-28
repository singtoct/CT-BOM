
import React, { useState } from 'react';
import { getOrders } from '../services/dataService';
import { Search, Filter, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Orders: React.FC = () => {
  const orders = getOrders();
  const [filter, setFilter] = useState('');
  const { t } = useLanguage();

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(filter.toLowerCase()) || 
    order.lotNumber?.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusLabel = (status?: string) => {
    if (!status) return t('status_pending');
    switch (status) {
      case 'Completed': return t('status_completed');
      case 'Cancelled': return t('status_cancelled');
      case 'Open': return t('status_open');
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">{t('orders')}</h2>
        <div className="flex gap-2">
           <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={t('search_orders')}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">{t('lot_no')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700">{t('product_name')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700">{t('color')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('quantity')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('delivered')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700">{t('due_date')}</th>
                <th className="px-6 py-4 font-semibold text-slate-700">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{order.lotNumber || '-'}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{order.name}</td>
                  <td className="px-6 py-4 text-slate-600">{order.color}</td>
                  <td className="px-6 py-4 text-right font-mono">{order.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-slate-600">{order.quantityDelivered?.toLocaleString() || 0}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {order.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
          {t('showing_orders', { count: filteredOrders.length })}
        </div>
      </div>
    </div>
  );
};
