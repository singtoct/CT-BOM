
import React from 'react';
import { getInventory, getRawMaterials } from '../services/dataService';
import { ArrowUpRight, ArrowDownRight, PackageOpen, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Inventory: React.FC = () => {
  const finishedGoods = getInventory();
  const rawMaterials = getRawMaterials();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Finished Goods Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
             <PackageOpen className="w-5 h-5 text-blue-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{t('finished_goods')}</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('product_name')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('stock_level')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('unit_cost')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('total_value')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {finishedGoods.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-900 font-medium">{item.name}</td>
                  <td className="px-6 py-3 text-right font-mono">
                    <span className={item.quantity < 1000 ? "text-red-600 font-bold" : "text-slate-600"}>
                      {item.quantity.toLocaleString()}
                    </span>
                     <span className="text-xs text-slate-400 ml-1">{item.unit || 'pcs'}</span>
                  </td>
                   <td className="px-6 py-3 text-right font-mono text-slate-600">
                    {item.costPerUnit ? `฿${item.costPerUnit.toFixed(2)}` : '-'}
                  </td>
                   <td className="px-6 py-3 text-right font-mono text-slate-800 font-medium">
                    {item.costPerUnit ? `฿${(item.quantity * item.costPerUnit).toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Materials Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
             <Layers className="w-5 h-5 text-emerald-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{t('raw_materials')}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('material_name')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('quantity')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('cost_per_unit')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rawMaterials.map((mat) => (
                <tr key={mat.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-900 font-medium">{mat.name}</td>
                  <td className="px-6 py-3 text-right font-mono">
                    {mat.quantity.toLocaleString()} <span className="text-xs text-slate-400">{mat.unit}</span>
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-slate-600">฿{mat.costPerUnit.toFixed(2)}</td>
                  <td className="px-6 py-3 text-right">
                    {mat.quantity > 500 ? (
                      <span className="text-emerald-600 flex items-center justify-end gap-1 text-xs font-bold">
                        <ArrowUpRight className="w-3 h-3" /> {t('status_good')}
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center justify-end gap-1 text-xs font-bold">
                        <ArrowDownRight className="w-3 h-3" /> {t('status_low')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
