
export interface PackingOrder {
  id: string;
  name: string;
  customerId: string;
  color: string;
  quantity: number;
  dueDate: string;
  status?: string;
  stock?: number;
  salePrice: number;
  lotNumber?: string;
  quantityDelivered?: number;
}

export interface PackingLog {
  id: string;
  date: string;
  quantity: number;
  name: string;
  packerName: string;
}

export interface MoldingLog {
  id: string;
  jobId: string;
  date: string;
  machine: string;
  productName: string;
  quantityProduced: number;
  operatorName: string;
  status: string;
  lotNumber: string;
  orderId?: string;
  quantityRejected?: number;
  shift?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  costPerUnit?: number;
  category: 'FG' | 'RM'; // Finished Good or Raw Material
  lotNumber?: string;
  minStockLevel?: number;
  location?: string;
}

export interface StockTransaction {
  id: string;
  itemId: string;
  type: 'IN' | 'OUT' | 'ADJUST';
  quantity: number;
  date: string;
  documentRef?: string; // PO number or Job ID
  user: string;
  note?: string;
}

export interface Machine {
  id: string;
  name: string;
  status: string;
  workingHoursPerDay: number;
  location: string;
  currentJobId?: string; // Linked to ProductionQueue.id
  currentOperator?: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: string;
  roleId: string;
  dailyWage: number;
}

export interface QCEntry {
  id: string;
  productName: string;
  quantity: number;
  status: 'Pending' | 'Passed' | 'Rejected';
  qcInspector: string;
  lotNumber: string;
  date?: string;
  qcDate?: string;
  orderId?: string;
  defectType?: string;
  defectQuantity?: number;
  notes?: string;
  images?: string[];
}

export interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
}

export interface FactoryProduct {
  id: string;
  name: string;
  color: string;
  productType: string;
  salePrice: number;
  totalCost: number;
  materialCost: number;
  profit: number;
  cycleTimeSeconds: number;
  laborAllocation: number;
  aiPriceRecommendation?: {
    recommendedPrice: number;
  };
}

export interface ProductionQueue {
  id: string;
  orderId: string; // Linked to PackingOrder.id or just a reference
  productName: string;
  lotNumber: string;
  quantityGoal: number;
  quantityProduced: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Paused';
  machineId?: string; // Assigned Machine
  operatorName?: string;
  priority: number; // 1 (High) - 10 (Low)
  addedDate: string;
}

export interface AppData {
  packing_orders: PackingOrder[];
  packing_logs: PackingLog[];
  molding_logs: MoldingLog[];
  packing_inventory: InventoryItem[];
  factory_machines: Machine[];
  packing_employees: Employee[];
  packing_qc_entries: QCEntry[];
  packing_raw_materials: RawMaterial[];
  factory_products: FactoryProduct[];
  production_queue: ProductionQueue[];
  stock_transactions: StockTransaction[];
}
