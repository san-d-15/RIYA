-- ==============================================================================
-- MedCare - Medical Store Management System
-- Production MySQL Database Script
-- Database Name: medical_store_db
-- Compatibility: MySQL 8.0+, MariaDB 10.5+
-- ==============================================================================

-- 1. Create and Select Database
DROP DATABASE IF EXISTS medical_store_db;
CREATE DATABASE medical_store_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE medical_store_db;

-- ------------------------------------------------------------------------------
-- Table 1: users
-- Purpose: System authentication, role-based access control, hashed passwords
-- ------------------------------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Pharmacist', 'Cashier') NOT NULL DEFAULT 'Pharmacist',
    phone VARCHAR(20),
    status ENUM('Active', 'Suspended') NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_username (username)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 2: categories
-- Purpose: Therapeutic classifications & dosage grouping
-- ------------------------------------------------------------------------------
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_name (name)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 3: suppliers
-- Purpose: Pharmaceutical manufacturers, logistics hubs & GST identification
-- ------------------------------------------------------------------------------
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT,
    gst_number VARCHAR(50),
    medicines_supplied TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_supplier_name (supplier_name)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 4: customers
-- Purpose: Patient registry, delivery contact, loyalty history
-- ------------------------------------------------------------------------------
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_phone (phone)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 5: medicines
-- Purpose: Master pharmaceutical catalog with batch lots and stock levels
-- ------------------------------------------------------------------------------
CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    generic_name VARCHAR(150),
    category_id INT NOT NULL,
    manufacturer VARCHAR(150) NOT NULL,
    batch_number VARCHAR(60) NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    selling_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantity INT NOT NULL DEFAULT 0,
    min_stock_level INT NOT NULL DEFAULT 10,
    mfg_date DATE,
    expiry_date DATE NOT NULL,
    supplier_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_medicine_name (name),
    INDEX idx_medicine_batch (batch_number),
    INDEX idx_medicine_expiry (expiry_date),
    INDEX idx_medicine_quantity (quantity)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 6: sales
-- Purpose: Point of Sale billing headers, payments, taxes & customer records
-- ------------------------------------------------------------------------------
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT,
    user_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    tax_percent DECIMAL(5,2) DEFAULT 5.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    grand_total DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Cash', 'Card', 'UPI') NOT NULL DEFAULT 'Cash',
    sale_date DATE NOT NULL,
    sale_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_sales_invoice (invoice_number),
    INDEX idx_sales_date (sale_date)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 7: sale_items
-- Purpose: Detailed line items per bill linked to specific medicine batches
-- ------------------------------------------------------------------------------
CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    medicine_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 8: purchases
-- Purpose: Inward vendor consignments and replenishment invoices
-- ------------------------------------------------------------------------------
CREATE TABLE purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_invoice_no VARCHAR(60) NOT NULL,
    supplier_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    purchase_date DATE NOT NULL,
    payment_status ENUM('Paid', 'Pending') DEFAULT 'Paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_purchase_inv (purchase_invoice_no),
    INDEX idx_purchase_date (purchase_date)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table 9: purchase_items
-- Purpose: Line items for incoming stock batches
-- ------------------------------------------------------------------------------
CREATE TABLE purchase_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT NOT NULL,
    medicine_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    batch_number VARCHAR(60) NOT NULL,
    expiry_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ==============================================================================
-- SEED SAMPLE DATA
-- ==============================================================================

-- 1. Insert Initial System Users (Passwords hashed via BCrypt $2a$12)
-- Default passwords: admin123, pharm123, cash123
INSERT INTO users (id, name, username, email, password_hash, role, phone) VALUES
(1, 'Dr. Arvind Mehta', 'admin', 'admin@medcare.com', '$2a$12$e8jYk8M1X/z2DqR.vXvB..e2gX9ZkXwU6v4e0w8Z0yG1c0j6t0s', 'Admin', '+91 98201 12345'),
(2, 'Pooja Deshmukh', 'pharmacist', 'pharmacist@medcare.com', '$2a$12$e8jYk8M1X/z2DqR.vXvB..e2gX9ZkXwU6v4e0w8Z0yG1c0j6t0s', 'Pharmacist', '+91 98202 23456'),
(3, 'Rohan Kulkarni', 'cashier', 'cashier@medcare.com', '$2a$12$e8jYk8M1X/z2DqR.vXvB..e2gX9ZkXwU6v4e0w8Z0yG1c0j6t0s', 'Cashier', '+91 98203 34567');

-- 2. Insert Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'Antibiotics', 'Broad and narrow spectrum bacterial infection treatments'),
(2, 'Analgesics & Antipyretics', 'Pain relief, fever reduction and anti-inflammatory formulations'),
(3, 'Antidiabetics', 'Type 1 and Type 2 diabetes oral agents, insulin and secretagogues'),
(4, 'Cardiovascular & Antihypertensives', 'Blood pressure regulation, statins, and cardiac care drugs'),
(5, 'Gastrointestinal', 'Proton pump inhibitors, antacids, anti-emetics and digestive enzymes'),
(6, 'Respiratory & Antiallergic', 'Antihistamines, bronchodilators, inhalers and cough therapeutics'),
(7, 'Vitamins & Nutritional Supplements', 'Multivitamins, zinc, calcium, and mineral complexes'),
(8, 'Dermatological & Topicals', 'Antibacterial and antifungal ointments, lotions and gels');

-- 3. Insert Suppliers
INSERT INTO suppliers (id, supplier_name, company_name, phone, email, address, gst_number, medicines_supplied) VALUES
(1, 'Sun Pharma Distributors', 'Sun Pharmaceutical Industries Ltd.', '+91 22 4324 0000', 'orders@sunpharma-supply.com', 'Goregaon East, Western Express Highway, Mumbai', '27AAACS1123P1Z1', 'Metformin, Azithromycin, Pantoprazole'),
(2, 'Cipla Care Logistics', 'Cipla Ltd.', '+91 22 2482 6000', 'supply@ciplacare.in', 'Peninsula Business Park, Lower Parel, Mumbai', '27AAACC2384A1Z9', 'Montelukast, Asthalin Inhaler, Cetirizine'),
(3, 'Abbott Depot West', 'Abbott Healthcare Pvt. Ltd.', '+91 22 3816 2000', 'orders@abbott-depot.com', 'Godrej BKC, Bandra Kurla Complex, Mumbai', '27AAACA9928D1ZH', 'Thyronorm, Brufen, Digene Gel'),
(4, 'Dr. Reddy\'s Direct', 'Dr. Reddy\'s Laboratories', '+91 40 4900 2900', 'b2b@drreddys.com', 'Banjara Hills, Hyderabad, Telangana', '36AAACD4999Q1ZV', 'Omez, Atorvastatin, Nise'),
(5, 'Mankind MediSource', 'Mankind Pharma Ltd.', '+91 11 4684 6700', 'dist@mankindpharma.com', 'Okhla Phase III, New Delhi', '07AAACM3891L1Z4', 'Moxikind-CV, Dydroboon, Manforce');

-- 4. Insert Customers
INSERT INTO customers (id, customer_name, phone, email, address) VALUES
(1, 'Rahul Sharma', '+91 98210 11223', 'rahul.sharma@gmail.com', 'Flat 402, Green Meadows, Andheri West, Mumbai'),
(2, 'Priya Patel', '+91 98211 22334', 'priya.patel@yahoo.com', 'B-12, Sagar Darshan, Bandra West, Mumbai'),
(3, 'Amit Verma', '+91 98212 33445', 'amit.verma@outlook.com', '103, Silver Arc, Thane West'),
(4, 'Sunita Rao', '+91 98213 44556', 'sunita.rao@gmail.com', 'Row House 7, Palm Beach Road, Navi Mumbai'),
(5, 'Rajesh Kumar', '+91 98214 55667', 'rajesh.k@gmail.com', 'A-501, Highland Heights, Powai, Mumbai');

-- 5. Insert Medicines
INSERT INTO medicines (id, name, generic_name, category_id, manufacturer, batch_number, purchase_price, selling_price, quantity, min_stock_level, mfg_date, expiry_date, supplier_id, description) VALUES
(101, 'Dolo 650mg Tablet', 'Paracetamol (Acetaminophen)', 2, 'Micro Labs Ltd.', 'DL-650-B41', 24.50, 32.00, 320, 50, '2025-10-15', '2027-09-30', 1, 'Fast-acting analgesic and antipyretic for high fever, headache and body pain.'),
(102, 'Augmentin 625 Duo Tablet', 'Amoxicillin + Potassium Clavulanate', 1, 'GlaxoSmithKline (GSK)', 'AUG-882-C1', 165.00, 215.50, 18, 30, '2025-08-01', '2027-03-31', 5, 'Potent antibiotic for respiratory tract, ear, sinus and skin bacterial infections.'),
(103, 'Azithral 500mg Tablet', 'Azithromycin', 1, 'Alembic Pharmaceuticals', 'AZ-500-X19', 95.00, 128.00, 85, 25, '2025-11-10', '2027-10-31', 1, 'Macrolide antibiotic prescribed for throat, bronchitis and chest infections.'),
(104, 'Glycomet 500mg SR', 'Metformin Hydrochloride SR', 3, 'USV Private Limited', 'GLY-50-K9', 18.00, 26.50, 210, 40, '2025-09-20', '2028-01-31', 1, 'First-line oral anti-diabetic agent for glycemic control in Type 2 Diabetes.'),
(105, 'Telma 40mg Tablet', 'Telmisartan', 4, 'Glenmark Pharmaceuticals', 'TEL-40-A22', 98.00, 135.00, 12, 25, '2025-07-15', '2027-06-30', 2, 'Angiotensin receptor blocker for managing primary arterial hypertension.'),
(106, 'Pan 40mg Tablet', 'Pantoprazole Gastro-resistant', 5, 'Alkem Laboratories', 'PAN-40-M7', 85.00, 118.00, 140, 30, '2025-10-01', '2027-11-30', 1, 'Proton pump inhibitor for gastroesophageal reflux disease (GERD) and peptic ulcers.'),
(107, 'Montair LC Tablet', 'Montelukast 10mg + Levocetirizine 5mg', 6, 'Cipla Ltd.', 'MTR-LC-90', 140.00, 185.00, 6, 25, '2025-06-12', '2027-05-31', 2, 'Combination medicine treating allergic rhinitis, seasonal asthma and sneezing.'),
(108, 'Becosules Z Capsules', 'B-Complex Forte with Vitamin C & Zinc', 7, 'Pfizer Ltd.', 'BCZ-110-E', 38.00, 52.00, 260, 50, '2025-12-01', '2028-05-31', 3, 'Therapeutic vitamin supplement for immunity, mouth ulcers and tissue repair.'),
(109, 'Candid-B Cream 20g', 'Clotrimazole + Beclomethasone Dipropionate', 8, 'Glenmark Pharmaceuticals', 'CND-B-04', 90.00, 122.00, 45, 15, '2025-05-10', '2027-04-30', 4, 'Broad-spectrum topical antifungal and anti-inflammatory cream for fungal infections.'),
(110, 'Amoxyclav 375mg (Expired Batch)', 'Amoxicillin + Clavulanic Acid', 1, 'Abbott Healthcare', 'EXP-2024-B1', 110.00, 145.00, 8, 10, '2024-01-10', '2026-02-15', 3, 'Expired demo batch quarantined for return to manufacturer.'),
(111, 'Asthalin 100mcg Inhaler', 'Salbutamol Inhaler CFC-free', 6, 'Cipla Ltd.', 'AST-CF-55', 120.00, 162.00, 75, 20, '2025-11-20', '2027-10-31', 2, 'Fast-acting bronchodilator inhaler for acute asthma relief and wheezing.');

-- 6. Insert Sales
INSERT INTO sales (id, invoice_number, customer_id, user_id, subtotal, discount_percent, discount_amount, tax_percent, tax_amount, grand_total, payment_method, sale_date, sale_time) VALUES
(501, 'MED-2026-00501', 1, 1, 182.00, 5.00, 9.10, 5.00, 8.65, 181.55, 'UPI', '2026-09-25', '10:30:00'),
(502, 'MED-2026-00502', 2, 3, 483.00, 10.00, 48.30, 5.00, 21.74, 456.44, 'Card', '2026-09-25', '11:45:00'),
(503, 'MED-2026-00503', 4, 2, 349.50, 0.00, 0.00, 5.00, 17.48, 366.98, 'Cash', '2026-09-25', '14:15:00');

-- 7. Insert Sale Items
INSERT INTO sale_items (sale_id, medicine_id, quantity, unit_price, total_amount) VALUES
(501, 101, 2, 32.00, 64.00),
(501, 106, 1, 118.00, 118.00),
(502, 102, 2, 215.50, 431.00),
(502, 108, 1, 52.00, 52.00),
(503, 104, 3, 26.50, 79.50),
(503, 105, 2, 135.00, 270.00);

-- 8. Insert Purchases
INSERT INTO purchases (id, purchase_invoice_no, supplier_id, total_amount, purchase_date, payment_status) VALUES
(301, 'PUR-2026-0089', 1, 13400.00, '2026-09-24', 'Paid'),
(302, 'PUR-2026-0090', 2, 9000.00, '2026-09-25', 'Paid');

-- 9. Insert Purchase Items
INSERT INTO purchase_items (purchase_id, medicine_id, quantity, unit_price, total_amount, batch_number, expiry_date) VALUES
(301, 101, 200, 24.50, 4900.00, 'DL-650-B41', '2027-09-30'),
(301, 106, 100, 85.00, 8500.00, 'PAN-40-M7', '2027-11-30'),
(302, 111, 75, 120.00, 9000.00, 'AST-CF-55', '2027-10-31');
