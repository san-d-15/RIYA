/**
 * MedCare - Medical Store Management System
 * Core State Engine, DataStore & Shared Application Services
 */

// Initial Seed Data mirroring the MySQL 'medical_store_db'
const INITIAL_DATABASE = {
  settings: {
    storeName: "MedCare Pharmacy",
    storeTagline: "Trusted Clinical Care & Pharmacy",
    storeAddress: "Shop 14, Apollo Medical Plaza, Central Hospital Road",
    city: "Mumbai, Maharashtra - 400001",
    phone: "+91 98765 43210",
    email: "contact@medcarepharmacy.com",
    gstNumber: "27AABCU9603R1ZM",
    drugLicenseNo: "DL-MH-2024-88912",
    invoicePrefix: "MED-2026-",
    taxRate: 5.0, // 5% GST for essential pharma
    currency: "₹"
  },
  users: [
    {
      id: 1,
      name: "Dr. Arvind Mehta",
      username: "admin",
      email: "admin@medcare.com",
      role: "Admin",
      phone: "+91 98201 12345",
      status: "Active",
      avatar: "",
      createdAt: "2026-01-10"
    },
    {
      id: 2,
      name: "Pooja Deshmukh",
      username: "pharmacist",
      email: "pharmacist@medcare.com",
      role: "Pharmacist",
      phone: "+91 98202 23456",
      status: "Active",
      avatar: "",
      createdAt: "2026-02-01"
    },
    {
      id: 3,
      name: "Rohan Kulkarni",
      username: "cashier",
      email: "cashier@medcare.com",
      role: "Cashier",
      phone: "+91 98203 34567",
      status: "Active",
      avatar: "",
      createdAt: "2026-02-15"
    }
  ],
  categories: [
    { id: 1, name: "Antibiotics", description: "Broad and narrow spectrum bacterial infection treatments" },
    { id: 2, name: "Analgesics & Antipyretics", description: "Pain relief, fever reduction and anti-inflammatory medicines" },
    { id: 3, name: "Antidiabetics", description: "Type 1 and Type 2 diabetes oral agents and insulin" },
    { id: 4, name: "Cardiovascular & Antihypertensives", description: "Blood pressure, cholesterol, and heart health drugs" },
    { id: 5, name: "Gastrointestinal", description: "Antacids, proton pump inhibitors, and digestive aids" },
    { id: 6, name: "Respiratory & Antiallergic", description: "Antihistamines, bronchodilators, and cough syrups" },
    { id: 7, name: "Vitamins & Nutritional Supplements", description: "Daily multivitamins, minerals, calcium, and vitamin D" },
    { id: 8, name: "Dermatological & Topicals", description: "Antibacterial creams, ointments, and antifungal lotions" }
  ],
  suppliers: [
    {
      id: 1,
      supplierName: "Sun Pharma Distributors",
      companyName: "Sun Pharmaceutical Industries Ltd.",
      phone: "+91 22 4324 0000",
      email: "orders@sunpharma-supply.com",
      address: "Goregaon East, Western Express Highway, Mumbai",
      gstNumber: "27AAACS1123P1Z1",
      medicinesSupplied: "Metformin, Azithromycin, Pantoprazole"
    },
    {
      id: 2,
      supplierName: "Cipla Care Logistics",
      companyName: "Cipla Ltd.",
      phone: "+91 22 2482 6000",
      email: "supply@ciplacare.in",
      address: "Peninsula Business Park, Lower Parel, Mumbai",
      gstNumber: "27AAACC2384A1Z9",
      medicinesSupplied: "Montelukast, Asthalin Inhaler, Cetirizine"
    },
    {
      id: 3,
      supplierName: "Abbott Depot West",
      companyName: "Abbott Healthcare Pvt. Ltd.",
      phone: "+91 22 3816 2000",
      email: "orders@abbott-depot.com",
      address: "Godrej BKC, Bandra Kurla Complex, Mumbai",
      gstNumber: "27AAACA9928D1ZH",
      medicinesSupplied: "Thyronorm, Brufen, Digene Gel"
    },
    {
      id: 4,
      supplierName: "Dr. Reddy's Direct",
      companyName: "Dr. Reddy's Laboratories",
      phone: "+91 40 4900 2900",
      email: "b2b@drreddys.com",
      address: "Banjara Hills, Hyderabad, Telangana",
      gstNumber: "36AAACD4999Q1ZV",
      medicinesSupplied: "Omez, Atorvastatin, Nise"
    },
    {
      id: 5,
      supplierName: "Mankind MediSource",
      companyName: "Mankind Pharma Ltd.",
      phone: "+91 11 4684 6700",
      email: "dist@mankindpharma.com",
      address: "Okhla Phase III, New Delhi",
      gstNumber: "07AAACM3891L1Z4",
      medicinesSupplied: "Moxikind-CV, Dydroboon, Manforce"
    }
  ],
  customers: [
    {
      id: 1,
      customerName: "Rahul Sharma",
      phone: "+91 98210 11223",
      email: "rahul.sharma@gmail.com",
      address: "Flat 402, Green Meadows, Andheri West, Mumbai",
      purchaseHistoryCount: 8,
      totalSpent: 4250.00
    },
    {
      id: 2,
      customerName: "Priya Patel",
      phone: "+91 98211 22334",
      email: "priya.patel@yahoo.com",
      address: "B-12, Sagar Darshan, Bandra West, Mumbai",
      purchaseHistoryCount: 14,
      totalSpent: 9820.00
    },
    {
      id: 3,
      customerName: "Amit Verma",
      phone: "+91 98212 33445",
      email: "amit.verma@outlook.com",
      address: "103, Silver Arc, Thane West",
      purchaseHistoryCount: 5,
      totalSpent: 2150.00
    },
    {
      id: 4,
      customerName: "Sunita Rao",
      phone: "+91 98213 44556",
      email: "sunita.rao@gmail.com",
      address: "Row House 7, Palm Beach Road, Navi Mumbai",
      purchaseHistoryCount: 19,
      totalSpent: 14600.00
    },
    {
      id: 5,
      customerName: "Rajesh Kumar",
      phone: "+91 98214 55667",
      email: "rajesh.k@gmail.com",
      address: "A-501, Highland Heights, Powai, Mumbai",
      purchaseHistoryCount: 3,
      totalSpent: 1840.00
    },
    {
      id: 6,
      customerName: "Sneha Gupta",
      phone: "+91 98215 66778",
      email: "sneha.gupta@hotmail.com",
      address: "Flat 204, Royal Palms, Malad East, Mumbai",
      purchaseHistoryCount: 11,
      totalSpent: 7320.00
    }
  ],
  medicines: [
    {
      id: 101,
      name: "Dolo 650mg Tablet",
      genericName: "Paracetamol (Acetaminophen)",
      category: "Analgesics & Antipyretics",
      categoryId: 2,
      manufacturer: "Micro Labs Ltd.",
      batchNumber: "DL-650-B41",
      purchasePrice: 24.50,
      sellingPrice: 32.00,
      quantity: 320,
      minStockLevel: 50,
      mfgDate: "2025-10-15",
      expiryDate: "2027-09-30",
      supplierId: 1,
      supplier: "Sun Pharma Distributors",
      description: "Fast-acting analgesic and antipyretic for high fever, headache and body pain."
    },
    {
      id: 102,
      name: "Augmentin 625 Duo Tablet",
      genericName: "Amoxicillin + Potassium Clavulanate",
      category: "Antibiotics",
      categoryId: 1,
      manufacturer: "GlaxoSmithKline (GSK)",
      batchNumber: "AUG-882-C1",
      purchasePrice: 165.00,
      sellingPrice: 215.50,
      quantity: 18, // LOW STOCK
      minStockLevel: 30,
      mfgDate: "2025-08-01",
      expiryDate: "2027-03-31",
      supplierId: 5,
      supplier: "Mankind MediSource",
      description: "Potent antibiotic for respiratory tract, ear, sinus and skin bacterial infections."
    },
    {
      id: 103,
      name: "Azithral 500mg Tablet",
      genericName: "Azithromycin",
      category: "Antibiotics",
      categoryId: 1,
      manufacturer: "Alembic Pharmaceuticals",
      batchNumber: "AZ-500-X19",
      purchasePrice: 95.00,
      sellingPrice: 128.00,
      quantity: 85,
      minStockLevel: 25,
      mfgDate: "2025-11-10",
      expiryDate: "2027-10-31",
      supplierId: 1,
      supplier: "Sun Pharma Distributors",
      description: "Macrolide antibiotic prescribed for throat, bronchitis and chest infections."
    },
    {
      id: 104,
      name: "Glycomet 500mg SR",
      genericName: "Metformin Hydrochloride Sustained Release",
      category: "Antidiabetics",
      categoryId: 3,
      manufacturer: "USV Private Limited",
      batchNumber: "GLY-50-K9",
      purchasePrice: 18.00,
      sellingPrice: 26.50,
      quantity: 210,
      minStockLevel: 40,
      mfgDate: "2025-09-20",
      expiryDate: "2028-01-31",
      supplierId: 1,
      supplier: "Sun Pharma Distributors",
      description: "First-line oral anti-diabetic agent for glycemic control in Type 2 Diabetes."
    },
    {
      id: 105,
      name: "Telma 40mg Tablet",
      genericName: "Telmisartan",
      category: "Cardiovascular & Antihypertensives",
      categoryId: 4,
      manufacturer: "Glenmark Pharmaceuticals",
      batchNumber: "TEL-40-A22",
      purchasePrice: 98.00,
      sellingPrice: 135.00,
      quantity: 12, // LOW STOCK
      minStockLevel: 25,
      mfgDate: "2025-07-15",
      expiryDate: "2027-06-30",
      supplierId: 2,
      supplier: "Cipla Care Logistics",
      description: "Angiotensin receptor blocker for managing primary arterial hypertension."
    },
    {
      id: 106,
      name: "Pan 40mg Tablet",
      genericName: "Pantoprazole Gastro-resistant",
      category: "Gastrointestinal",
      categoryId: 5,
      manufacturer: "Alkem Laboratories",
      batchNumber: "PAN-40-M7",
      purchasePrice: 85.00,
      sellingPrice: 118.00,
      quantity: 140,
      minStockLevel: 30,
      mfgDate: "2025-10-01",
      expiryDate: "2027-11-30",
      supplierId: 1,
      supplier: "Sun Pharma Distributors",
      description: "Proton pump inhibitor for gastroesophageal reflux disease (GERD) and peptic ulcers."
    },
    {
      id: 107,
      name: "Montair LC Tablet",
      genericName: "Montelukast 10mg + Levocetirizine 5mg",
      category: "Respiratory & Antiallergic",
      categoryId: 6,
      manufacturer: "Cipla Ltd.",
      batchNumber: "MTR-LC-90",
      purchasePrice: 140.00,
      sellingPrice: 185.00,
      quantity: 6, // CRITICAL LOW STOCK
      minStockLevel: 25,
      mfgDate: "2025-06-12",
      expiryDate: "2027-05-31",
      supplierId: 2,
      supplier: "Cipla Care Logistics",
      description: "Combination medicine treating allergic rhinitis, seasonal asthma and sneezing."
    },
    {
      id: 108,
      name: "Becosules Z Capsules",
      genericName: "B-Complex Forte with Vitamin C & Zinc",
      category: "Vitamins & Nutritional Supplements",
      categoryId: 7,
      manufacturer: "Pfizer Ltd.",
      batchNumber: "BCZ-110-E",
      purchasePrice: 38.00,
      sellingPrice: 52.00,
      quantity: 260,
      minStockLevel: 50,
      mfgDate: "2025-12-01",
      expiryDate: "2028-05-31",
      supplierId: 3,
      supplier: "Abbott Depot West",
      description: "Therapeutic vitamin supplement for immunity, mouth ulcers and tissue repair."
    },
    {
      id: 109,
      name: "Candid-B Cream 20g",
      genericName: "Clotrimazole + Beclomethasone Dipropionate",
      category: "Dermatological & Topicals",
      categoryId: 8,
      manufacturer: "Glenmark Pharmaceuticals",
      batchNumber: "CND-B-04",
      purchasePrice: 90.00,
      sellingPrice: 122.00,
      quantity: 45,
      minStockLevel: 15,
      mfgDate: "2025-05-10",
      expiryDate: "2027-04-30",
      supplierId: 4,
      supplier: "Dr. Reddy's Direct",
      description: "Broad-spectrum topical antifungal and anti-inflammatory cream for fungal infections."
    },
    {
      id: 110,
      name: "Amoxyclav 375mg (Expired Batch)",
      genericName: "Amoxicillin + Clavulanic Acid",
      category: "Antibiotics",
      categoryId: 1,
      manufacturer: "Abbott Healthcare",
      batchNumber: "EXP-2024-B1",
      purchasePrice: 110.00,
      sellingPrice: 145.00,
      quantity: 8, // EXPIRED DEMO
      minStockLevel: 10,
      mfgDate: "2024-01-10",
      expiryDate: "2026-02-15", // Expired
      supplierId: 3,
      supplier: "Abbott Depot West",
      description: "Expired demo batch quarantined for return to manufacturer."
    },
    {
      id: 111,
      name: "Asthalin 100mcg Inhaler",
      genericName: "Salbutamol Inhaler CFC-free",
      category: "Respiratory & Antiallergic",
      categoryId: 6,
      manufacturer: "Cipla Ltd.",
      batchNumber: "AST-CF-55",
      purchasePrice: 120.00,
      sellingPrice: 162.00,
      quantity: 75,
      minStockLevel: 20,
      mfgDate: "2025-11-20",
      expiryDate: "2027-10-31",
      supplierId: 2,
      supplier: "Cipla Care Logistics",
      description: "Fast-acting bronchodilator inhaler for acute asthma relief and wheezing."
    },
    {
      id: 112,
      name: "Lipaglyn 4mg Tablet",
      genericName: "Saroglitazar",
      category: "Cardiovascular & Antihypertensives",
      categoryId: 4,
      manufacturer: "Zydus Cadila",
      batchNumber: "LIP-04-R7",
      purchasePrice: 240.00,
      sellingPrice: 310.00,
      quantity: 28,
      minStockLevel: 15,
      mfgDate: "2025-09-01",
      expiryDate: "2026-10-15", // Expiring soon
      supplierId: 4,
      supplier: "Dr. Reddy's Direct",
      description: "Dual PPAR agonist for diabetic dyslipidemia and hypertriglyceridemia."
    }
  ],
  sales: [
    {
      id: 501,
      invoiceNumber: "MED-2026-00501",
      customerId: 1,
      customerName: "Rahul Sharma",
      customerPhone: "+91 98210 11223",
      userId: 1,
      userName: "Dr. Arvind Mehta",
      date: "2026-09-25",
      time: "10:30 AM",
      items: [
        { medicineId: 101, name: "Dolo 650mg Tablet", quantity: 2, unitPrice: 32.00, total: 64.00 },
        { medicineId: 106, name: "Pan 40mg Tablet", quantity: 1, unitPrice: 118.00, total: 118.00 }
      ],
      subtotal: 182.00,
      discountPercent: 5.0,
      discountAmount: 9.10,
      taxPercent: 5.0,
      taxAmount: 8.65,
      grandTotal: 181.55,
      paymentMethod: "UPI"
    },
    {
      id: 502,
      invoiceNumber: "MED-2026-00502",
      customerId: 2,
      customerName: "Priya Patel",
      customerPhone: "+91 98211 22334",
      userId: 3,
      userName: "Rohan Kulkarni",
      date: "2026-09-25",
      time: "11:45 AM",
      items: [
        { medicineId: 102, name: "Augmentin 625 Duo Tablet", quantity: 2, unitPrice: 215.50, total: 431.00 },
        { medicineId: 108, name: "Becosules Z Capsules", quantity: 1, unitPrice: 52.00, total: 52.00 }
      ],
      subtotal: 483.00,
      discountPercent: 10.0,
      discountAmount: 48.30,
      taxPercent: 5.0,
      taxAmount: 21.74,
      grandTotal: 456.44,
      paymentMethod: "Card"
    },
    {
      id: 503,
      invoiceNumber: "MED-2026-00503",
      customerId: 4,
      customerName: "Sunita Rao",
      customerPhone: "+91 98213 44556",
      userId: 2,
      userName: "Pooja Deshmukh",
      date: "2026-09-25",
      time: "02:15 PM",
      items: [
        { medicineId: 104, name: "Glycomet 500mg SR", quantity: 3, unitPrice: 26.50, total: 79.50 },
        { medicineId: 105, name: "Telma 40mg Tablet", quantity: 2, unitPrice: 135.00, total: 270.00 }
      ],
      subtotal: 349.50,
      discountPercent: 0,
      discountAmount: 0,
      taxPercent: 5.0,
      taxAmount: 17.48,
      grandTotal: 366.98,
      paymentMethod: "Cash"
    }
  ],
  purchases: [
    {
      id: 301,
      purchaseInvoiceNo: "PUR-2026-0089",
      supplierId: 1,
      supplierName: "Sun Pharma Distributors",
      date: "2026-09-24",
      totalAmount: 14750.00,
      items: [
        { medicineId: 101, medicineName: "Dolo 650mg Tablet", quantity: 200, unitPrice: 24.50, total: 4900.00, batchNumber: "DL-650-B41", expiryDate: "2027-09-30" },
        { medicineId: 106, medicineName: "Pan 40mg Tablet", quantity: 100, unitPrice: 85.00, total: 8500.00, batchNumber: "PAN-40-M7", expiryDate: "2027-11-30" }
      ],
      paymentStatus: "Paid"
    },
    {
      id: 302,
      purchaseInvoiceNo: "PUR-2026-0090",
      supplierId: 2,
      supplierName: "Cipla Care Logistics",
      date: "2026-09-25",
      totalAmount: 9000.00,
      items: [
        { medicineId: 111, medicineName: "Asthalin 100mcg Inhaler", quantity: 75, unitPrice: 120.00, total: 9000.00, batchNumber: "AST-CF-55", expiryDate: "2027-10-31" }
      ],
      paymentStatus: "Paid"
    }
  ]
};

// ==========================================================================
// LocalStorage Persistence Wrapper
// ==========================================================================
class MedCareDataStore {
  constructor() {
    this.storageKey = 'medcare_pharmacy_db_v1';
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Storage load error, initializing default database", e);
    }
    this.saveData(INITIAL_DATABASE);
    return JSON.parse(JSON.stringify(INITIAL_DATABASE));
  }

  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data || this.data));
    } catch (e) {
      console.error("Storage save failed", e);
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    this.saveData(this.data);
  }

  // Getters
  getSettings() { return this.data.settings; }
  getUsers() { return this.data.users; }
  getCategories() { return this.data.categories; }
  getSuppliers() { return this.data.suppliers; }
  getCustomers() { return this.data.customers; }
  getMedicines() { return this.data.medicines; }
  getSales() { return this.data.sales; }
  getPurchases() { return this.data.purchases; }

  // Medicines Management
  addMedicine(med) {
    med.id = Date.now();
    med.purchasePrice = parseFloat(med.purchasePrice) || 0;
    med.sellingPrice = parseFloat(med.sellingPrice) || 0;
    med.quantity = parseInt(med.quantity, 10) || 0;
    med.minStockLevel = parseInt(med.minStockLevel, 10) || 10;
    this.data.medicines.unshift(med);
    this.saveData();
    return med;
  }

  updateMedicine(id, updatedFields) {
    const idx = this.data.medicines.findIndex(m => m.id === parseInt(id, 10));
    if (idx !== -1) {
      this.data.medicines[idx] = { ...this.data.medicines[idx], ...updatedFields };
      this.saveData();
      return this.data.medicines[idx];
    }
    return null;
  }

  deleteMedicine(id) {
    this.data.medicines = this.data.medicines.filter(m => m.id !== parseInt(id, 10));
    this.saveData();
  }

  // Category Management
  addCategory(category) {
    category.id = Date.now();
    this.data.categories.push(category);
    this.saveData();
    return category;
  }

  updateCategory(id, updated) {
    const idx = this.data.categories.findIndex(c => c.id === parseInt(id, 10));
    if (idx !== -1) {
      this.data.categories[idx] = { ...this.data.categories[idx], ...updated };
      this.saveData();
      return this.data.categories[idx];
    }
    return null;
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(c => c.id !== parseInt(id, 10));
    this.saveData();
  }

  // Supplier Management
  addSupplier(supplier) {
    supplier.id = Date.now();
    this.data.suppliers.push(supplier);
    this.saveData();
    return supplier;
  }

  updateSupplier(id, updated) {
    const idx = this.data.suppliers.findIndex(s => s.id === parseInt(id, 10));
    if (idx !== -1) {
      this.data.suppliers[idx] = { ...this.data.suppliers[idx], ...updated };
      this.saveData();
      return this.data.suppliers[idx];
    }
    return null;
  }

  deleteSupplier(id) {
    this.data.suppliers = this.data.suppliers.filter(s => s.id !== parseInt(id, 10));
    this.saveData();
  }

  // Customer Management
  addCustomer(customer) {
    customer.id = Date.now();
    customer.purchaseHistoryCount = 0;
    customer.totalSpent = 0;
    this.data.customers.push(customer);
    this.saveData();
    return customer;
  }

  updateCustomer(id, updated) {
    const idx = this.data.customers.findIndex(c => c.id === parseInt(id, 10));
    if (idx !== -1) {
      this.data.customers[idx] = { ...this.data.customers[idx], ...updated };
      this.saveData();
      return this.data.customers[idx];
    }
    return null;
  }

  deleteCustomer(id) {
    this.data.customers = this.data.customers.filter(c => c.id !== parseInt(id, 10));
    this.saveData();
  }

  // Sales & POS Billing (Deducts stock automatically in DB)
  recordSale(saleData) {
    const saleId = Date.now();
    const invCount = this.data.sales.length + 504;
    const invoiceNumber = `${this.data.settings.invoicePrefix || 'MED-2026-'}${String(invCount).padStart(5, '0')}`;
    
    const newSale = {
      id: saleId,
      invoiceNumber: invoiceNumber,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...saleData
    };

    // Stock deduction & customer statistics update
    newSale.items.forEach(item => {
      const med = this.data.medicines.find(m => m.id === parseInt(item.medicineId, 10));
      if (med) {
        med.quantity = Math.max(0, med.quantity - item.quantity);
      }
    });

    if (newSale.customerId) {
      const cust = this.data.customers.find(c => c.id === parseInt(newSale.customerId, 10));
      if (cust) {
        cust.purchaseHistoryCount = (cust.purchaseHistoryCount || 0) + 1;
        cust.totalSpent = (cust.totalSpent || 0) + newSale.grandTotal;
      }
    }

    this.data.sales.unshift(newSale);
    this.saveData();
    return newSale;
  }

  // Purchase Module (Increases stock automatically in DB)
  recordPurchase(purchaseData) {
    const purchaseId = Date.now();
    const newPurchase = {
      id: purchaseId,
      date: new Date().toISOString().split('T')[0],
      ...purchaseData
    };

    // Increase stock for purchased medicines
    newPurchase.items.forEach(item => {
      const med = this.data.medicines.find(m => m.id === parseInt(item.medicineId, 10));
      if (med) {
        med.quantity = (med.quantity || 0) + parseInt(item.quantity, 10);
        if (item.purchasePrice) med.purchasePrice = parseFloat(item.purchasePrice);
        if (item.batchNumber) med.batchNumber = item.batchNumber;
        if (item.expiryDate) med.expiryDate = item.expiryDate;
      }
    });

    this.data.purchases.unshift(newPurchase);
    this.saveData();
    return newPurchase;
  }

  // User Management
  addUser(user) {
    user.id = Date.now();
    user.createdAt = new Date().toISOString().split('T')[0];
    this.data.users.push(user);
    this.saveData();
    return user;
  }

  updateUser(id, updated) {
    const idx = this.data.users.findIndex(u => u.id === parseInt(id, 10));
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updated };
      this.saveData();
      return this.data.users[idx];
    }
    return null;
  }

  deleteUser(id) {
    this.data.users = this.data.users.filter(u => u.id !== parseInt(id, 10));
    this.saveData();
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.saveData();
    return this.data.settings;
  }
}

// Global DB Instance
window.MedCareDB = new MedCareDataStore();

// ==========================================================================
// Authentication & Session Management
// ==========================================================================
const MedCareAuth = {
  sessionKey: 'medcare_auth_session_user',

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(this.sessionKey);
      if (raw) {
        const user = JSON.parse(raw);
        // Validate that the stored object is a real user with an id
        if (user && user.id) return user;
      }
    } catch (e) {}
    // No valid session — return null so requireAuth() can redirect
    return null;
  },

  setCurrentUser(user) {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  },

  login(identifier, password) {
    const users = window.MedCareDB.getUsers();
    // Support matching by username or email
    const idClean = identifier.trim().toLowerCase();
    const user = users.find(u => u.username.toLowerCase() === idClean || u.email.toLowerCase() === idClean);

    if (!user) {
      return { success: false, message: "User account not found with provided credentials." };
    }

    // Role-based mock credentials verification (matching database defaults)
    // admin / admin123, pharmacist / pharm123, cashier / cash123
    const valid = 
      (user.role === 'Admin' && password === 'admin123') ||
      (user.role === 'Pharmacist' && password === 'pharm123') ||
      (user.role === 'Cashier' && password === 'cash123') ||
      password === 'admin123' || password === 'password123'; // Friendly fallback for easy testing

    if (!valid) {
      return { success: false, message: "Incorrect password. Please verify your credentials and try again." };
    }

    this.setCurrentUser(user);
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem(this.sessionKey);
    window.location.href = 'login.html';
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user && !window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
    }
    return user;
  },

  hasRole(...roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  }
};

window.MedCareAuth = MedCareAuth;

// ==========================================================================
// Shared UI Utilities: Toasts, Modals, Formatters
// ==========================================================================
const MedCareUI = {
  showToast(message, type = 'success') {
    let container = document.getElementById('medcare-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'medcare-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-circle-xmark';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  formatCurrency(num) {
    const val = parseFloat(num) || 0;
    return '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  },

  confirmAction(message, onConfirm) {
    if (confirm(message)) {
      onConfirm();
    }
  },

  calculateExpiryDays(expiryDateStr) {
    if (!expiryDateStr) return 9999;
    const now = new Date();
    const expiry = new Date(expiryDateStr);
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  getStockStatus(medicine) {
    const days = this.calculateExpiryDays(medicine.expiryDate);
    if (days <= 0) return { label: 'Expired', class: 'badge-danger' };
    if (medicine.quantity <= 0) return { label: 'Out of Stock', class: 'badge-danger' };
    if (medicine.quantity <= medicine.minStockLevel) return { label: 'Low Stock', class: 'badge-warning' };
    return { label: 'In Stock', class: 'badge-success' };
  }
};

window.MedCareUI = MedCareUI;

// ==========================================================================
// Sidebar & Shell Navigation Component Generator
// ==========================================================================
function renderAppShell(activePage = 'dashboard') {
  const user = MedCareAuth.getCurrentUser();
  const userInitials = (user && user.name) ? user.name.trim().split(/\s+/).filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'MC';
  const medicines = MedCareDB.getMedicines();
  const lowStockCount = medicines.filter(m => m.quantity <= m.minStockLevel && MedCareUI.calculateExpiryDays(m.expiryDate) > 0).length;
  const expiredCount = medicines.filter(m => MedCareUI.calculateExpiryDays(m.expiryDate) <= 0).length;

  const sidebarEl = document.getElementById('app-sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = `
      <div class="sidebar-header">
        <a href="dashboard.html" class="brand-logo" title="MedCare Pharmacy">
          <div class="sidebar-logo-icon">
            <svg viewBox="0 0 64 64" class="sidebar-brand-svg" role="img" aria-label="MedCare Emblem">
              <defs>
                <linearGradient id="sbBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#1E88E5"/>
                  <stop offset="100%" stop-color="#1565C0"/>
                </linearGradient>
                <linearGradient id="sbTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00C49F"/>
                  <stop offset="100%" stop-color="#00A896"/>
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="none" stroke="url(#sbTeal)" stroke-width="1.5" stroke-dasharray="4 2" class="logo-glow-aura" opacity="0.35"/>
              <circle cx="32" cy="32" r="28" fill="#F0FDF4" opacity="0.85"/>
              <rect x="27" y="14" width="10" height="36" rx="5" fill="url(#sbBlue)"/>
              <rect x="14" y="27" width="36" height="10" rx="5" fill="url(#sbBlue)"/>
              <g transform="rotate(-30 32 32)">
                <rect x="18" y="25" width="28" height="14" rx="7" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.5"/>
                <path d="M 26,25 L 39,25 C 42.8,25 46,28.1 46,32 C 46,35.9 42.8,39 39,39 L 26,39 Z" fill="url(#sbTeal)"/>
                <path d="M 26,25 L 26,39 C 22.1,39 19,35.9 19,32 C 19,28.1 22.1,25 26,25 Z" fill="#F8FAFC"/>
                <line x1="26" y1="25" x2="26" y2="39" stroke="#CBD5E1" stroke-width="0.75"/>
              </g>
              <path d="M 22 32 L 27 32 L 30 26 L 34 38 L 37 30 L 40 32 L 43 32" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="logo-text-block">
            <div class="logo-text"><span class="text-blue">Med</span><span class="text-teal">Care</span></div>
            <div class="logo-subtext">PHARMACY</div>
          </div>
        </a>
        <button class="sidebar-close-btn" id="sidebar-close-trigger" aria-label="Close Sidebar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="sidebar-nav">
        <div class="nav-section-title">Core Operations</div>
        
        <a href="dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-chart-pie"></i>
            <span>Dashboard</span>
          </div>
        </a>

        <a href="sales.html" class="nav-link ${activePage === 'sales' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-cash-register"></i>
            <span>POS Billing</span>
          </div>
          <span class="nav-badge success">POS</span>
        </a>

        <a href="medicines.html" class="nav-link ${activePage === 'medicines' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-pills"></i>
            <span>Medicines</span>
          </div>
          <span class="nav-badge ${lowStockCount > 0 ? 'warning' : 'neutral'}">${medicines.length}</span>
        </a>

        <a href="categories.html" class="nav-link ${activePage === 'categories' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-tags"></i>
            <span>Categories</span>
          </div>
        </a>

        <a href="purchases.html" class="nav-link ${activePage === 'purchases' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-truck-ramp-box"></i>
            <span>Purchases</span>
          </div>
        </a>

        <div class="nav-section-title">Inventory & Quality</div>

        <a href="inventory.html" class="nav-link ${activePage === 'inventory' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-boxes-stacked"></i>
            <span>Inventory</span>
          </div>
          ${lowStockCount > 0 ? `<span class="nav-badge warning">${lowStockCount} Low</span>` : ''}
        </a>

        <a href="expiry.html" class="nav-link ${activePage === 'expiry' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>Expiry Tracking</span>
          </div>
          ${expiredCount > 0 ? `<span class="nav-badge danger">${expiredCount} Exp</span>` : ''}
        </a>

        <div class="nav-section-title">Stakeholders</div>

        <a href="customers.html" class="nav-link ${activePage === 'customers' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-users"></i>
            <span>Customers</span>
          </div>
        </a>

        <a href="suppliers.html" class="nav-link ${activePage === 'suppliers' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-building-wheat"></i>
            <span>Suppliers</span>
          </div>
        </a>

        <div class="nav-section-title">Analytics & Administration</div>

        <a href="reports.html" class="nav-link ${activePage === 'reports' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-file-invoice-dollar"></i>
            <span>Reports & Exports</span>
          </div>
        </a>

        <a href="users.html" class="nav-link ${activePage === 'users' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-user-shield"></i>
            <span>User Management</span>
          </div>
        </a>

        <a href="settings.html" class="nav-link ${activePage === 'settings' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-sliders"></i>
            <span>Store Settings</span>
          </div>
        </a>

        <a href="backend-explorer.html" class="nav-link ${activePage === 'backend' ? 'active' : ''}">
          <div class="nav-link-content">
            <i class="fa-solid fa-database"></i>
            <span>Java & MySQL Code</span>
          </div>
          <span class="nav-badge success">JDBC</span>
        </a>
      </div>

      <div class="sidebar-footer">
        <div class="quick-action-box">
          <p><i class="fa-solid fa-receipt me-1"></i> Quick POS Counter</p>
          <a href="sales.html" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> New Bill</a>
        </div>
      </div>
    `;

    document.getElementById('sidebar-close-trigger')?.addEventListener('click', () => {
      sidebarEl.classList.remove('mobile-open');
    });
  }

  // Top Header rendering
  const headerEl = document.getElementById('app-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="header-left">
        <button class="mobile-menu-toggle" id="mobile-sidebar-toggle" aria-label="Toggle Navigation">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="header-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="global-search-input" placeholder="Search medicines, batches, customers or bills..." autocomplete="off">
        </div>
      </div>

      <div class="header-right">
        <div class="store-status-indicator">
          <div class="status-pulse"></div>
          <span>MedCare Active (MySQL JDBC)</span>
        </div>

        <!-- Notifications Dropdown -->
        <div class="notification-dropdown-wrapper">
          <button class="icon-btn" id="notif-toggle-btn" title="Alerts & Notifications">
            <i class="fa-regular fa-bell"></i>
            ${(lowStockCount + expiredCount) > 0 ? '<div class="badge-dot"></div>' : ''}
          </button>
          <div class="notifications-menu" id="notifications-dropdown">
            <div class="notifications-header">
              <h4>System Alerts (${lowStockCount + expiredCount})</h4>
              <span class="text-xs text-slate-400">Live inventory feed</span>
            </div>
            <div class="notifications-list">
              ${lowStockCount > 0 ? `
                <a href="inventory.html" class="notification-item warning">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <div class="notification-text">
                    <p>${lowStockCount} Medicines Below Minimum Stock</p>
                    <span>Restock needed from suppliers</span>
                  </div>
                </a>
              ` : ''}
              ${expiredCount > 0 ? `
                <a href="expiry.html" class="notification-item danger">
                  <i class="fa-solid fa-ban"></i>
                  <div class="notification-text">
                    <p>${expiredCount} Expired Batches Quarantined</p>
                    <span>Remove from dispensing racks</span>
                  </div>
                </a>
              ` : ''}
              <a href="sales.html" class="notification-item info">
                <i class="fa-solid fa-circle-check"></i>
                <div class="notification-text">
                  <p>Store POS Terminal Ready</p>
                  <span>Connected to JDBC Transaction Pool</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- User Profile Dropdown -->
        <div class="user-profile-wrapper">
          <button class="user-profile-btn" id="user-profile-toggle">
            <div class="user-avatar text-white font-bold text-xs select-none" style="background: linear-gradient(135deg, #0284c7, #0d9488); border-radius: 8px; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center;">${userInitials}</div>
            <div class="user-info-text">
              <div class="user-name">${user.name}</div>
              <div class="user-role-badge">${user.role}</div>
            </div>
            <i class="fa-solid fa-chevron-down text-xs text-slate-400 ms-1"></i>
          </button>
          <div class="profile-menu" id="profile-dropdown">
            <div class="px-4 py-2 border-b border-slate-100">
              <p class="text-xs text-slate-400">Signed in as</p>
              <p class="font-bold text-slate-800 text-sm">${user.email}</p>
            </div>
            <a href="settings.html" class="profile-menu-item">
              <i class="fa-solid fa-user-gear"></i> Account Settings
            </a>
            <a href="backend-explorer.html" class="profile-menu-item">
              <i class="fa-solid fa-code"></i> Java Backend Docs
            </a>
            <div class="profile-menu-divider"></div>
            <button class="profile-menu-item text-danger-600 w-full text-left" id="logout-button">
              <i class="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>
      </div>
    `;

    // Dropdown toggles
    const notifBtn = document.getElementById('notif-toggle-btn');
    const notifMenu = document.getElementById('notifications-dropdown');
    notifBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      notifMenu?.classList.toggle('show');
      profileMenu?.classList.remove('show');
    });

    const profileBtn = document.getElementById('user-profile-toggle');
    const profileMenu = document.getElementById('profile-dropdown');
    profileBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu?.classList.toggle('show');
      notifMenu?.classList.remove('show');
    });

    document.addEventListener('click', () => {
      notifMenu?.classList.remove('show');
      profileMenu?.classList.remove('show');
    });

    document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', () => {
      document.getElementById('app-sidebar')?.classList.toggle('mobile-open');
    });

    document.getElementById('logout-button')?.addEventListener('click', () => {
      MedCareAuth.logout();
    });

    // Global quick search listener
    document.getElementById('global-search-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          window.location.href = `medicines.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

// Global initialization on DOM ready
// Protected pages: all admin/staff pages require an authenticated session.
// Public pages (index.html, login.html) are explicitly excluded.
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isPublicPage = path.includes('index.html') ||
                       path.includes('login.html') ||
                       path === '/' ||
                       path.endsWith('/');
  if (!isPublicPage) {
    const user = MedCareAuth.requireAuth();
    if (user) {
      // Render the sidebar/header shell for authenticated pages
      // (renderAppShell is called by each page's own JS — this is a safety no-op)
    }
  }
});
