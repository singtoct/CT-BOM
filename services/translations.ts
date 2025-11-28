
export type Language = 'en' | 'th' | 'zh';

export const translations = {
  en: {
    // Sidebar
    dashboard: 'Dashboard',
    orders: 'Packing Orders',
    production: 'Production / Molding',
    inventory: 'Inventory',
    qc: 'Quality Control',
    employees: 'Employees',
    reports: 'Reports',
    settings: 'Settings',
    manager: 'Manager',
    online: 'Online',
    factory_erp: 'Factory ERP',

    // Header
    search_placeholder: 'Quick search...',

    // Dashboard
    pending_orders: 'Pending Orders',
    from_last_week: 'from last week',
    active_machines: 'Active Machines',
    efficiency: 'Efficiency',
    low_stock_alerts: 'Low Stock Alerts',
    requires_attention: 'Requires attention',
    qc_passed_today: 'QC Passed (Today)',
    total_inspections: 'Total inspections',
    order_fulfillment_trend: 'Order Fulfillment Trend',
    total_qty: 'Total Qty',
    delivered: 'Delivered',
    recent_activities: 'Recent Activities',
    inspector: 'Inspector',
    lot: 'Lot',

    // Orders
    search_orders: 'Search orders...',
    lot_no: 'Lot No.',
    product_name: 'Product Name',
    color: 'Color',
    quantity: 'Quantity',
    due_date: 'Due Date',
    status: 'Status',
    showing_orders: 'Showing {{count}} orders',
    status_completed: 'Completed',
    status_cancelled: 'Cancelled',
    status_pending: 'Pending',
    status_open: 'Open',

    // Inventory
    finished_goods: 'Finished Goods',
    raw_materials: 'Raw Materials',
    stock_level: 'Stock Level',
    unit_cost: 'Unit Cost',
    total_value: 'Total Value',
    material_name: 'Material Name',
    cost_per_unit: 'Cost / Unit',
    status_good: 'Good',
    status_low: 'Low',

    // Production
    production_floor: 'Production Floor',
    recent_molding_logs: 'Recent Molding Logs',
    date: 'Date',
    job_id: 'Job ID',
    machine: 'Machine',
    product: 'Product',
    qty_produced: 'Qty Produced',
    rejected: 'Rejected',
    operator: 'Operator',
    
    // Machine Status Mapping (Data is in Thai, mapping for display)
    machine_status_working: 'Working',
    machine_status_idle: 'Idle',
    machine_status_test: 'Testing',
    machine_status_repair: 'Repair',
    
    location: 'Location',
    ops_hrs_day: 'hrs/day',
    
    // General
    under_construction: 'Under Construction',
    coming_soon: 'The {{module}} module is coming soon.',
  },
  th: {
    // Sidebar
    dashboard: 'ภาพรวม',
    orders: 'รายการแพ็คสินค้า',
    production: 'ฝ่ายผลิต / ฉีดขึ้นรูป',
    inventory: 'คลังสินค้า',
    qc: 'ตรวจสอบคุณภาพ (QC)',
    employees: 'พนักงาน',
    reports: 'รายงาน',
    settings: 'ตั้งค่า',
    manager: 'ผู้จัดการ',
    online: 'ออนไลน์',
    factory_erp: 'ระบบจัดการโรงงาน',

    // Header
    search_placeholder: 'ค้นหาด่วน...',

    // Dashboard
    pending_orders: 'ออเดอร์รอการผลิต',
    from_last_week: 'จากสัปดาห์ที่แล้ว',
    active_machines: 'เครื่องจักรทำงาน',
    efficiency: 'ประสิทธิภาพ',
    low_stock_alerts: 'แจ้งเตือนสินค้าใกล้หมด',
    requires_attention: 'ต้องการการดูแล',
    qc_passed_today: 'ผ่าน QC (วันนี้)',
    total_inspections: 'การตรวจสอบทั้งหมด',
    order_fulfillment_trend: 'แนวโน้มการผลิตตามคำสั่งซื้อ',
    total_qty: 'จำนวนทั้งหมด',
    delivered: 'ส่งมอบแล้ว',
    recent_activities: 'กิจกรรมล่าสุด',
    inspector: 'ผู้ตรวจสอบ',
    lot: 'ล็อต',

    // Orders
    search_orders: 'ค้นหาคำสั่งซื้อ...',
    lot_no: 'เลขที่ล็อต',
    product_name: 'ชื่อสินค้า',
    color: 'สี',
    quantity: 'จำนวน',
    due_date: 'กำหนดส่ง',
    status: 'สถานะ',
    showing_orders: 'แสดง {{count}} รายการ',
    status_completed: 'เสร็จสิ้น',
    status_cancelled: 'ยกเลิก',
    status_pending: 'รอดำเนินการ',
    status_open: 'เปิด',

    // Inventory
    finished_goods: 'สินค้าสำเร็จรูป',
    raw_materials: 'วัตถุดิบ',
    stock_level: 'คงเหลือ',
    unit_cost: 'ต้นทุนต่อหน่วย',
    total_value: 'มูลค่ารวม',
    material_name: 'ชื่อวัตถุดิบ',
    cost_per_unit: 'ต้นทุน / หน่วย',
    status_good: 'ปกติ',
    status_low: 'ใกล้หมด',

    // Production
    production_floor: 'สายการผลิต',
    recent_molding_logs: 'บันทึกการฉีดขึ้นรูปล่าสุด',
    date: 'วันที่',
    job_id: 'เลขที่งาน',
    machine: 'เครื่องจักร',
    product: 'สินค้า',
    qty_produced: 'ผลิตได้',
    rejected: 'ของเสีย',
    operator: 'ผู้ควบคุม',
    
    // Machine Status Mapping
    machine_status_working: 'ทำงาน',
    machine_status_idle: 'ว่าง',
    machine_status_test: 'ทดสอบงาน',
    machine_status_repair: 'ซ่อมบำรุง',

    location: 'ตำแหน่ง',
    ops_hrs_day: 'ชม./วัน',

    // General
    under_construction: 'กำลังปรับปรุง',
    coming_soon: 'โมดูล {{module}} จะเปิดใช้งานเร็วๆ นี้',
  },
  zh: {
    // Sidebar
    dashboard: '仪表板',
    orders: '包装订单',
    production: '生产 / 成型',
    inventory: '库存管理',
    qc: '质量控制 (QC)',
    employees: '员工管理',
    reports: '报表',
    settings: '设置',
    manager: '经理',
    online: '在线',
    factory_erp: '工厂 ERP',

    // Header
    search_placeholder: '快速搜索...',

    // Dashboard
    pending_orders: '待处理订单',
    from_last_week: '较上周',
    active_machines: '运行机器',
    efficiency: '效率',
    low_stock_alerts: '低库存警报',
    requires_attention: '需要注意',
    qc_passed_today: 'QC通过 (今日)',
    total_inspections: '总检查数',
    order_fulfillment_trend: '订单完成趋势',
    total_qty: '总数量',
    delivered: '已交付',
    recent_activities: '最近活动',
    inspector: '检查员',
    lot: '批次',

    // Orders
    search_orders: '搜索订单...',
    lot_no: '批次号',
    product_name: '产品名称',
    color: '颜色',
    quantity: '数量',
    due_date: '截止日期',
    status: '状态',
    showing_orders: '显示 {{count}} 个订单',
    status_completed: '已完成',
    status_cancelled: '已取消',
    status_pending: '待处理',
    status_open: '进行中',

    // Inventory
    finished_goods: '成品',
    raw_materials: '原材料',
    stock_level: '库存水平',
    unit_cost: '单位成本',
    total_value: '总价值',
    material_name: '材料名称',
    cost_per_unit: '单位成本',
    status_good: '充足',
    status_low: '低',

    // Production
    production_floor: '生产车间',
    recent_molding_logs: '最近成型记录',
    date: '日期',
    job_id: '作业ID',
    machine: '机器',
    product: '产品',
    qty_produced: '生产数量',
    rejected: '次品',
    operator: '操作员',

    // Machine Status Mapping
    machine_status_working: '工作',
    machine_status_idle: '空闲',
    machine_status_test: '测试',
    machine_status_repair: '维修',

    location: '位置',
    ops_hrs_day: '小时/天',

    // General
    under_construction: '建设中',
    coming_soon: '{{module}} 模块即将推出',
  }
};
