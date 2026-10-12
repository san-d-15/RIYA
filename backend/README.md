# MedCare - Medical Store Management System
## Full-Stack Architecture, Java Backend & MySQL Database Documentation

---

### 1. Technology Stack
- **Frontend**: HTML5, Modern CSS3 (Variables, Grid, Flexbox, Print Media Queries), Vanilla JavaScript (Modular ES6+)
- **Backend**: Java 17+ (MVC / DAO Architecture, JDBC Connection Pooling, BCrypt & SHA-256 Hashing)
- **Database**: MySQL 8.0+ / MariaDB (`medical_store_db` with relational constraints, foreign keys, triggers)
- **Design Theme**: Clean White, Medical Blue (`#0284c7`), and Healthcare Emerald (`#059669`)

---

### 2. Complete Project Folder Structure
```
medcare-medical-store/
├── index.html                   # Master entry portal with session auto-routing
├── login.html                   # Healthcare authentication with role presets
├── dashboard.html               # Executive pharmacy dashboard with real-time stats & charts
├── medicines.html               # Medicine catalog with CRUD, multi-filters & pagination
├── categories.html              # Therapeutic category classifications
├── suppliers.html               # Authorized distributor directory & GST details
├── customers.html               # Patient profiles & prescription histories
├── sales.html                   # Point-of-Sale (POS) counter with stock deduction
├── purchases.html               # Stock restocking & supplier purchase orders
├── inventory.html               # Stock threshold tracker & low-stock alerts
├── expiry.html                  # Expiry radar (<30, <60, <90 days) & batch quarantine
├── reports.html                 # Auditable statements, daily sales, CSV export & print
├── users.html                   # User management & role-based access control (RBAC)
├── settings.html                # Pharmacy profile, drug license, GST & password change
├── backend-explorer.html        # Built-in interactive Java & SQL code inspector
├── css/
│   └── style.css                # Polished healthcare UI styling & print layout
├── js/
│   ├── app.js                   # Unified DataStore, session engine & UI helpers
│   ├── dashboard.js             # Metrics computation & Chart.js graph bindings
│   ├── medicines.js             # Medicine CRUD & filtering logic
│   ├── billing.js               # POS cart calculations, tax/discounts & print invoice
│   ├── purchases.js             # Purchase order recording & stock increment
│   ├── inventory.js             # Stock badge management
│   ├── expiry.js                # Shelf-life days calculations & quarantine
│   ├── reports.js               # Multi-report aggregations & CSV generator
│   ├── users.js                 # Operator management & role enforcement
│   └── settings.js              # Store configuration persistence
├── database/
│   └── medical_store_db.sql     # Full MySQL DDL & DML script with seed data
└── backend/
    ├── pom.xml                  # Maven dependency & compiler definitions
    ├── src/main/java/com/medcare/
    │   ├── config/
    │   │   └── DatabaseConnection.java    # JDBC connection manager
    │   ├── model/
    │   │   ├── Medicine.java              # Drug formulation model
    │   │   ├── User.java                  # System operator model
    │   │   ├── Sale.java                  # POS invoice model
    │   │   ├── SaleItem.java              # Invoice line item model
    │   │   ├── Purchase.java              # Supplier procurement model
    │   │   └── Customer.java              # Patient profile model
    │   ├── dao/
    │   │   ├── MedicineDAO.java           # PreparedStatements for medicine table
    │   │   ├── UserDAO.java               # Auth & operator queries
    │   │   └── SaleDAO.java               # Sales & invoice queries
    │   ├── service/
    │   │   ├── BillingService.java        # ACID transaction & auto-stock deduction
    │   │   └── AuthService.java           # Credential validation & session checks
    │   ├── util/
    │   │   ├── PasswordUtil.java          # Cryptographic hashing & verification
    │   │   └── InputValidator.java        # Anti-injection & format validators
    │   └── MainApplication.java          # Java backend startup entry point
    └── README.md                          # This documentation file
```

---

### 3. Default Demo Login Credentials
| Role | Email / Identifier | Password | Access Privileges |
|---|---|---|---|
| **Administrator** | `admin@medcare.com` (or `admin`) | `admin123` | Full access to settings, user management, reports, deletion |
| **Pharmacist** | `pharmacist@medcare.com` (or `pharmacist`) | `pharm123` | Dispensing, medicine catalog, restocking, expiry quarantine |
| **Cashier** | `cashier@medcare.com` (or `cashier`) | `cash123` | POS billing counter, invoice generation, patient search |

---

### 4. How Frontend, Java Backend, and MySQL Communicate
1. **Presentation Layer (Frontend)**:
   - User interacts with the HTML5/CSS3/JavaScript interface (e.g. adding medicines to cart on `sales.html`).
   - The client-side application handles validation, real-time subtotal/GST/discount calculations, and user feedback.
2. **Controller & Business Layer (Java Backend)**:
   - When a sale is confirmed, an HTTP request carries the bill payload to `BillingController`.
   - `BillingService` opens a JDBC connection and initiates an **ACID transaction** (`conn.setAutoCommit(false)`).
   - It validates inventory stock levels before confirming the sale.
3. **Data Access & Persistence Layer (JDBC & MySQL)**:
   - `MedicineDAO` and `SaleDAO` execute parameterized queries (`PreparedStatement`) to prevent SQL injection.
   - The sale header is inserted into `sales`, line items are inserted into `sale_items`, and `medicines.quantity` is decremented in a single atomic batch.
   - If any item has insufficient stock, the transaction calls `conn.rollback()`, ensuring database integrity.
   - Upon successful execution, `conn.commit()` commits the changes, and the client receives the generated invoice.

---

### 5. Step-by-Step Setup & How to Run
#### Step 1: Initialize MySQL Database
```bash
# Log into your MySQL server:
mysql -u root -p

# Execute the database script:
SOURCE database/medical_store_db.sql;

# Verify that tables and sample records are created:
USE medical_store_db;
SHOW TABLES;
SELECT name, quantity, selling_price FROM medicines LIMIT 5;
```

#### Step 2: Compile & Run the Java Backend
```bash
cd backend
mvn clean compile package
java -jar target/medcare-backend.jar
```

#### Step 3: Run the Web Application
Open your browser and navigate to:
- `http://localhost:3000/login.html` or `http://localhost:3000/dashboard.html`
- Use the 1-click role buttons or login credentials above.
