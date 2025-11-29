
import React, { useState, useEffect } from 'react';
import { getPurchaseOrders, getSuppliers, getRawMaterials } from '../services/dataService';
import { PurchaseOrder, Supplier, InventoryItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ShoppingCart, Plus, Truck, Package, Search } from 'lucide-react';

export const Procurement: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'suppliers' | 'po'>('po');
  const [pos, setPOs] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [materials, setMaterials] = useState<InventoryItem[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New PO Form
  const [newPO, setNewPO] = useState({
    supplierId: '',
    itemId: '',
    quantity: 0,
    unitPrice: 0
  });

  useEffect(() => {
    setPOs(getPurchaseOrders());
    setSuppliers(getSuppliers());
    setMaterials(getRawMaterials());
  }, []);

  const getSupplierName = (id: string) => suppliers.find(s => s.id === id)?.name || id;
  const getMaterialName = (id: string) => materials.find(m => m.id === id)?.name || id;

  const handleCreatePO = () => {
    if (!newPO.supplierId || !newPO.itemId) return;

    const po: PurchaseOrder = {
      id: `po_${Date.now()}`,
      poNumber: `PO-${Date.now().toString().slice(-6)}`,
      supplierId: newPO.supplierId,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: '',
      status: 'Ordered',
      items: [{
        rawMaterialId: newPO.itemId,
        quantity: newPO.quantity,
        unitPrice: newPO.unitPrice
      }]
    };

    setPOs([po, ...pos]);
    setIsCreateModalOpen(false);
  };

  const handleReceive = (id: string) => {
    setPOs(prev => prev.map(po => 
      po.id === id ? { ...po, status: 'Received' } as PurchaseOrder : po
    ));
    alert("Received goods! Stock updated (Mock).");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">{t('procurement_dashboard')}</h2>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('po')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'po' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          {t('tab_purchase_orders')}
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'suppliers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          {t('tab_suppliers')}
        </button>
      </div>

      {activeTab === 'po' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {t('create_po')}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">{t('po_number')}</th>
                  <th className="px-6 py-3">{t('supplier')}</th>
                  <th className="px-6 py-3">{t('order_date')}</th>
                  <th className="px-6 py-3">{t('items_count')}</th>
                  <th className="px-6 py-3">{t('status')}</th>
                  <th className="px-6 py-3 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pos.map((po) => (
                  <tr key={po.id}>
                    <td className="px-6 py-4 font-mono text-blue-600">{po.poNumber}</td>
                    <td className="px-6 py-4">{getSupplierName(po.supplierId)}</td>
                    <td className="px-6 py-4">{po.orderDate}</td>
                    <td className="px-6 py-4">{po.items.length} items</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        po.status === 'Received' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {t(`status_${po.status.toLowerCase()}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {po.status === 'Ordered' && (
                        <button 
                          onClick={() => handleReceive(po.id)}
                          className="text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded border border-emerald-200 text-xs font-bold transition-colors"
                        >
                          {t('receive_goods')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((sup) => (
            <div key={sup.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-1">{sup.name}</h3>
              <p className="text-sm text-slate-500 mb-4">ID: {sup.id}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{sup.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{sup.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create PO Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-lg font-bold mb-4">{t('create_po')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('supplier')}</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                  value={newPO.supplierId}
                  onChange={(e) => setNewPO({...newPO, supplierId: e.target.value})}
                >
                  <option value="">{t('select_supplier')}</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('raw_materials')}</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                  value={newPO.itemId}
                  onChange={(e) => setNewPO({...newPO, itemId: e.target.value})}
                >
                  <option value="">{t('select_material')}</option>
                  {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('quantity')}</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newPO.quantity}
                    onChange={(e) => setNewPO({...newPO, quantity: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('price_unit')}</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newPO.unitPrice}
                    onChange={(e) => setNewPO({...newPO, unitPrice: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">{t('cancel')}</button>
                <button onClick={handleCreatePO} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('create_po')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { User, Phone } from 'lucide-react';
