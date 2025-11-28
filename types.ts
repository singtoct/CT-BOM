
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
}

export interface Machine {
  id: string;
  name: string;
  status: string;
  workingHoursPerDay: number;
  location: string;
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
  status: string;
  qcInspector: string;
  lotNumber: string;
  date?: string;
  qcDate?: string;
  orderId?: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
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
}
