
import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/dataService';
import { FactoryProduct } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, Plus, FileUp, FileDown, Wrench, 
  Save, X, Edit2, Trash2, Tag, DollarSign,
  Clock, Percent, TrendingUp, AlertCircle
} from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<FactoryProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<FactoryProduct>>({
    name: '',
    color: '',
    productType: 'FinishedGood',
    salePrice: 0,
    cycleTimeSeconds: 0,
    laborAllocation: 100,
    materialCost: 0, // Added for calculation
    totalCost: 0,    // Calculated
    profit: 0        // Calculated
  });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Auto-calculate profit and total cost (Simplified logic for demo)
  useEffect(() => {
    const price = Number(formData.salePrice) || 0;
    const matCost = Number(formData.materialCost) || 0;
    const laborAlloc = Number(formData.laborAllocation) || 0;
    const cycleTime = Number(formData.cycleTimeSeconds) || 0;
    
    // Mock overhead/labor calculation based on cycle time and allocation
    // In real app, this would use factory overhead rates
    const laborAndOverhead = (cycleTime * 0.05) + (laborAlloc * 0.01); 
    const calculatedTotalCost = matCost + laborAndOverhead;
    
    setFormData(prev => ({
      ...prev,
      totalCost: parseFloat(calculatedTotalCost.toFixed(4)),
      profit: parseFloat((price - calculatedTotalCost).toFixed(2))
    }));
  }, [formData.salePrice, formData.cycleTimeSeconds, formData.laborAllocation, formData.materialCost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'color' || name === 'productType' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newProduct: FactoryProduct = {
      id: isEditing ? (formData.id || '') : Math.random().toString(36).substr(2, 9),
      name: formData.name || '',
      color: formData.color || '',
      productType: formData.productType || 'FinishedGood',
      salePrice: formData.salePrice || 0,
      cycleTimeSeconds: formData.cycleTimeSeconds || 0,
      laborAllocation: formData.laborAllocation || 0,
      materialCost: formData.materialCost || 0,
      totalCost: formData.totalCost || 0,
      profit: formData.profit || 0,
      aiPriceRecommendation: formData.aiPriceRecommendation
    };

    if (isEditing) {
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
      setIsEditing(false);
    } else {
      setProducts([newProduct, ...products]);
    }
    
    // Reset form
    setFormData({
      name: '', color: '', productType: 'FinishedGood', salePrice: 0, 
      cycleTimeSeconds: 0, laborAllocation: 100, materialCost: 0, totalCost: 0, profit: 0
    });
  };

  const handleEdit = (product: FactoryProduct) => {
    setFormData(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">{t('product_management')}</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileUp className="w-4 h-4" />
            {t('import_excel')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm">
            <FileDown className="w-4 h-4" />
            {t('export_excel')}
          </button>
        </div>
      </div>

      {/* Add/Edit Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          {isEditing ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-emerald-600" />}
          <h3 className="text-lg font-semibold text-slate-800">
            {isEditing ? t('edit_product') : t('add_product')}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('product_name')}</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={t('product_name')}
                  required
                />
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('color')}</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g., White, Black"
              />
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('product_type')}</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="FinishedGood">{t('type_finished_good')}</option>
                <option value="Component">{t('type_component')}</option>
              </select>
            </div>

            {/* Sale Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('sale_price')}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Cycle Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('cycle_time')}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  name="cycleTimeSeconds"
                  value={formData.cycleTimeSeconds}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Labor Allocation */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('labor_allocation')}</label>
              <div className="relative">
                <input
                  type="number"
                  name="laborAllocation"
                  value={formData.laborAllocation}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

             {/* Material Cost (Hidden in UI but needed for calculation logic mock) */}
             <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t('material_cost')}</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.0001"
                  name="materialCost"
                  value={formData.materialCost}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50"
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Read-only Calculations */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-bold mb-1">{t('total_cost')}</span>
                  <span className="text-xl font-mono text-slate-700">฿{formData.totalCost?.toFixed(4)}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase font-bold mb-1">{t('profit')} / {t('margin')}</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xl font-mono font-bold ${Number(formData.profit) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        ฿{formData.profit?.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-500">
                        ({formData.salePrice ? ((Number(formData.profit) / formData.salePrice) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
               </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                    setIsEditing(false); 
                    setFormData({name: '', color: '', productType: 'FinishedGood', salePrice: 0, cycleTimeSeconds: 0, laborAllocation: 100, materialCost: 0, totalCost: 0, profit: 0});
                }}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                {t('cancel')}
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors shadow-sm shadow-emerald-200"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isEditing ? t('save') : t('add_product')}
            </button>
          </div>
        </form>
      </div>

      {/* Correction Tool Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
          <Wrench className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-amber-900 mb-1">{t('correction_tool')}</h4>
          <p className="text-sm text-amber-800 mb-3">
            {t('correction_desc')}
          </p>
          <button className="px-4 py-1.5 bg-amber-600 text-white text-xs font-bold rounded hover:bg-amber-700 transition-colors">
            {t('run_correction')}
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={t('search_products')}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {selectedIds.length > 0 && (
             <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                <Trash2 className="w-4 h-4" />
                {t('delete_selected')} ({selectedIds.length})
             </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('product_name')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">{t('product_type')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('sale_price')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('total_cost')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('profit')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">{t('ai_recommended_price')}</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedIds.includes(product.id)}
                        onChange={(e) => {
                          if(e.target.checked) setSelectedIds([...selectedIds, product.id]);
                          else setSelectedIds(selectedIds.filter(id => id !== product.id));
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      {product.color && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 mt-1">
                          {product.color}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${product.productType === 'Component' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {product.productType === 'Component' ? t('type_component') : t('type_finished_good')}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700">฿{product.salePrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-blue-600 font-medium">฿{product.totalCost.toFixed(4)}</td>
                    <td className={`px-6 py-4 text-right font-mono font-bold ${product.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ฿{product.profit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-indigo-600 flex items-center justify-end gap-1">
                       {product.aiPriceRecommendation ? (
                           <>
                             <TrendingUp className="w-3 h-3" />
                             ฿{product.aiPriceRecommendation.recommendedPrice.toFixed(2)}
                           </>
                       ) : (
                           <span className="text-slate-400">-</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={() => handleEdit(product)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                    <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                            No products found matching "{searchTerm}"
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
