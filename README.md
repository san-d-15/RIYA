# MedCare Pharmacy - Medical Store Management System

A complete, modern, responsive Medical Store Management System featuring POS billing with automatic stock deduction, inventory management, expiry tracking, supplier/customer management, and a complete Java JDBC MySQL backend architecture.

---

## 🚀 Quick Start Guide

### Option 1: Run the Frontend Directly (Any Web Browser)
You do **not** need any complex build tools to use or edit the frontend:
1. Extract the ZIP file.
2. Double-click or open `login.html` (or `index.html`) in any browser (Chrome, Edge, Firefox, Safari).
3. Everything (dashboard, POS billing counter, inventory, reports, printable invoices, interactive charts) works out of the box with the built-in browser data store!

#### Quick Demo Accounts:
- **Administrator**: `admin@medcare.com` / `admin123` (Full System Access)
- **Pharmacist**: `pharmacist@medcare.com` / `pharm123` (POS & Inventory Restock)
- **Cashier**: `cashier@medcare.com` / `cash123` (Billing & Invoices)
*(Or use the 1-click quick login buttons on the login page)*

---

### Option 2: Run with a Local Web Server (Recommended)
If using VS Code:
1. Open the project folder in VS Code.
2. Right-click `index.html` or `login.html` and select **"Open with Live Server"**.

Or using Python:
```bash
# Python 3
python3 -m http.server 3000
```
Open `http://localhost:3000` in your browser.

---

### Option 3: Full-Stack Setup with Java & MySQL

#### 1. Setup MySQL Database
1. Open your MySQL client or terminal:
   ```bash
   mysql -u root -p
   ```
2. Execute the included SQL file:
   ```sql
   SOURCE database/medical_store_db.sql;
   ```
3. This creates `medical_store_db` with all 9 relational tables, foreign keys, triggers, and sample medicines.

#### 2. Run Java Backend (JDBC)
1. Ensure Java 17+ and Maven are installed.
2. Navigate to the backend folder:
   ```bash
   cd backend
   mvn clean compile package
   ```
3. Run the application:
   ```bash
   java -jar target/medcare-backend.jar
   ```

---

## 📁 Project Structure

```
medcare-pharmacy/
├── index.html               # Main landing portal with session auto-routing
├── login.html               # Glassmorphism login page with animated SVG logo
├── dashboard.html           # Admin dashboard with 8 KPI cards & Chart.js charts
├── sales.html               # Point-of-Sale (POS) billing with auto stock deduction
├── medicines.html           # Full CRUD medicine catalog with multi-filters
├── categories.html          # Therapeutic category classifications
├── suppliers.html           # Pharmaceutical distributor directory
├── customers.html           # Patient directory & purchase history
├── purchases.html           # Stock restocking with auto inventory increment
├── inventory.html           # Stock health tracker (In Stock, Low Stock, Expired)
├── expiry.html              # Proactive shelf-life radar & batch quarantine
├── reports.html             # Auditable financial statements & CSV export
├── users.html               # Operator management with role-based access (RBAC)
├── settings.html            # Store configuration, drug license, GST & password change
├── backend-explorer.html    # Interactive in-app Java & MySQL source code inspector
├── css/
│   ├── style.css            # Pharmacy theme stylesheet & print media queries
│   └── animations.css       # Keyframe animations (logo, background, buttons)
├── js/
│   ├── app.js               # Core persistent store engine, session & shell
│   ├── login.js             # Login controller with loading spinner & presets
│   ├── dashboard.js         # Analytics & Chart.js graph bindings
│   ├── medicines.js         # Medicine CRUD & filtering logic
│   ├── billing.js           # POS calculations, stock sync & invoice print
│   ├── purchases.js         # Supplier purchase orders & stock increase
│   ├── inventory.js         # Inventory badge calculations
│   ├── expiry.js            # Shelf-life days remaining & quarantine
│   ├── reports.js           # Statement aggregations & CSV export
│   ├── users.js             # User RBAC logic
│   └── settings.js          # Store configuration persistence
├── assets/
│   ├── logo.svg             # Vector animated medical logo
│   ├── favicon.svg          # Matching browser tab favicon
│   └── images/              # Hero background & avatar assets
├── database/
│   └── medical_store_db.sql # Complete MySQL database schema & sample data
└── backend/
    ├── pom.xml              # Maven configuration
    ├── README.md            # Detailed Java & JDBC documentation
    └── src/main/java/com/medcare/
        ├── config/          # DatabaseConnection.java (JDBC connection manager)
        ├── model/           # Data models (Medicine, User, Sale, Customer, etc.)
        ├── dao/             # Data Access Objects with PreparedStatements
        ├── service/         # Business logic with ACID transaction management
        ├── util/            # PasswordUtil (Hashing) & InputValidator
        └── MainApplication.java # Java application entry point
```

---

## 🎨 Branding & Theme
- **Colors**: Medical Blue (`#1976D2`), Healthcare Teal (`#00A896`), Slate Neutrals, and Clean White.
- **Logo**: Medical Cross combined with Capsule Pill & Heartline Pulse.
- **Typography**: Plus Jakarta Sans & IBM Plex Mono (tabular numbers).
