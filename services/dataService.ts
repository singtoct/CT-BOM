import { AppData } from '../types';

// In a real app, this would fetch from an API.
// We are using a subset of the provided data to ensure the app runs efficiently in this demo context.
export const mockData: AppData = {
  packing_orders: [
    { id: "0ca4f17c", name: "ฝาหน้ากาก CT A-101", customerId: "4c9db", color: "สีขาว", quantity: 21120, dueDate: "2025-07-21", stock: 0, salePrice: 3.77 },
    { id: "3166d972", name: "ฝาหน้ากาก CT A-102", customerId: "4c9db", color: "สีขาว", quantity: 4800, dueDate: "2025-07-21", salePrice: 3.7 },
    { id: "BrLHa2Kvz", name: "CTU ฝา NEW 8 PC", quantity: 1000, quantityDelivered: 1000, dueDate: "2025-07-25", salePrice: 7.4, status: "Completed", color: "ดำใส", lotNumber: "PO-100768", customerId: "cust1" },
    { id: "hLQYewQ4x", name: "ฝาหน้ากาก CT A-1022", quantity: 16800, quantityDelivered: 10800, status: "Open", color: "สีขาว", dueDate: "2025-07-25", salePrice: 3.92, lotNumber: "PO-220768", customerId: "cust2" },
    { id: "048593f3", name: "บล็อคลอย CT 2x4B", color: "สีดำ", salePrice: 3.7, dueDate: "2025-07-28", quantity: 16900, customerId: "cust1" },
    { id: "057e06d6", name: "CTU ฝา NEW 2 PC", salePrice: 4.74, quantity: 10000, color: "ดำใส", dueDate: "2025-07-28", customerId: "cust1" },
    { id: "1cd69405", name: "บล็อคฝัง 2x4", color: "สีดำ", quantity: 20000, salePrice: 0, dueDate: "2025-07-31", customerId: "cust2" },
    { id: "2WYK17d7", name: "บล็อคลอย CT 2x4", color: "สีขาว", quantity: 77900, salePrice: 3.83, dueDate: "2025-08-17", status: "Completed", quantityDelivered: 77900, lotNumber: "PO-260568", customerId: "cust1" }
  ],
  packing_inventory: [
    { id: "inv1", name: "บล็อคลอย CT 2x4 (สีขาว)", quantity: 20100 },
    { id: "inv2", name: "ฝาหน้ากาก CT A-103 (สีขาว)", quantity: 44122 },
    { id: "inv3", name: "พุก (สีขาว)", quantity: 205810, unit: "ชิ้น", costPerUnit: 0.03 },
    { id: "inv4", name: "สกรู P# 7x1\"", quantity: 521000, unit: "Pcs.", costPerUnit: 0.08 },
    { id: "inv5", name: "กล่อง CT 101B", quantity: 6072, unit: "Pcs.", costPerUnit: 2.57 },
    { id: "inv6", name: "เม็ด PC ใส BP15", quantity: 574, unit: "kg", costPerUnit: 52 },
    { id: "inv7", name: "เม็ด PP สีส้ม", quantity: 724, unit: "kg", costPerUnit: 22 }
  ],
  packing_logs: [
    { id: "RQEQk0O1", date: "2025-08-06", quantity: 10, name: "ฝาหน้ากาก CT A-103 (สีขาว)", packerName: "อาโม" },
    { id: "a8472b66", date: "2025-07-18", quantity: 360, name: "บล็อคลอย CT 2x4 (สีขาว)", packerName: "อาโม" },
    { id: "49ede72c", date: "2025-07-18", quantity: 35640, name: "บล็อคลอย CT 2x4 (สีขาว)", packerName: "อาโม" }
  ],
  molding_logs: [
    { id: "tNfopSCt", jobId: "f26h0n", orderId: "I2Y0XJTd", quantityRejected: 0, operatorName: "---ว่าง---", productName: "CPS-113 ฝาครอบด้านหลัง (สีเขียว)", shift: "เช้า", lotNumber: "PO-080968", date: "2025-11-27", status: "รอนับ", machine: "เครื่องฉีด 7", quantityProduced: 2541 },
    { id: "YaXTHNL7", date: "2025-11-27", operatorName: "---ว่าง---", quantityProduced: 4320, shift: "เช้า", lotNumber: "PO-271068", machine: "เครื่องฉีด 6", orderId: "Q6C8MQCK", quantityRejected: 0, status: "รอประกบ", jobId: "KAEoone4", productName: "ฝาตะแกรง 101-103 (สีขาว)" },
    { id: "V8PrOfCs", operatorName: "ตะเล็ก", quantityProduced: 560, lotNumber: "PO-130868", date: "2025-11-27", productName: "CTU ฝา NEW 6 PC (สีขาว)", shift: "เช้า", jobId: "INC0gItG", orderId: "M1XZmf2U", machine: "เครื่องฉีด 8", quantityRejected: 0, status: "รอประกบ" }
  ],
  factory_machines: [
    { id: "727010df", status: "ทำงาน", workingHoursPerDay: 18, location: "โซน A", name: "เครื่องฉีด 1" },
    { id: "3f4e3612", status: "ว่าง", workingHoursPerDay: 18, name: "เครื่องฉีด 2", location: "โซน A" },
    { id: "55c790e0", workingHoursPerDay: 19, name: "เครื่องฉีด 3", location: "โซน A", status: "ว่าง" },
    { id: "6d14dac3", workingHoursPerDay: 18, status: "ทำงาน", name: "เครื่องฉีด 4", location: "โซน A" },
    { id: "1e02fd8e", workingHoursPerDay: 8, name: "เครื่องฉีด 5", status: "ทดสอบงาน", location: "โซน A" },
    { id: "0a3cf318", status: "ทำงาน", name: "เครื่องฉีด 6", location: "โซน A", workingHoursPerDay: 8 },
    { id: "1a1c89e9", name: "เครื่องฉีด 7", location: "โซน A", workingHoursPerDay: 18, status: "ทำงาน" },
    { id: "d50e868a", name: "เครื่องฉีด 8", status: "ทำงาน", workingHoursPerDay: 8, location: "โซน A" }
  ],
  packing_employees: [
    { id: "cfe6bf86", name: "กะปิ", dailyWage: 372, status: "Active", roleId: "role_production", department: "ฝ่ายผลิต" },
    { id: "9623cc9b", dailyWage: 372, department: "ฝ่ายผลิต", roleId: "role_production", status: "Active", name: "ตะเล็ก" },
    { id: "e2efc8c7", dailyWage: 443, department: "ฝ่ายผลิต", roleId: "role_manager", name: "แพทตี้", status: "Active" },
    { id: "52c3dded", department: "ฝ่ายผลิต", status: "Active", name: "อาโม", dailyWage: 372, roleId: "role_packing" }
  ],
  packing_qc_entries: [
    { id: "AbdCUL4V", orderId: "k5BPHNyp", lotNumber: "PO-201068", quantity: 462, productName: "CTU ฝา NEW 10 PC (สีขาว)", status: "Pending", qcInspector: "Pending" },
    { id: "rzfolzGj", quantity: 1800, lotNumber: "PO-220768", qcDate: "2025-11-06", qcInspector: "แพทตี้", productName: "ฝาตะแกรง 101-103B (สีดำ)", status: "Passed", orderId: "MutWzmdO" },
    { id: "g5OTmrn4", qcInspector: "แพทตี้", orderId: "y1f3d4gC", quantity: 1140, lotNumber: "PO-220768", status: "Passed", productName: "ฝาหน้ากาก CT A-103B (สีดำ)", qcDate: "2025-11-06" }
  ],
  packing_raw_materials: [
    { id: "m7o2n4p8", quantity: 0.014, unit: "kg", costPerUnit: 52, name: "เม็ด PC ใสเทา" },
    { id: "c9e4d6f0", unit: "kg", quantity: 624.04, name: "เม็ด PP สีดำ", costPerUnit: 15 },
    { id: "I4WB7jJD", name: "เม็ด PP สีส้ม", unit: "kg", quantity: 724, costPerUnit: 22 },
    { id: "aEZOIiZK", name: "เม็ดบด ของ เม็ด PC ใส BP15", quantity: 1800, costPerUnit: 52, unit: "kg" }
  ]
};

export const getOrders = () => mockData.packing_orders;
export const getInventory = () => mockData.packing_inventory;
export const getMoldingLogs = () => mockData.molding_logs;
export const getMachines = () => mockData.factory_machines;
export const getEmployees = () => mockData.packing_employees;
export const getQCEntries = () => mockData.packing_qc_entries;
export const getRawMaterials = () => mockData.packing_raw_materials;