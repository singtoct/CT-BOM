
import React, { useState, useEffect } from 'react';
import { getInventory, getStockTransactions } from '../services/dataService';
import { 
    ArrowUpRight, ArrowDownRight, PackageOpen, Layers, 
    Search, History, AlertCircle, Filter, X, Pencil, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { InventoryItem, StockTransaction } from '../types';

export const Inventory: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'FG' | 'RM'>('FG');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state for inventory and transactions to allow "mock" updates
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [localTransactions, setLocalTransactions] = useState<StockTransaction[]>([]);
  
  // Modal states
  const [selectedItemForHistory, setSelectedItemForHistory] = useState<InventoryItem | null>(null);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedItemForAdjust, setSelectedItemForAdjust] = useState<InventoryItem | null>(null);
  const [adjustData, setAdjustData] = useState({ type: 'IN', quantity: 0, note: '' });

  // Initialize data
  useEffect(() => {
    const initialItems = getInventory();
    setInventoryItems(initialItems);
    // In a real app, we would fetch all transactions. Here we just load mock ones.
    // For simplicity in this demo, we are just appending new transactions to a local list
    // combined with the initial mock transactions for the selected item.
  }, []);
  
  const filteredItems = inventoryItems.filter(item => 
    item.category === activeTab && 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.lotNumber?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getHistory = (itemId: string) => {
      const mockTx = getStockTransactions(itemId);
      const newTx = localTransactions.filter(tx => tx.itemId === itemId);
      return [...newTx, ...mockTx].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleOpenAdjust = (item: InventoryItem) => {
    setSelectedItemForAdjust(item);
    setAdjustData({ type: 'IN', quantity: 0, note: '' });
    setAdjustModalOpen(true);
  };

  const handleAdjustSubmit = () => {
    if (!selectedItemForAdjust || adjustData.quantity <= 0) return;

    const adjustmentQty = adjustData.type === 'IN' ? adjustData.quantity : -adjustData.quantity;
    const newQuantity = selectedItemForAdjust.quantity + adjustmentQty;

    // Update Inventory Item State
    setInventoryItems(prev => prev.map(item => 
      item.id === selectedItemForAdjust.id 
        ? { ...item, quantity: newQuantity } 
        : item
    ));

    // Create New Transaction
    const newTx: StockTransaction = {
      id: `tx_new_${Date.now()}`,
      itemId: selectedItemForAdjust.id,
      type: adjustData.type as 'IN' | 'OUT',
      quantity: adjustData.quantity,
      date: new Date().toLocaleString(),
      user: t('manager'), // Mock user
      note: adjustData.note || t('trans_ADJUST'),
      documentRef: 'MANUAL-ADJ'
    };

    setLocalTransactions(prev => [newTx, ...prev]);
    setAdjustModalOpen(false);
    // Optional: Show success notification logic here
  };

  const HistoryModal = ({ item, onClose }: { item: InventoryItem, onClose: () => void }) => {
      const history = getHistory(item.id);

      return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                  <h3 className="font-bold text-lg text-slate-800">{t('stock_history')}</h3>
                  <p className="text-sm text-slate-500">{item.name} {item.lotNumber ? `(Lot: ${item.lotNumber})` : ''}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-0 overflow-y-auto flex-1">
                {history.length > 0 ? (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t('date_time')}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t('transaction_type')}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('amount')}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t('ref_doc')}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t('by_user')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {history.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 text-slate-600">{tx.date}</td>
                                    <td className="px-6 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold
                                            ${tx.type === 'IN' ? 'bg-emerald-100 text-emerald-700' : 
                                              tx.type === 'OUT' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {t(`trans_${tx.type}`)}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-3 text-right font-mono font-medium ${tx.type === 'IN' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {tx.type === 'IN' ? '+' : '-'}{tx.quantity.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-3 text-slate-600">{tx.documentRef || '-'}</td>
                                    <td className="px-6 py-3 text-slate-600">{tx.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-10 text-center text-slate-500">
                        <History className="w-10 h-10 mx-auto mb-2 opacity-20" />
                        <p>{t('no_history_found')}</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      );
  };

  const AdjustModal = () => {
      if (!selectedItemForAdjust) return null;
      
      const currentQty = selectedItemForAdjust.quantity;
      const newQty = adjustData.type === 'IN' 
        ? currentQty + adjustData.quantity 
        : currentQty - adjustData.quantity;

      return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{t('adjust_stock')}</h3>
              <button onClick={() => setAdjustModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-700">{selectedItemForAdjust.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{t('current_stock')}: <span className="font-mono font-bold">{currentQty.toLocaleString()}</span> {selectedItemForAdjust.unit}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('adjustment_type')}</label>
                        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                            <button 
                                onClick={() => setAdjustData({...adjustData, type: 'IN'})}
                                className={`flex-1 py-2 text-sm font-medium transition-colors ${adjustData.type === 'IN' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                            >
                                {t('trans_IN')}
                            </button>
                            <button 
                                onClick={() => setAdjustData({...adjustData, type: 'OUT'})}
                                className={`flex-1 py-2 text-sm font-medium transition-colors ${adjustData.type === 'OUT' ? 'bg-red-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                            >
                                {t('trans_OUT')}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('amount')}</label>
                        <input 
                            type="number" 
                            min="0"
                            value={adjustData.quantity || ''}
                            onChange={(e) => setAdjustData({...adjustData, quantity: parseFloat(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('reason')}</label>
                    <input 
                        type="text" 
                        value={adjustData.note}
                        onChange={(e) => setAdjustData({...adjustData, note: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        placeholder="e.g. Damaged goods, Audit adjustment"
                    />
                </div>

                <div className="pt-2 flex justify-between items-center text-sm">
                    <span className="text-slate-500">{t('new_quantity')}:</span>
                    <span className={`font-mono font-bold ${newQty < 0 ? 'text-red-600' : 'text-slate-800'}`}>
                        {newQty.toLocaleString()} {selectedItemForAdjust.unit}
                    </span>
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => setAdjustModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button 
                onClick={handleAdjustSubmit}
                disabled={adjustData.quantity <= 0 || newQty < 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('confirm_adjustment')}
              </button>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className="space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900">{t('inventory')}</h2>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder={t('search_inventory')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
            </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200">
            <button
                onClick={() => setActiveTab('FG')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'FG' 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
                <PackageOpen className="w-4 h-4" />
                {t('finished_goods')}
            </button>
            <button
                onClick={() => setActiveTab('RM')}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'RM' 
                        ? 'border-emerald-600 text-emerald-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
                <Layers className="w-4 h-4" />
                {t('raw_materials')}
            </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">{activeTab === 'FG' ? t('product_name') : t('material_name')}</th>
                    {activeTab === 'FG' && <th className="px-6 py-3 font-semibold text-slate-700">{t('lot_no')}</th>}
                    <th className="px-6 py-3 font-semibold text-slate-700">{t('location')}</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('stock_level')}</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('min_stock')}</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('unit_cost')}</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t('total_value')}</th>
                    <th className="px-6 py-3 font-semibold text-slate-700 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                    const isLowStock = item.minStockLevel && item.quantity <= item.minStockLevel;
                    return (
                        <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${isLowStock ? 'bg-red-50/30' : ''}`}>
                            <td className="px-6 py-4 text-slate-900 font-medium">
                                {item.name}
                                {isLowStock && (
                                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1 font-bold">
                                        <AlertCircle className="w-3 h-3" /> {t('status_low')}
                                    </div>
                                )}
                            </td>
                            {activeTab === 'FG' && (
                                <td className="px-6 py-4 font-mono text-slate-600 text-xs">
                                    {item.lotNumber || '-'}
                                </td>
                            )}
                            <td className="px-6 py-4 text-slate-600 text-xs">
                                <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">{item.location || '-'}</span>
                            </td>
                            <td className="px-6 py-4 text-right font-mono">
                                <span className={isLowStock ? "text-red-600 font-bold" : "text-slate-700 font-medium"}>
                                {item.quantity.toLocaleString()}
                                </span>
                                <span className="text-xs text-slate-400 ml-1">{item.unit || 'pcs'}</span>
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-slate-500 text-xs">
                                {item.minStockLevel ? item.minStockLevel.toLocaleString() : '-'}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-slate-600">
                                {item.costPerUnit ? `฿${item.costPerUnit.toFixed(2)}` : '-'}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-slate-800 font-medium">
                                {item.costPerUnit ? `฿${(item.quantity * item.costPerUnit).toLocaleString()}` : '-'}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button 
                                        onClick={() => handleOpenAdjust(item)}
                                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                        title={t('adjust_stock')}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setSelectedItemForHistory(item)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title={t('view_history')}
                                    >
                                        <History className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                {filteredItems.length === 0 && (
                    <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                            No items found in {activeTab === 'FG' ? 'Finished Goods' : 'Raw Materials'}.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </div>

        {selectedItemForHistory && (
            <HistoryModal 
                item={selectedItemForHistory} 
                onClose={() => setSelectedItemForHistory(null)} 
            />
        )}
        
        {adjustModalOpen && <AdjustModal />}
    </div>
  );
};
