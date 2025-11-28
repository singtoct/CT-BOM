
import React from 'react';
import { getMoldingLogs, getMachines } from '../services/dataService';
import { Cog, Timer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Production: React.FC = () => {
  const logs = getMoldingLogs();
  const machines = getMachines();
  const { t } = useLanguage();

  // Helper to get translated machine status
  const getMachineStatus = (status: string) => {
    // Database returns Thai strings (e.g., "ทำงาน", "ว่าง", "ทดสอบงาน")
    // We map these to keys in our translation file
    const statusMap: Record<string, string> = {
      'ทำงาน': 'machine_status_working',
      'ว่าง': 'machine_status_idle',
      'ทดสอบงาน': 'machine_status_test',
      'ซ่อมบำรุง': 'machine_status_repair',
    };

    const key = statusMap[status];
    return key ? t(key) : status;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">{t('production_floor')}</h2>
      
      {/* Machine Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {machines.map((machine) => (
          <div key={machine.id} className={`p-5 rounded-xl border ${
            machine.status === 'ทำงาน' 
              ? 'bg-white border-slate-200 border-l-4 border-l-emerald-500' 
              : 'bg-slate-50 border-slate-200 border-l-4 border-l-slate-300'
          } shadow-sm`}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800">{machine.name}</h3>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                machine.status === 'ทำงาน' ? 'bg-emerald-100 text-emerald-700' : 
                machine.status === 'ทดสอบงาน' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-200 text-slate-600'
              }`}>
                {getMachineStatus(machine.status)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Cog className="w-3 h-3" />
              {t('location')}: {machine.location}
            </div>
             <div className="flex items-center gap-2 text-xs text-slate-500">
              <Timer className="w-3 h-3" />
              Ops: {machine.workingHoursPerDay} {t('ops_hrs_day')}
            </div>
          </div>
        ))}
      </div>

      {/* Molding Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mt-8">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">{t('recent_molding_logs')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('date')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('job_id')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('machine')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('product')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('qty_produced')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('rejected')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('operator')}</th>
                <th className="px-6 py-3 font-semibold text-slate-700">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-600 whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500">{log.jobId}</td>
                  <td className="px-6 py-3 text-slate-900 font-medium">{log.machine}</td>
                  <td className="px-6 py-3 text-slate-800 max-w-xs truncate">{log.productName}</td>
                  <td className="px-6 py-3 text-right font-mono text-emerald-600 font-medium">{log.quantityProduced}</td>
                  <td className="px-6 py-3 text-right font-mono text-red-600">{log.quantityRejected}</td>
                  <td className="px-6 py-3 text-slate-600">{log.operatorName}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-700">
                      {log.status}
                    </span>
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
