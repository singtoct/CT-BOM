
import React, { useState, useEffect } from 'react';
import { getQCEntries, getEmployees } from '../services/dataService';
import { QCEntry, Employee } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ClipboardCheck, CheckCircle, XCircle, Clock, 
  Search, Filter, X, AlertTriangle, FileText, Check
} from 'lucide-react';

export const QC: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<QCEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Modal State
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<QCEntry | null>(null);
  
  // Inspection Form State
  const [inspectionData, setInspectionData] = useState({
    status: 'Passed' as 'Passed' | 'Rejected',
    inspector: '',
    defectType: '',
    defectQuantity: 0,
    notes: ''
  });

  useEffect(() => {
    setEntries(getQCEntries());
    setEmployees(getEmployees());
  }, []);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pending') {
      return matchesSearch && entry.status === 'Pending';
    } else {
      return matchesSearch && entry.status !== 'Pending';
    }
  });

  const pendingCount = entries.filter(e => e.status === 'Pending').length;
  const passedToday = entries.filter(e => e.status === 'Passed').length; // Mock logic for 'today'
  const rejectedToday = entries.filter(e => e.status === 'Rejected').length;

  const handleOpenInspect = (entry: QCEntry) => {
    setSelectedEntry(entry);
    setInspectionData({
      status: 'Passed',
      inspector: '',
      defectType: '',
      defectQuantity: 0,
      notes: ''
    });
    setInspectModalOpen(true);
  };

  const handleConfirmInspection = () => {
    if (!selectedEntry || !inspectionData.inspector) return;

    // Update local state (Mock API call)
    setEntries(prev => prev.map(e => 
      e.id === selectedEntry.id ? {
        ...e,
        status: inspectionData.status,
        qcInspector: inspectionData.inspector,
        qcDate: new Date().toISOString().split('T')[0],
        defectType: inspectionData.status === 'Rejected' ? inspectionData.defectType : undefined,
        defectQuantity: inspectionData.status === 'Rejected' ? inspectionData.defectQuantity : undefined,
        notes: inspectionData.notes
      } : e
    ));

    setInspectModalOpen(false);
    // Alert or Toast could go here
  };

  const InspectModal = () => {
    if (!selectedEntry) return null;

    return (
      <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div>
               <h3 className="font-bold text-lg text-slate-800">{t('perform_inspection')}</h3>
               <p className="text-xs text-slate-500">{selectedEntry.productName} (Lot: {selectedEntry.lotNumber})</p>
            </div>
            <button onClick={() => setInspectModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-5">
            {/* Status Selection */}
            <div className="flex gap-4">
               <button 
                 onClick={() => setInspectionData({...inspectionData, status: 'Passed'})}
                 className={`flex-1 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                   inspectionData.status === 'Passed' 
                     ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' 
                     : 'border-slate-200 hover:border-slate-300 text-slate-600'
                 }`}
               >
                 <CheckCircle className={`w-5 h-5 ${inspectionData.status === 'Passed' ? 'fill-emerald-500 text-white' : ''}`} />
                 {t('qc_pass')}
               </button>
               <button 
                 onClick={() => setInspectionData({...inspectionData, status: 'Rejected'})}
                 className={`flex-1 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                   inspectionData.status === 'Rejected' 
                     ? 'border-red-500 bg-red-50 text-red-700 font-bold' 
                     : 'border-slate-200 hover:border-slate-300 text-slate-600'
                 }`}
               >
                 <XCircle className={`w-5 h-5 ${inspectionData.status === 'Rejected' ? 'fill-red-500 text-white' : ''}`} />
                 {t('qc_reject')}
               </button>
            </div>

            {/* Inspector Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('inspector_name')}</label>
              <select 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                value={inspectionData.inspector}
                onChange={(e) => setInspectionData({...inspectionData, inspector: e.target.value})}
              >
                <option value="">-- {t('inspector_name')} --</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>

            {/* Defect Details (Only if Rejected) */}
            {inspectionData.status === 'Rejected' && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 space-y-3 animate-in slide-in-from-top-2">
                    <h4 className="text-sm font-bold text-red-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {t('defect_details')}
                    </h4>
                    
                    <div>
                        <label className="block text-xs font-bold text-red-700 mb-1">{t('defect_type')}</label>
                        <select 
                            className="w-full px-3 py-2 border border-red-200 rounded text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            value={inspectionData.defectType}
                            onChange={(e) => setInspectionData({...inspectionData, defectType: e.target.value})}
                        >
                            <option value="">-- Select Defect --</option>
                            <option value="defect_scratches">{t('defect_scratches')}</option>
                            <option value="defect_dimension">{t('defect_dimension')}</option>
                            <option value="defect_color">{t('defect_color')}</option>
                            <option value="defect_flash">{t('defect_flash')}</option>
                            <option value="defect_shorts">{t('defect_shorts')}</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-red-700 mb-1">{t('defect_quantity')}</label>
                        <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-red-200 rounded text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            value={inspectionData.defectQuantity || ''}
                            onChange={(e) => setInspectionData({...inspectionData, defectQuantity: parseInt(e.target.value) || 0})}
                        />
                    </div>
                </div>
            )}

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('qc_notes')}</label>
                <textarea 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20 resize-none"
                    placeholder="..."
                    value={inspectionData.notes}
                    onChange={(e) => setInspectionData({...inspectionData, notes: e.target.value})}
                ></textarea>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
            <button 
              onClick={() => setInspectModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm font-medium"
            >
              {t('cancel')}
            </button>
            <button 
              onClick={handleConfirmInspection}
              disabled={!inspectionData.inspector || (inspectionData.status === 'Rejected' && !inspectionData.defectType)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              {t('confirm_result')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <Clock className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">{t('pending_inspection')}</p>
                    <h3 className="text-3xl font-bold text-slate-800">{pendingCount}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">{t('qc_passed_today')}</p>
                    <h3 className="text-3xl font-bold text-slate-800">{passedToday}</h3>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-full">
                    <XCircle className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">{t('qc_status_rejected')} ({t('date')})</p>
                    <h3 className="text-3xl font-bold text-slate-800">{rejectedToday}</h3>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs & Search */}
            <div className="border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('pending')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'pending' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {t('pending_inspection')}
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {t('inspection_history')}
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={t('search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-slate-700">{t('date')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">{t('lot_no')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">{t('product_name')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('quantity')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">{t('inspector')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">{t('status')}</th>
                            <th className="px-6 py-3 font-semibold text-slate-700 text-center">{t('settings')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredEntries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{entry.qcDate || entry.date || '-'}</td>
                                <td className="px-6 py-4 font-mono text-slate-600">{entry.lotNumber}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">{entry.productName}</td>
                                <td className="px-6 py-4 text-right font-mono">{entry.quantity.toLocaleString()}</td>
                                <td className="px-6 py-4 text-slate-600">{entry.qcInspector || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${entry.status === 'Passed' ? 'bg-emerald-100 text-emerald-800' : 
                                          entry.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                          'bg-amber-100 text-amber-800'}`}>
                                        {t(`qc_status_${entry.status.toLowerCase()}`)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {entry.status === 'Pending' ? (
                                        <button 
                                            onClick={() => handleOpenInspect(entry)}
                                            className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 transition-colors"
                                        >
                                            {t('perform_inspection')}
                                        </button>
                                    ) : (
                                        <button className="text-slate-400 hover:text-slate-600 p-1">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredEntries.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                    No entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {inspectModalOpen && <InspectModal />}
    </div>
  );
};
