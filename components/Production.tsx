
import React, { useState } from 'react';
import { getMoldingLogs, getMachines, getProductionQueue, getEmployees } from '../services/dataService';
import { 
  Cog, Timer, PlayCircle, StopCircle, 
  AlertTriangle, User, MoreHorizontal, 
  ClipboardList, Plus, Save, X, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Machine, ProductionQueue, Employee } from '../types';

export const Production: React.FC = () => {
  const { t } = useLanguage();
  const machines = getMachines();
  const productionQueue = getProductionQueue();
  const logs = getMoldingLogs();
  const employees = getEmployees();

  // State for Modals
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [logOutputModalOpen, setLogOutputModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  
  // Form States
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [logData, setLogData] = useState({ good: 0, waste: 0 });

  // Helper to get translated machine status
  const getMachineStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'ทำงาน': 'machine_status_working',
      'ว่าง': 'machine_status_idle',
      'ทดสอบงาน': 'machine_status_test',
      'ซ่อมบำรุง': 'machine_status_repair',
      'เม็ดหมด': 'machine_status_no_material',
      'รอเปลี่ยนโมล': 'machine_status_change_mold'
    };
    const key = statusMap[status];
    return key ? t(key) : status;
  };

  // Helper to find current job for a machine
  const getCurrentJob = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    if (machine?.currentJobId) {
      return productionQueue.find(j => j.id === machine.currentJobId);
    }
    return null;
  };

  // Handlers
  const handleOpenAssign = (machine: Machine) => {
    setSelectedMachine(machine);
    setAssignModalOpen(true);
    setSelectedJobId('');
    setSelectedOperator('');
  };

  const handleOpenLog = (machine: Machine) => {
    setSelectedMachine(machine);
    setLogOutputModalOpen(true);
    setLogData({ good: 0, waste: 0 });
  };

  const handleAssignSubmit = () => {
    // In a real app, this would call an API to update the machine and job status
    console.log(`Assigned Job ${selectedJobId} to Machine ${selectedMachine?.id} with Operator ${selectedOperator}`);
    setAssignModalOpen(false);
    // Mock update for UI feedback (would verify with backend in real app)
    alert(`Job assigned successfully!`);
  };

  const handleLogSubmit = () => {
    console.log(`Logged output for Machine ${selectedMachine?.id}: Good ${logData.good}, Waste ${logData.waste}`);
    setLogOutputModalOpen(false);
    alert(`Production logged successfully!`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">{t('production_floor')}</h2>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                <ClipboardList className="w-4 h-4" />
                {t('production_queue')} ({productionQueue.filter(j => j.status === 'Pending').length})
            </button>
        </div>
      </div>
      
      {/* Machine Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {machines.map((machine) => {
          const currentJob = getCurrentJob(machine.id);
          const progress = currentJob ? Math.round((currentJob.quantityProduced / currentJob.quantityGoal) * 100) : 0;
          const isRunning = machine.status === 'ทำงาน';

          return (
            <div key={machine.id} className={`rounded-xl border shadow-sm overflow-hidden flex flex-col transition-all duration-200 ${
              isRunning 
                ? 'bg-white border-slate-200 hover:shadow-md' 
                : 'bg-slate-50 border-slate-200 opacity-90'
            }`}>
              {/* Card Header */}
              <div className={`px-5 py-3 border-b flex justify-between items-center ${
                isRunning ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-100/50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isRunning ? 'bg-emerald-500 animate-pulse' : 
                    machine.status === 'ซ่อมบำรุง' ? 'bg-red-500' :
                    machine.status === 'ทดสอบงาน' ? 'bg-blue-500' :
                    'bg-slate-400'
                  }`} />
                  <h3 className="font-bold text-slate-800">{machine.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isRunning ? 'bg-emerald-100 text-emerald-700' : 
                  machine.status === 'ทดสอบงาน' ? 'bg-blue-100 text-blue-700' :
                  machine.status === 'ซ่อมบำรุง' ? 'bg-red-100 text-red-700' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {getMachineStatus(machine.status)}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                {currentJob ? (
                  <>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase mb-1">{t('current_job')}</p>
                      <p className="text-sm font-bold text-slate-800 line-clamp-2" title={currentJob.productName}>
                        {currentJob.productName}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{t('lot')}: <span className="font-mono text-slate-700">{currentJob.lotNumber}</span></p>
                    </div>

                    {/* Progress Bar */}
                    <div>
                       <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500">{t('progress')}</span>
                          <span className="font-medium text-slate-700">{currentJob.quantityProduced.toLocaleString()} / {currentJob.quantityGoal.toLocaleString()} ({progress}%)</span>
                       </div>
                       <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isRunning ? 'bg-blue-500' : 'bg-slate-400'}`} 
                            style={{ width: `${progress}%` }}
                          ></div>
                       </div>
                    </div>

                    {/* Operator Info */}
                    <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                       <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                       </div>
                       <span className="text-xs text-slate-600 font-medium">{machine.currentOperator || t('operator')}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                       <StopCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">{t('no_active_job')}</p>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2">
                {isRunning ? (
                   <>
                    <button 
                      onClick={() => handleOpenLog(machine)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors text-xs font-medium shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t('log_output')}
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors text-xs font-medium shadow-sm">
                       <MoreHorizontal className="w-3.5 h-3.5" />
                       {t('status')}
                    </button>
                   </>
                ) : (
                  <button 
                    onClick={() => handleOpenAssign(machine)}
                    className="col-span-2 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {t('assign_job')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Logs Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800">{t('recent_molding_logs')}</h3>
          <button className="text-sm text-blue-600 hover:underline font-medium">View All History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-100">
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
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-600 whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500">{log.jobId}</td>
                  <td className="px-6 py-3 text-slate-900 font-medium">{log.machine}</td>
                  <td className="px-6 py-3 text-slate-800 max-w-xs truncate">{log.productName}</td>
                  <td className="px-6 py-3 text-right font-mono text-emerald-600 font-medium">{log.quantityProduced}</td>
                  <td className="px-6 py-3 text-right font-mono text-red-600">{log.quantityRejected}</td>
                  <td className="px-6 py-3 text-slate-600">{log.operatorName}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Job Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{t('assign_job')} {t('machine')} {selectedMachine?.name.split(' ')[1]}</h3>
              <button onClick={() => setAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{t('select_job')}</label>
                <select 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                >
                  <option value="">-- {t('select_job')} --</option>
                  {productionQueue.filter(j => j.status === 'Pending').map(job => (
                    <option key={job.id} value={job.id}>
                       {job.productName} ({job.quantityGoal} pcs) - {job.lotNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{t('operator')}</label>
                <select 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(e.target.value)}
                >
                  <option value="">-- {t('operator')} --</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setAssignModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button 
                onClick={handleAssignSubmit}
                disabled={!selectedJobId || !selectedOperator}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlayCircle className="w-4 h-4" />
                {t('start_production')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Output Modal */}
      {logOutputModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{t('log_production')}</h3>
              <button onClick={() => setLogOutputModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
               <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 uppercase font-bold mb-1">{t('machine')}</p>
                  <p className="font-medium text-slate-800">{selectedMachine?.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{getCurrentJob(selectedMachine?.id || '')?.productName}</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">{t('good_units')}</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      value={logData.good}
                      onChange={(e) => setLogData({...logData, good: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">{t('waste_units')}</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      value={logData.waste}
                      onChange={(e) => setLogData({...logData, waste: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
               </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setLogOutputModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button 
                onClick={handleLogSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm shadow-emerald-200"
              >
                <Save className="w-4 h-4" />
                {t('confirm_log')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
