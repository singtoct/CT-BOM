


import { AppData } from '../types';

// In a real app, this would fetch from an API.
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
  // Consolidating Inventory and Raw Materials into a single list for the new Inventory Component structure
  // We can filter by category in the component
  packing_inventory: [
    { id: "inv1", name: "บล็อคลอย CT 2x4 (สีขาว)", quantity: 20100, category: 'FG', lotNumber: 'PO-260568', minStockLevel: 5000, location: 'A-01-01', unit: 'pcs', costPerUnit: 2.61 },
    { id: "inv2", name: "ฝาหน้ากาก CT A-103 (สีขาว)", quantity: 44122, category: 'FG', lotNumber: 'PO-271068', minStockLevel: 10000, location: 'A-01-02', unit: 'pcs', costPerUnit: 2.03 },
    { id: "inv8", name: "CTU ฝา NEW 4 PC (สีขาว)", quantity: 800, category: 'FG', lotNumber: 'PO-220768', minStockLevel: 1000, location: 'B-02-01', unit: 'pcs', costPerUnit: 9.10 }, // Low Stock Example
    { id: "inv3", name: "พุก (สีขาว)", quantity: 205810, unit: "ชิ้น", costPerUnit: 0.03, category: 'RM', minStockLevel: 50000, location: 'WH-01' },
    { id: "inv4", name: "สกรู P# 7x1\"", quantity: 521000, unit: "Pcs.", costPerUnit: 0.08, category: 'RM', minStockLevel: 100000, location: 'WH-02' },
    { id: "inv5", name: "กล่อง CT 101B", quantity: 6072, unit: "Pcs.", costPerUnit: 2.57, category: 'RM', minStockLevel: 2000, location: 'WH-03' },
    { id: "inv6", name: "เม็ด PC ใส BP15", quantity: 574, unit: "kg", costPerUnit: 52, category: 'RM', minStockLevel: 1000, location: 'SILO-01' }, // Low Stock Example
    { id: "inv7", name: "เม็ด PP สีส้ม", quantity: 724, unit: "kg", costPerUnit: 22, category: 'RM', minStockLevel: 500, location: 'SILO-02' },
    { id: "m7o2n4p8", quantity: 0.014, unit: "kg", costPerUnit: 52, name: "เม็ด PC ใสเทา", category: 'RM', minStockLevel: 100, location: 'SILO-03' }
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
    { id: "727010df", status: "ทำงาน", workingHoursPerDay: 18, location: "โซน A", name: "เครื่องฉีด 1", currentJobId: "job_001", currentOperator: "ตะเล็ก" },
    { id: "3f4e3612", status: "ว่าง", workingHoursPerDay: 18, name: "เครื่องฉีด 2", location: "โซน A" },
    { id: "55c790e0", workingHoursPerDay: 19, name: "เครื่องฉีด 3", location: "โซน A", status: "ว่าง" },
    { id: "6d14dac3", workingHoursPerDay: 18, status: "ทำงาน", name: "เครื่องฉีด 4", location: "โซน A", currentJobId: "job_002", currentOperator: "อาฮิน" },
    { id: "1e02fd8e", workingHoursPerDay: 8, name: "เครื่องฉีด 5", status: "ทดสอบงาน", location: "โซน A" },
    { id: "0a3cf318", status: "ทำงาน", name: "เครื่องฉีด 6", location: "โซน A", workingHoursPerDay: 8, currentJobId: "job_003", currentOperator: "อาโม" },
    { id: "1a1c89e9", name: "เครื่องฉีด 7", location: "โซน A", workingHoursPerDay: 18, status: "ซ่อมบำรุง" },
    { id: "d50e868a", name: "เครื่องฉีด 8", status: "ทำงาน", workingHoursPerDay: 8, location: "โซน A", currentJobId: "job_004", currentOperator: "กะปิ" }
  ],
  packing_employees: [
    { id: "cfe6bf86", name: "กะปิ", dailyWage: 372, status: "Active", roleId: "role_production", department: "ฝ่ายผลิต" },
    { id: "9623cc9b", dailyWage: 372, department: "ฝ่ายผลิต", roleId: "role_production", status: "Active", name: "ตะเล็ก" },
    { id: "e2efc8c7", dailyWage: 443, department: "ฝ่ายผลิต", roleId: "role_manager", name: "แพทตี้", status: "Active" },
    { id: "52c3dded", department: "ฝ่ายผลิต", status: "Active", name: "อาโม", dailyWage: 372, roleId: "role_packing" },
    { id: "605c1672", department: "ฝ่ายผลิต", status: "Active", name: "อาฮิน", dailyWage: 372, roleId: "role_production" }
  ],
  packing_qc_entries: [
    { 
      id: "qc_pending_1", 
      orderId: "k5BPHNyp", 
      lotNumber: "PO-201068", 
      quantity: 462, 
      productName: "CTU ฝา NEW 10 PC (สีขาว)", 
      status: "Pending", 
      qcInspector: "",
      date: "2025-11-28"
    },
    { 
      id: "qc_pending_2", 
      orderId: "prod_1234", 
      lotNumber: "PO-271069", 
      quantity: 2500, 
      productName: "ฝาหน้ากาก CT A-103 (สีขาว)", 
      status: "Pending", 
      qcInspector: "",
      date: "2025-11-28"
    },
    { 
      id: "rzfolzGj", 
      quantity: 1800, 
      lotNumber: "PO-220768", 
      qcDate: "2025-11-06", 
      qcInspector: "แพทตี้", 
      productName: "ฝาตะแกรง 101-103B (สีดำ)", 
      status: "Passed", 
      orderId: "MutWzmdO",
      date: "2025-11-06"
    },
    { 
      id: "g5OTmrn4", 
      qcInspector: "แพทตี้", 
      orderId: "y1f3d4gC", 
      quantity: 1140, 
      lotNumber: "PO-220768", 
      status: "Passed", 
      productName: "ฝาหน้ากาก CT A-103B (สีดำ)", 
      qcDate: "2025-11-06",
      date: "2025-11-06"
    },
    { 
      id: "qc_reject_1", 
      qcInspector: "แพทตี้", 
      orderId: "rej_001", 
      quantity: 500, 
      lotNumber: "PO-220777", 
      status: "Rejected", 
      productName: "บล็อคลอย CT 2x4 (สีขาว)", 
      qcDate: "2025-11-05",
      date: "2025-11-05",
      defectType: "defect_scratches",
      defectQuantity: 12,
      notes: "รอยขนแมวหน้ากาก"
    }
  ],
  packing_raw_materials: [], 
  factory_products: [
    {
      id: "o6p7q8r9",
      name: "ขาพับเปิด-ปิดฝา S2",
      color: "สีขาว",
      productType: "FinishedGood",
      salePrice: 0.36,
      totalCost: 0.1585,
      materialCost: 0.0615,
      profit: 0.21,
      cycleTimeSeconds: 4,
      laborAllocation: 50,
      aiPriceRecommendation: { recommendedPrice: 0.37 }
    },
    {
      id: "n5o6p7q8",
      name: "ขาล็อคข้อพับเปิด-ปิดฝา S1",
      color: "สีขาว",
      productType: "FinishedGood",
      salePrice: 0.32,
      totalCost: 0.138,
      materialCost: 0.041,
      profit: 0.18,
      cycleTimeSeconds: 4,
      laborAllocation: 50,
      aiPriceRecommendation: { recommendedPrice: 0.35 }
    },
    {
      id: "n1o2p3q4",
      name: "ชุดขาล็อคขาเสียบสาย G",
      color: "สีขาว",
      productType: "FinishedGood",
      salePrice: 0.29,
      totalCost: 0.1381,
      materialCost: 0.0208,
      profit: 0.15,
      cycleTimeSeconds: 5.6,
      laborAllocation: 25,
      aiPriceRecommendation: { recommendedPrice: 0.42 }
    },
    {
      id: "l9m0n1o2",
      name: "ชุดขาล็อคขาเสียบสาย L",
      color: "สีขาว",
      productType: "FinishedGood",
      salePrice: 0.3,
      totalCost: 0.0653,
      materialCost: 0.0234,
      profit: 0.23,
      cycleTimeSeconds: 2,
      laborAllocation: 25,
      aiPriceRecommendation: { recommendedPrice: 0.17 }
    },
    {
       id: "p5",
       name: "ฝาหน้ากาก CT A-101",
       color: "สีขาว",
       productType: "FinishedGood",
       salePrice: 3.77,
       totalCost: 2.21,
       materialCost: 1.85,
       profit: 1.56,
       cycleTimeSeconds: 15,
       laborAllocation: 100,
       aiPriceRecommendation: { recommendedPrice: 10.5 }
    }
  ],
  production_queue: [
    {
        id: "job_001",
        orderId: "0ca4f17c",
        productName: "CTU ฝา NEW 4 PC (สีขาว)",
        lotNumber: "PO-220768",
        quantityGoal: 10000,
        quantityProduced: 7792,
        status: "In Progress",
        machineId: "727010df",
        operatorName: "ตะเล็ก",
        priority: 1,
        addedDate: "2025-11-27"
    },
    {
        id: "job_002",
        orderId: "3166d972",
        productName: "ฝาหน้ากาก CT A-103 (สีขาว)",
        lotNumber: "PO-271068",
        quantityGoal: 45000,
        quantityProduced: 30503,
        status: "In Progress",
        machineId: "6d14dac3",
        operatorName: "อาฮิน",
        priority: 1,
        addedDate: "2025-11-26"
    },
    {
        id: "job_003",
        orderId: "BrLHa2Kvz",
        productName: "ฝาตะแกรง 101-103 (สีขาว)",
        lotNumber: "PO-271068",
        quantityGoal: 50000,
        quantityProduced: 43210,
        status: "In Progress",
        machineId: "0a3cf318",
        operatorName: "อาโม",
        priority: 2,
        addedDate: "2025-11-25"
    },
    {
        id: "job_004",
        orderId: "057e06d6",
        productName: "CTU ฝา NEW 6 PC (สีขาว)",
        lotNumber: "PO-130868",
        quantityGoal: 5000,
        quantityProduced: 3240,
        status: "In Progress",
        machineId: "d50e868a",
        operatorName: "กะปิ",
        priority: 3,
        addedDate: "2025-11-27"
    },
    {
        id: "job_005",
        orderId: "pending_1",
        productName: "#10 CTU ฝา NEW 6 PC (ดำใส)",
        lotNumber: "PO-130869",
        quantityGoal: 2000,
        quantityProduced: 0,
        status: "Pending",
        priority: 4,
        addedDate: "2025-11-28"
    },
    {
      id: "job_006",
      orderId: "pending_2",
      productName: "#10 บล็อคฝัง CT 4x4 (สีส้ม)",
      lotNumber: "PO-160469",
      quantityGoal: 10000,
      quantityProduced: 0,
      status: "Paused",
      priority: 5,
      addedDate: "2025-11-28"
    }
  ],
  stock_transactions: [
      { id: "tx_1", itemId: "inv1", type: "IN", quantity: 5000, date: "2025-11-20 09:30", user: "อาโม", documentRef: "PROD-20251120", note: "รับจากการผลิต" },
      { id: "tx_2", itemId: "inv1", type: "OUT", quantity: 2000, date: "2025-11-21 14:00", user: "แพทตี้", documentRef: "INV-25001", note: "ส่งลูกค้า" },
      { id: "tx_3", itemId: "inv6", type: "IN", quantity: 1000, date: "2025-11-25 10:00", user: "จัดซื้อ", documentRef: "PO-2511-05", note: "รับวัตถุดิบ" },
      { id: "tx_4", itemId: "inv6", type: "OUT", quantity: 500, date: "2025-11-26 08:00", user: "กะปิ", documentRef: "JOB-004", note: "เบิกผลิต" }
  ],
  factory_customers: [
    { id: "4c9db0db", name: "บริษัท จีโนลกรุ๊ป ซีที อิเล็คทริคฟิเคชั่น จำกัด", address: "49/3 หมู่ 8 ต.นาดี อ.เมืองสมุทรสาคร จ.สมุทรสาคร 74000", phone: "034-496-686", contactPerson: "ขนส่ง" },
    { id: "a6a2a826", name: "บริษัท ซีที อิเล็คทริค จำกัด", address: "15/16 หมู่ 9 ต.นาดี อ.เมืองสมุทรสาคร จ.สมุทรสาคร 74000", phone: "-", contactPerson: "เพียวเพียว" }
  ],
  delivery_notes: [
    { 
      id: "dn_001", 
      dnNumber: "DN-202511-001", 
      customerId: "4c9db0db", 
      date: "2025-11-25", 
      status: "Delivered",
      items: [
        { inventoryItemId: "inv1", productName: "บล็อคลอย CT 2x4 (สีขาว)", quantity: 2000, unitPrice: 3.83, lotNumber: "PO-260568" }
      ],
      totalAmount: 7660
    },
     { 
      id: "dn_002", 
      dnNumber: "DN-202511-002", 
      customerId: "a6a2a826", 
      date: "2025-11-28", 
      status: "Pending",
      items: [
        { inventoryItemId: "inv2", productName: "ฝาหน้ากาก CT A-103 (สีขาว)", quantity: 5000, unitPrice: 3.57, lotNumber: "PO-271068" }
      ],
      totalAmount: 17850
    }
  ],
  factory_suppliers: [
    { id: "sup_001", name: "บริษัท เค.พี.พลาสติก จำกัด", contactPerson: "คุณอำนาจ", phone: "091-157-8212" },
    { id: "sup_002", name: "บริษัท โมโต ปิ๊กเม้นท์ จำกัด", contactPerson: "คุณถนอม", phone: "0-2450-7365-6" },
    { id: "sup_003", name: "บริษัท เอ ดี เอส บรรจุภัณฑ์ จำกัด", contactPerson: "-", phone: "-" }
  ],
  factory_purchase_orders: [
    { 
      id: "po_001", 
      poNumber: "PO-2508-001", 
      supplierId: "sup_001", 
      orderDate: "2025-08-08", 
      expectedDate: "2025-08-09", 
      status: "Received", 
      items: [
        { rawMaterialId: "inv6", quantity: 2000, unitPrice: 43.5 }
      ]
    },
    { 
      id: "po_002", 
      poNumber: "PO-2511-005", 
      supplierId: "sup_002", 
      orderDate: "2025-11-25", 
      expectedDate: "2025-11-27", 
      status: "Ordered", 
      items: [
        { rawMaterialId: "inv7", quantity: 500, unitPrice: 22 }
      ]
    }
  ]
};

export const getOrders = () => mockData.packing_orders;
export const getInventory = () => mockData.packing_inventory;
export const getMoldingLogs = () => mockData.molding_logs;
export const getMachines = () => mockData.factory_machines;
export const getEmployees = () => mockData.packing_employees;
export const getQCEntries = () => mockData.packing_qc_entries;
export const getRawMaterials = () => mockData.packing_inventory.filter(i => i.category === 'RM');
export const getProducts = () => mockData.factory_products;
export const getProductionQueue = () => mockData.production_queue;
export const getStockTransactions = (itemId: string) => mockData.stock_transactions.filter(t => t.itemId === itemId);
export const getCustomers = () => mockData.factory_customers;
export const getDeliveryNotes = () => mockData.delivery_notes;
export const getSuppliers = () => mockData.factory_suppliers;
export const getPurchaseOrders = () => mockData.factory_purchase_orders;