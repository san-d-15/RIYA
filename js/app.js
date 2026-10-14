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

function localDateKey(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

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
      return true;
    } catch (e) {
      console.error("Storage save failed", e);
      return false;
    }
  }

  resetToDefault() {
    if (!MedCareAuth.authorize('admin')) return false;
    const previous = this.data;
    this.data = JSON.parse(JSON.stringify(INITIAL_DATABASE));
    if (!this.saveData(this.data)) {
      this.data = previous;
      return false;
    }
    return true;
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
    if (!MedCareAuth.authorize('medicine.write')) return null;
    const previous = this.data.medicines;
    const medicine = {
      ...med,
      id: Date.now(),
      purchasePrice: parseFloat(med.purchasePrice) || 0,
      sellingPrice: parseFloat(med.sellingPrice) || 0,
      quantity: parseInt(med.quantity, 10) || 0,
      minStockLevel: parseInt(med.minStockLevel, 10) || 10
    };
    this.data.medicines = [medicine, ...previous];
    if (!this.saveData()) {
      this.data.medicines = previous;
      return null;
    }
    return medicine;
  }

  updateMedicine(id, updatedFields) {
    if (!MedCareAuth.authorize('medicine.write')) return null;
    const idx = this.data.medicines.findIndex(m => m.id === parseInt(id, 10));
    if (idx === -1) return null;
    const previous = this.data.medicines;
    const medicine = { ...previous[idx], ...updatedFields };
    this.data.medicines = previous.map((current, index) => index === idx ? medicine : current);
    if (!this.saveData()) {
      this.data.medicines = previous;
      return null;
    }
    return medicine;
  }

  deleteMedicine(id) {
    if (!MedCareAuth.authorize('medicine.write')) return false;
    const previous = this.data.medicines;
    const medicines = previous.filter(m => m.id !== parseInt(id, 10));
    if (medicines.length === previous.length) return false;
    this.data.medicines = medicines;
    if (!this.saveData()) {
      this.data.medicines = previous;
      return false;
    }
    return true;
  }

  // Category Management
  addCategory(category) {
    if (!MedCareAuth.authorize('catalog.write')) return null;
    const previous = this.data.categories;
    const newCategory = { ...category, id: Date.now() };
    this.data.categories = [...previous, newCategory];
    if (!this.saveData()) {
      this.data.categories = previous;
      return null;
    }
    return newCategory;
  }

  updateCategory(id, updated) {
    if (!MedCareAuth.authorize('catalog.write')) return null;
    const idx = this.data.categories.findIndex(c => c.id === parseInt(id, 10));
    if (idx === -1) return null;
    const previous = this.data.categories;
    const category = { ...previous[idx], ...updated };
    this.data.categories = previous.map((current, index) => index === idx ? category : current);
    if (!this.saveData()) {
      this.data.categories = previous;
      return null;
    }
    return category;
  }

  deleteCategory(id) {
    if (!MedCareAuth.authorize('catalog.write')) return false;
    const previous = this.data.categories;
    const categories = previous.filter(c => c.id !== parseInt(id, 10));
    if (categories.length === previous.length) return false;
    this.data.categories = categories;
    if (!this.saveData()) {
      this.data.categories = previous;
      return false;
    }
    return true;
  }

  // Supplier Management
  addSupplier(supplier) {
    if (!MedCareAuth.authorize('procurement.write')) return null;
    const previous = this.data.suppliers;
    const newSupplier = { ...supplier, id: Date.now() };
    this.data.suppliers = [...previous, newSupplier];
    if (!this.saveData()) {
      this.data.suppliers = previous;
      return null;
    }
    return newSupplier;
  }

  updateSupplier(id, updated) {
    if (!MedCareAuth.authorize('procurement.write')) return null;
    const idx = this.data.suppliers.findIndex(s => s.id === parseInt(id, 10));
    if (idx === -1) return null;
    const previous = this.data.suppliers;
    const supplier = { ...previous[idx], ...updated };
    this.data.suppliers = previous.map((current, index) => index === idx ? supplier : current);
    if (!this.saveData()) {
      this.data.suppliers = previous;
      return null;
    }
    return supplier;
  }

  deleteSupplier(id) {
    if (!MedCareAuth.authorize('procurement.write')) return false;
    const previous = this.data.suppliers;
    const suppliers = previous.filter(s => s.id !== parseInt(id, 10));
    if (suppliers.length === previous.length) return false;
    this.data.suppliers = suppliers;
    if (!this.saveData()) {
      this.data.suppliers = previous;
      return false;
    }
    return true;
  }

  // Customer Management
  addCustomer(customer) {
    if (!MedCareAuth.authorize('customer.write')) return null;
    const previous = this.data.customers;
    const newCustomer = {
      ...customer,
      id: Date.now(),
      purchaseHistoryCount: 0,
      totalSpent: 0
    };
    this.data.customers = [...previous, newCustomer];
    if (!this.saveData()) {
      this.data.customers = previous;
      return null;
    }
    return newCustomer;
  }

  updateCustomer(id, updated) {
    if (!MedCareAuth.authorize('customer.write')) return null;
    const idx = this.data.customers.findIndex(c => c.id === parseInt(id, 10));
    if (idx === -1) return null;
    const previous = this.data.customers;
    const customer = { ...previous[idx], ...updated };
    this.data.customers = previous.map((current, index) => index === idx ? customer : current);
    if (!this.saveData()) {
      this.data.customers = previous;
      return null;
    }
    return customer;
  }

  deleteCustomer(id) {
    if (!MedCareAuth.authorize('customer.write')) return false;
    const previous = this.data.customers;
    const customers = previous.filter(c => c.id !== parseInt(id, 10));
    if (customers.length === previous.length) return false;
    this.data.customers = customers;
    if (!this.saveData()) {
      this.data.customers = previous;
      return false;
    }
    return true;
  }

  // Sales & POS Billing (Deducts stock automatically in DB)
  recordSale(saleData) {
    if (!MedCareAuth.authorize('sale.write')) return null;
    if (!Array.isArray(saleData.items) || saleData.items.length === 0) {
      MedCareUI.showToast('Sale rejected: add at least one medicine to the bill.', 'danger');
      return null;
    }
    const discountPercent = Number(saleData.discountPercent ?? 0);
    if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
      MedCareUI.showToast('Sale rejected: discount must be between 0 and 100%.', 'danger');
      return null;
    }
    const invalidItem = saleData.items.find(item => {
      const med = this.data.medicines.find(candidate => candidate.id === parseInt(item.medicineId, 10));
      const quantity = Number(item.quantity);
      return !med || !Number.isInteger(quantity) || quantity <= 0 ||
        parseInt(item.quantity, 10) > med.quantity ||
        MedCareUI.calculateExpiryDays(med.expiryDate) <= 0;
    });
    if (invalidItem) {
      MedCareUI.showToast('Sale rejected: a medicine is missing, expired, or has insufficient stock.', 'danger');
      return null;
    }
    const snapshot = JSON.stringify(this.data);
    const saleId = Date.now();
    const invCount = this.data.sales.length + 504;
    const invoiceNumber = `${this.data.settings.invoicePrefix || 'MED-2026-'}${String(invCount).padStart(5, '0')}`;
    
    const newSale = {
      id: saleId,
      invoiceNumber: invoiceNumber,
      date: localDateKey(),
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
    if (!this.saveData()) {
      this.data = JSON.parse(snapshot);
      MedCareUI.showToast('Sale could not be saved to browser storage; stock was not changed.', 'danger');
      return null;
    }
    return newSale;
  }

  // Purchase Module (Increases stock automatically in DB)
  recordPurchase(purchaseData) {
    if (!MedCareAuth.authorize('purchase.write')) return null;
    const items = purchaseData.items;
    if (!Array.isArray(items) || items.length === 0) {
      MedCareUI.showToast('Purchase rejected: add at least one valid purchase item.', 'danger');
      return null;
    }
    const item = items[0];
    const medicine = item && this.data.medicines.find(candidate => candidate.id === parseInt(item.medicineId, 10));
    const supplier = this.data.suppliers.find(candidate => candidate.id === parseInt(purchaseData.supplierId, 10));
    const invalidItem = items.find(purchaseItem => {
      const itemMedicine = this.data.medicines.find(candidate => candidate.id === parseInt(purchaseItem.medicineId, 10));
      return !itemMedicine || !Number.isInteger(Number(purchaseItem.quantity)) ||
        Number(purchaseItem.quantity) <= 0 || !Number.isFinite(Number(purchaseItem.purchasePrice)) ||
        Number(purchaseItem.purchasePrice) < 0;
    });
    if (!medicine || !supplier || invalidItem) {
      MedCareUI.showToast('Purchase rejected: verify the supplier, medicine, quantity, and price.', 'danger');
      return null;
    }
    const snapshot = JSON.stringify(this.data);
    const purchaseId = Date.now();
    const newPurchase = {
      id: purchaseId,
      date: localDateKey(),
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
    if (!this.saveData()) {
      this.data = JSON.parse(snapshot);
      MedCareUI.showToast('Purchase could not be saved to browser storage; stock was not changed.', 'danger');
      return null;
    }
    return newPurchase;
  }

  // User Management
  addUser(user) {
    if (!MedCareAuth.authorize('user.write')) return null;
    const previousUsers = this.data.users;
    user.id = Date.now();
    user.createdAt = new Date().toISOString().split('T')[0];
    this.data.users = [...previousUsers, user];
    if (!this.saveData()) {
      this.data.users = previousUsers;
      return null;
    }
    return user;
  }

  updateUser(id, updated) {
    if (!MedCareAuth.authorize('user.write')) return null;
    const idx = this.data.users.findIndex(u => u.id === parseInt(id, 10));
    if (idx !== -1) {
      const previous = this.data.users[idx];
      this.data.users[idx] = { ...previous, ...updated };
      if (!this.saveData()) {
        this.data.users[idx] = previous;
        return null;
      }
      return this.data.users[idx];
    }
    return null;
  }

  deleteUser(id) {
    if (!MedCareAuth.authorize('user.write')) return false;
    const previous = this.data.users;
    const users = previous.filter(u => u.id !== parseInt(id, 10));
    if (users.length === previous.length) return false;
    this.data.users = users;
    if (!this.saveData()) {
      this.data.users = previous;
      return false;
    }
    return true;
  }

  updateSettings(newSettings) {
    if (!MedCareAuth.authorize('settings.write')) return null;
    const previous = this.data.settings;
    this.data.settings = { ...this.data.settings, ...newSettings };
    if (!this.saveData()) {
      this.data.settings = previous;
      return null;
    }
    return this.data.settings;
  }

  quarantineExpiredMedicine(id) {
    if (!MedCareAuth.authorize('expiry.write')) return null;
    const medicine = this.data.medicines.find(candidate => candidate.id === parseInt(id, 10));
    if (!medicine || MedCareUI.calculateExpiryDays(medicine.expiryDate) > 0 ||
        medicine.quarantineStatus === 'Quarantined' || medicine.quantity <= 0) return null;

    const originalQuantity = medicine.quantity;
    medicine.quantity = 0;
    medicine.quarantinedQuantity = (medicine.quarantinedQuantity || 0) + originalQuantity;
    medicine.quarantineStatus = 'Quarantined';
    medicine.quarantinedAt = new Date().toISOString();
    this.data.expiryActions = this.data.expiryActions || [];
    this.data.expiryActions.unshift({
      id: Date.now(),
      medicineId: medicine.id,
      batchNumber: medicine.batchNumber,
      quantity: originalQuantity,
      action: 'quarantine',
      date: medicine.quarantinedAt,
      userId: MedCareAuth.getCurrentUser()?.id
    });
    if (!this.saveData()) {
      medicine.quantity = originalQuantity;
      medicine.quarantinedQuantity -= originalQuantity;
      delete medicine.quarantineStatus;
      delete medicine.quarantinedAt;
      this.data.expiryActions.shift();
      return null;
    }
    return medicine;
  }

  setUserPassword(id, passwordHash, demoUpgrade = false) {
    const currentUser = MedCareAuth.getCurrentUser();
    if (!currentUser || (String(currentUser.id) !== String(id) &&
        !MedCareAuth.authorize('user.write'))) return null;
    const user = this.data.users.find(candidate => String(candidate.id) === String(id));
    if (!user) return null;
    const previousHash = user.passwordHash;
    const previousChangedState = user.demoPasswordChanged;
    user.passwordHash = passwordHash;
    if (!demoUpgrade) user.demoPasswordChanged = true;
    if (!this.saveData()) {
      if (previousHash) user.passwordHash = previousHash;
      else delete user.passwordHash;
      if (previousChangedState === undefined) delete user.demoPasswordChanged;
      else user.demoPasswordChanged = previousChangedState;
      return null;
    }
    return user;
  }
}

// Global DB Instance
window.MedCareDB = new MedCareDataStore();

// ==========================================================================
// Authentication & Session Management
// ==========================================================================
const LOCAL_DEMO_ACCOUNTS = [
  { username: 'admin', email: 'admin@medcare.com', role: 'Admin', password: 'admin123' },
  { username: 'pharmacist', email: 'pharmacist@medcare.com', role: 'Pharmacist', password: 'pharm123' },
  { username: 'cashier', email: 'cashier@medcare.com', role: 'Cashier', password: 'cash123' }
];

const ROLE_PERMISSIONS = {
  Admin: ['*'],
  Pharmacist: [
    'page.dashboard', 'page.medicines', 'page.inventory', 'page.sales',
    'page.purchases', 'page.expiry', 'page.reports', 'page.customers',
    'page.suppliers', 'page.categories', 'page.settings', 'medicine.write', 'catalog.write',
    'procurement.write', 'customer.write', 'sale.write', 'purchase.write',
    'expiry.write'
  ],
  Cashier: ['page.dashboard', 'page.sales', 'page.customers', 'page.settings', 'sale.write', 'customer.write']
};

const PAGE_PERMISSIONS = {
  dashboard: 'page.dashboard',
  medicines: 'page.medicines',
  inventory: 'page.inventory',
  sales: 'page.sales',
  purchases: 'page.purchases',
  expiry: 'page.expiry',
  reports: 'page.reports',
  customers: 'page.customers',
  suppliers: 'page.suppliers',
  categories: 'page.categories',
  users: 'page.users',
  settings: 'page.settings',
  backend: 'page.backend'
};

const PASSWORD_HASH_ITERATIONS = 210000;
const PASSWORD_HASH_PREFIX = 'pbkdf2-sha256';

function bytesToHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex) {
  if (typeof hex !== 'string' || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return null;
  return new Uint8Array(hex.match(/.{2}/g).map(byte => parseInt(byte, 16)));
}

async function derivePasswordHash(password, salt) {
  if (!window.crypto?.subtle || !window.crypto.getRandomValues) {
    throw new Error('Secure password hashing is unavailable in this browser context.');
  }
  const key = await window.crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await window.crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt,
    iterations: PASSWORD_HASH_ITERATIONS
  }, key, 256);
  return `${PASSWORD_HASH_PREFIX}$${PASSWORD_HASH_ITERATIONS}$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(bits))}`;
}

async function hashPassword(password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  return derivePasswordHash(password, salt);
}

async function verifyPasswordHash(password, encoded) {
  if (typeof password !== 'string' || typeof encoded !== 'string') return false;
  const [algorithm, iterationsText, saltHex, hashHex] = encoded.split('$');
  const iterations = Number(iterationsText);
  const salt = hexToBytes(saltHex);
  const expected = hexToBytes(hashHex);
  if (algorithm !== PASSWORD_HASH_PREFIX || !Number.isInteger(iterations) ||
      iterations < 100000 || iterations > 1000000 || !salt || !expected || expected.length !== 32 ||
      !window.crypto?.subtle) return false;

  const key = await window.crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = new Uint8Array(await window.crypto.subtle.deriveBits({
    name: 'PBKDF2', hash: 'SHA-256', salt, iterations
  }, key, 256));
  let difference = 0;
  for (let index = 0; index < expected.length; index++) difference |= expected[index] ^ bits[index];
  return difference === 0;
}

const MedCareAuth = {
  sessionKey: 'medcare_auth_session_user',

  isLocalDevelopment() {
    return ['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname);
  },

  getDemoCredentials(role) {
    if (!this.isLocalDevelopment()) return null;
    const roleName = typeof role === 'string' ? role.toLowerCase() : '';
    const account = LOCAL_DEMO_ACCOUNTS.find(candidate => candidate.role.toLowerCase() === roleName);
    const user = account && window.MedCareDB.getUsers().find(candidate =>
      candidate.username?.toLowerCase() === account.username &&
      candidate.email?.toLowerCase() === account.email &&
      candidate.role === account.role &&
      candidate.status !== 'Suspended'
    );
    return user && !user.demoPasswordChanged
      ? { identifier: account.email, password: account.password }
      : null;
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(this.sessionKey);
      if (!raw) return null;

      const sessionUser = JSON.parse(raw);
      const user = window.MedCareDB.getUsers().find(candidate =>
        candidate.id != null && String(candidate.id) === String(sessionUser?.id)
      );
      if (user && user.status !== 'Suspended') return user;

      localStorage.removeItem(this.sessionKey);
    } catch (error) {
      console.error('Unable to read the MedCare authentication session.', error);
    }
    return null;
  },

  setCurrentUser(user) {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  },

  async login(identifier, password) {
    if (!this.isLocalDevelopment()) {
      return {
        success: false,
        message: 'Demo sign-in is available only on a local development server.'
      };
    }
    if (typeof identifier !== 'string' || typeof password !== 'string' || !password) {
      return { success: false, message: 'Invalid username/email or password.' };
    }

    const users = window.MedCareDB.getUsers();
    const idClean = typeof identifier === 'string' ? identifier.trim().toLowerCase() : '';
    const user = users.find(candidate =>
      candidate.status !== 'Suspended' &&
      ((typeof candidate.username === 'string' && candidate.username.toLowerCase() === idClean) ||
       (typeof candidate.email === 'string' && candidate.email.toLowerCase() === idClean))
    );
    const configuredAccount = user && LOCAL_DEMO_ACCOUNTS.find(account =>
      account.username === user.username?.toLowerCase() &&
      account.email === user.email?.toLowerCase() &&
      account.role === user.role
    );

    if (!user) {
      return { success: false, message: 'Invalid username/email or password.' };
    }

    const passwordValid = user.passwordHash
      ? await verifyPasswordHash(password, user.passwordHash)
      : Boolean(configuredAccount && configuredAccount.password === password);
    if (!passwordValid) {
      return { success: false, message: 'Invalid username/email or password.' };
    }

    this.setCurrentUser({ id: user.id });
    if (!user.passwordHash && configuredAccount) {
      const upgradedHash = await hashPassword(password);
      if (!window.MedCareDB.setUserPassword(user.id, upgradedHash, true)) {
        localStorage.removeItem(this.sessionKey);
        return { success: false, message: 'Unable to save credentials. Check browser storage and try again.' };
      }
    }
    return { success: true, user };
  },

  async changePassword(userId, currentPassword, newPassword) {
    const user = window.MedCareDB.getUsers().find(candidate => String(candidate.id) === String(userId));
    if (!user || typeof currentPassword !== 'string' || !currentPassword ||
        typeof newPassword !== 'string' || newPassword.length < 8) return false;

    let currentValid = user.passwordHash
      ? await verifyPasswordHash(currentPassword, user.passwordHash)
      : LOCAL_DEMO_ACCOUNTS.some(account =>
        account.username === user.username?.toLowerCase() &&
        account.email === user.email?.toLowerCase() &&
        account.role === user.role &&
        account.password === currentPassword
      );
    if (!currentValid) return false;

    const passwordHash = await hashPassword(newPassword);
    return Boolean(window.MedCareDB.setUserPassword(userId, passwordHash));
  },

  async createUser(userData, password) {
    if (!this.authorize('user.write')) return null;
    if (typeof password !== 'string' || password.length < 8) {
      throw new Error('Initial password must be at least 8 characters.');
    }
    const duplicate = window.MedCareDB.getUsers().some(user =>
      user.username?.toLowerCase() === userData.username.toLowerCase() ||
      user.email?.toLowerCase() === userData.email.toLowerCase()
    );
    if (duplicate) throw new Error('That username or email is already in use.');
    const passwordHash = await hashPassword(password);
    return window.MedCareDB.addUser({ ...userData, passwordHash });
  },

  logout() {
    localStorage.removeItem(this.sessionKey);
    window.location.href = 'login.html';
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user && !window.location.pathname.includes('login.html')) {
      document.documentElement.style.visibility = 'hidden';
      window.location.replace('login.html');
    }
    return user;
  },

  hasRole(...roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  },

  can(permission) {
    const user = this.getCurrentUser();
    const permissions = user && ROLE_PERMISSIONS[user.role];
    return Boolean(permissions && (permissions.includes('*') || permissions.includes(permission)));
  },

  authorize(permission) {
    if (this.can(permission)) return true;
    MedCareUI.showToast('You are not authorized to perform this action.', 'danger');
    return false;
  },

  canAccessPage(page) {
    const permission = PAGE_PERMISSIONS[page];
    return Boolean(permission && this.can(permission));
  },

  requirePageAccess() {
    const page = window.location.pathname.split('/').pop().replace(/\.html$/, '');
    if (PAGE_PERMISSIONS[page] && !this.canAccessPage(page)) {
      document.documentElement.style.visibility = 'hidden';
      window.location.replace('dashboard.html?accessDenied=1');
      return false;
    }
    return true;
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
  if (!user) {
    return null;
  }
  if (!MedCareAuth.requirePageAccess()) return null;

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

      </div>

      <div class="sidebar-footer">
        <div class="quick-action-box">
          <p><i class="fa-solid fa-receipt me-1"></i> Quick POS Counter</p>
          <a href="sales.html" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> New Bill</a>
        </div>
      </div>
    `;

    sidebarEl.querySelectorAll('.nav-link[href]').forEach(link => {
      const page = link.getAttribute('href').replace(/\.html$/, '');
      if (!MedCareAuth.canAccessPage(page)) link.remove();
    });
    sidebarEl.querySelectorAll('.nav-section-title').forEach(section => {
      let next = section.nextElementSibling;
      let hasVisibleLink = false;
      while (next && !next.classList.contains('nav-section-title')) {
        if (next.classList.contains('nav-link')) hasVisibleLink = true;
        next = next.nextElementSibling;
      }
      if (!hasVisibleLink) section.remove();
    });

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
          <span>MedCare Active (Browser Data)</span>
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
                    <p>${expiredCount} Batches Past Expiry</p>
                    <span>Remove from dispensing racks</span>
                  </div>
                </a>
              ` : ''}
              <a href="sales.html" class="notification-item info">
                <i class="fa-solid fa-circle-check"></i>
                <div class="notification-text">
                  <p>Store POS Terminal Ready</p>
                  <span>Uses this browser's local demo data</span>
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
      MedCareAuth.requirePageAccess();
    }
  }
});
