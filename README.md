# MedCare Pharmacy - Medical Store Management System

A modern, responsive Medical Store Management System featuring POS billing, inventory, expiry and supplier/customer management. The browser application and Java/JDBC database prototype are currently separate and are not integrated.

---

## 🚀 Quick Start Guide

### Option 1: Run the Frontend Locally
The frontend uses a built-in browser data store and can be run with a local web server. Demo authentication is available only on a loopback host (`localhost`, `127.0.0.1`, or `::1`); opening `login.html` directly from disk or hosting the static frontend remotely does not provide production authentication.

#### Quick Demo Accounts:
- **Administrator**: `admin@medcare.com` / `admin123` (Full System Access)
- **Pharmacist**: `pharmacist@medcare.com` / `pharm123` (POS & Inventory Restock)
- **Cashier**: `cashier@medcare.com` / `cash123` (Billing & Invoices)
*(Or use the 1-click quick sign-in buttons on the login page.)*
These accounts are for local development and evaluation only. The browser-based session is not a production security boundary; production deployments must use server-side authentication.

---

### Option 2: Run with a Local Web Server (Recommended)
From the project root in PowerShell, run:
```bash
npm install
npm run dev
```
Open `http://127.0.0.1:3000/` or `http://127.0.0.1:3000/login.html`. The Vite dev server binds to loopback for the browser-local demo; this does not provide production authentication or server-side authorization.

---

### Option 3: Standalone Java/JDBC and MySQL Development (Not Connected to the UI)

#### 1. Setup MySQL Database
1. Open your MySQL client or terminal:
   ```bash
   mysql -u root -p
   ```
2. Execute the included SQL file:
   ```sql
   SOURCE database/medical_store_db.sql;
   ```
   **Warning:** the script drops and recreates `medical_store_db`. Back up any existing database before running it.
3. This creates `medical_store_db` with all 9 relational tables, foreign keys, triggers, and sample medicines.

#### 2. Run Java Backend (JDBC)
1. Ensure Java 17+ and Maven are installed.
   2. Navigate to the backend folder:
      ```bash
      cd backend
      mvn clean compile package
      ```
      The sources include a console `MainApplication` for connection checks, but this project does not configure an executable service JAR or expose HTTP endpoints. It does not connect the browser UI to MySQL.

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
├── backend-explorer.html    # Admin-only developer source reference (not in staff navigation)
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
│   ├── settings.js          # Store configuration persistence
│   └── backend-explorer.js  # Read-only repository source previews
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

### Data and authorization boundary
The frontend currently reads and writes browser `localStorage`; it is not connected to the Java/MySQL backend. Local role checks protect normal UI navigation and data-store operations but can be bypassed by a user controlling the browser, so they are not production server-side authorization. The Java backend currently exposes no HTTP endpoints. Existing browser records are not automatically migrated to MySQL.

---

## 🎨 Branding & Theme
- **Colors**: Medical Blue (`#1976D2`), Healthcare Teal (`#00A896`), Slate Neutrals, and Clean White.
- **Logo**: Medical Cross combined with Capsule Pill & Heartline Pulse.
- **Typography**: Plus Jakarta Sans & IBM Plex Mono (tabular numbers).
