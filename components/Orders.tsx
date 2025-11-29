

import React, { useState, useEffect } from 'react';
import { getOrders, getCustomers, getDeliveryNotes, getInventory } from '../services/dataService';
import { Search, Filter, Calendar, Truck, Plus, FileText, User, Trash2, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PackingOrder, DeliveryNote, FactoryCustomer, InventoryItem, DeliveryItem } from '../types';

export const Orders: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'orders' | 'delivery'>('orders');
  
  // Data State
  const [orders, setOrders] = useState<PackingOrder[]>([]);
  const [deliveryNotes, setDeliveryNotes] = useState<DeliveryNote[]>([]);
  const [customers, setCustomers] = useState<FactoryCustomer[]>([]);
  const [availableStock, setAvailableStock] = useState<InventoryItem[]>([]);
  
  const [filter, setFilter] = useState('');
  
  // Create DN Modal State
  const [isDNModalOpen, setIsDNModalOpen] = useState(false);
  const [newDN, setNewDN] = useState({
    customerId: '',
    date: new Date().toISOString().split('T')[0],
    items: [] as DeliveryItem[]
  });
  const [selectedProductToAdd, setSelectedProductToAdd] = useState('');
  const [qtyToAdd, setQtyToAdd] = useState<number>(0);

  useEffect(() => {
    setOrders(getOrders());
    setDeliveryNotes(getDeliveryNotes());
    setCustomers(getCustomers());
    setAvailableStock(getInventory().filter(i => i.category === 'FG' && i.quantity > 0));
  }, []);

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(filter.toLowerCase()) || 
    order.lotNumber?.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredDN = deliveryNotes.filter(dn => 
    dn.dnNumber.toLowerCase().includes(filter.toLowerCase())
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

  const getCustomerName = (id: string) => {
    return customers.find(c => c.id === id)?.name || id;
  };

  // --- Delivery Note Logic ---

  const handleAddItemToDN = () => {
    if (!selectedProductToAdd || qtyToAdd <= 0) return;

    const inventoryItem = availableStock.find(i => i.id === selectedProductToAdd);
    if (!inventoryItem) return;

    if (qtyToAdd > inventoryItem.quantity) {
      alert(`Not enough stock. Available: ${inventoryItem.quantity}`);
      return;
    }

    const newItem: DeliveryItem = {
      inventoryItemId: inventoryItem.id,
      productName: inventoryItem.name,
      quantity: qtyToAdd,
      lotNumber: inventoryItem.lotNumber,
      unitPrice: inventoryItem.costPerUnit || 0 // Using cost as proxy for price in this demo if salesPrice not avail in inventory
    };

    setNewDN(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    // Reset add form
    setSelectedProductToAdd('');
    setQtyToAdd(0);
  };

  const handleRemoveItemFromDN = (index: number) => {
    setNewDN(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSaveDN = () => {
    if (!newDN.customerId || newDN.items.length === 0) return;

    const totalAmount = newDN.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const deliveryNote: DeliveryNote = {
      id: `dn_new_${Date.now()}`,
      dnNumber: `DN-${new Date().getFullYear()}${Date.now().toString().slice(-4)}`,
      customerId: newDN.customerId,
      date: newDN.date,
      status: 'Pending',
      items: newDN.items,
      totalAmount: totalAmount
    };

    // In a real app, this would trigger an API call and also reduce inventory stock
    setDeliveryNotes([deliveryNote, ...deliveryNotes]);
    
    // Mock stock deduction for UI feedback (Inventory component has its own state, so this won't reflect there in this demo structure without global state)
    alert(t('stock_deducted_msg'));
    
    setIsDNModalOpen(false);
    setNewDN({ customerId: '', date: new Date().toISOString().split('T')[0], items: [] });
  };

  const handleMarkDelivered = (id: string) => {
    setDeliveryNotes(prev => prev.map(dn => 
      dn.id === id ? { ...dn, status: 'Delivered' } : dn
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">{t('orders')}</h2>
        
        {activeTab === 'delivery' && (
          <button 
            onClick={() => setIsDNModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            {t('create_dn')}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'orders' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
        >
            <FileText className="w-4 h-4" />
            {t('tab_packing_orders')}
        </button>
        <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'delivery' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
        >
            <Truck className="w-4 h-4" />
            {t('tab_delivery_notes')}
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex gap-2 mb-4">
          <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('search_orders')}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Packing Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('lot_no')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('product_name')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('customer')}</th>
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
                    <td className="px-6 py-4 text-slate-600">{getCustomerName(order.customerId)}</td>
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
        </div>
      )}

      {/* Delivery Notes Table */}
      {activeTab === 'delivery' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('dn_number')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('delivery_date')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('customer')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t('items_count')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('total_amount')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('status')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDN.map((dn) => (
                  <tr key={dn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-blue-600">{dn.dnNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{dn.date}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{getCustomerName(dn.customerId)}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{dn.items.length}</td>
                    <td className="px-6 py-4 text-right font-mono font-medium">฿{dn.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${dn.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                         {dn.status === 'Delivered' ? t('status_delivered') : t('status_pending')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       {dn.status === 'Pending' && (
                          <button 
                            onClick={() => handleMarkDelivered(dn.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title={t('mark_delivered')}
                          >
                             <Check className="w-4 h-4" />
                          </button>
                       )}
                    </td>
                  </tr>
                ))}
                 {filteredDN.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No delivery notes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Delivery Note Modal */}
      {isDNModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{t('create_dn')}</h3>
              <button onClick={() => setIsDNModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Customer & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t('select_customer')}</label>
                   <select 
                     className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                     value={newDN.customerId}
                     onChange={(e) => setNewDN({...newDN, customerId: e.target.value})}
                   >
                     <option value="">-- {t('select_customer')} --</option>
                     {customers.map(c => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t('delivery_date')}</label>
                   <input 
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newDN.date}
                      onChange={(e) => setNewDN({...newDN, date: e.target.value})}
                   />
                 </div>
              </div>

              {/* Add Item Section */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                 <h4 className="text-sm font-bold text-slate-700">{t('add_item')}</h4>
                 <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <select 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
                        value={selectedProductToAdd}
                        onChange={(e) => setSelectedProductToAdd(e.target.value)}
                      >
                        <option value="">-- {t('select_product_stock')} --</option>
                        {availableStock.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name} (Stock: {item.quantity})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-32">
                      <input 
                        type="number" 
                        placeholder={t('quantity')}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none"
                        value={qtyToAdd || ''}
                        onChange={(e) => setQtyToAdd(parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </div>
                    <button 
                      onClick={handleAddItemToDN}
                      disabled={!selectedProductToAdd || qtyToAdd <= 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      {t('add_item')}
                    </button>
                 </div>
              </div>

              {/* Selected Items Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2">{t('product_name')}</th>
                      <th className="px-4 py-2 text-right">{t('quantity')}</th>
                      <th className="px-4 py-2 text-right">{t('price_unit')}</th>
                      <th className="px-4 py-2 text-right">{t('total_amount')}</th>
                      <th className="px-4 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {newDN.items.length > 0 ? newDN.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{item.productName} <span className="text-xs text-slate-500">({item.lotNumber})</span></td>
                        <td className="px-4 py-2 text-right font-mono">{item.quantity}</td>
                        <td className="px-4 py-2 text-right font-mono">฿{item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right font-mono font-medium">฿{(item.quantity * item.unitPrice).toFixed(2)}</td>
                        <td className="px-4 py-2 text-center">
                          <button onClick={() => handleRemoveItemFromDN(index)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">No items added</td>
                      </tr>
                    )}
                  </tbody>
                  {newDN.items.length > 0 && (
                    <tfoot className="bg-slate-50 border-t border-slate-200">
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-right font-bold text-slate-700">{t('total_amount')}</td>
                        <td className="px-4 py-2 text-right font-bold text-blue-700 font-mono">
                          ฿{newDN.items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
               <button 
                onClick={() => setIsDNModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors text-sm font-medium"
              >
                {t('cancel')}
              </button>
              <button 
                onClick={handleSaveDN}
                disabled={!newDN.customerId || newDN.items.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <Truck className="w-4 h-4" />
                {t('save_dn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
