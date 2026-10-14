# MedCare - Medical Store Management System
## Java/JDBC Backend Reference

---

### 1. Technology Stack
- **Frontend**: HTML5, Modern CSS3 (Variables, Grid, Flexbox, Print Media Queries), Vanilla JavaScript (Modular ES6+)
- **Backend**: Java 17+ (standalone JDBC DAOs/services, PBKDF2-HMAC-SHA256 password hashing)
- **Database**: MySQL 8.0+ / MariaDB (`medical_store_db` with relational constraints, foreign keys, triggers)
- **Design Theme**: Clean White, Medical Blue (`#0284c7`), and Healthcare Emerald (`#059669`)

---

### 2. Relevant Project Files
```
backend/
├── pom.xml
└── src/main/java/com/medcare/
    ├── MainApplication.java
    ├── config/DatabaseConnection.java
    ├── dao/MedicineDAO.java, SaleDAO.java, UserDAO.java
    ├── model/Medicine.java, Sale.java, SaleItem.java, User.java
    ├── service/BillingService.java
    └── util/InputValidator.java, PasswordUtil.java
```

---

### 3. Default Demo Login Credentials
These are frontend loopback-demo credentials only; they do not establish that the standalone Java console project accepts them or that its database is connected to the UI.

| Role | Email / Identifier | Password | Access Privileges |
|---|---|---|---|
| **Administrator** | `admin@medcare.com` (or `admin`) | `admin123` | Full access to settings, user management, reports, deletion |
| **Pharmacist** | `pharmacist@medcare.com` (or `pharmacist`) | `pharm123` | Dispensing, medicine catalog, restocking, expiry quarantine |
| **Cashier** | `cashier@medcare.com` (or `cashier`) | `cash123` | POS billing counter, invoice generation, patient search |

---

### 4. Current Frontend/Backend Integration Status
- The browser UI stores its operational records and demo sessions in `localStorage`. Its role checks and PBKDF2 hashes are browser-side controls, not a production security boundary.
- The Java source provides JDBC DAOs, a billing service, and a console `MainApplication`; the repository contains no HTTP controller/servlet routes connecting the browser UI to these classes.
- `BillingService` can execute a JDBC transaction when called from Java, but a browser sale currently calls the local JavaScript data store instead. The UI does not send a sale to MySQL.
- `backend-explorer.html` previews actual repository files when run from the source tree; backend source files are not packaged as frontend runtime APIs.

Connecting the two requires an approved server-side architecture: HTTP endpoints, server-side authentication/session handling, role checks, data APIs for the required modules, and an explicit migration/reconciliation plan for existing browser records. This is not implemented by this repository yet.

---

### 5. Database and Backend Build
#### Step 1: Initialize MySQL Database
**Warning:** `database/medical_store_db.sql` drops and recreates the `medical_store_db` database. Back up existing data before executing it.

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

#### Step 2: Compile the standalone Java project
```bash
cd backend
mvn clean compile package
```

The project does not currently define an HTTP server, servlet route, executable service JAR, or frontend API. Building the Java sources does not connect the browser application to MySQL or start a web backend.
