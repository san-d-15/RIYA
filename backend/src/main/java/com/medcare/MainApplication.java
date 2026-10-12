package com.medcare;

import com.medcare.config.DatabaseConnection;
import com.medcare.dao.MedicineDAO;
import com.medcare.dao.UserDAO;
import com.medcare.model.Medicine;
import com.medcare.model.User;

import java.sql.Connection;
import java.util.List;

/**
 * MedCare - Medical Store Management System
 * Main Java Application Entry Point
 */
public class MainApplication {

    public static void main(String[] args) {
        System.out.println("==================================================================");
        System.out.println("   MedCare - Medical Store Management System (Java Backend)       ");
        System.out.println("==================================================================");

        try {
            System.out.println("[INFO] Testing MySQL JDBC Connection pool...");
            try (Connection conn = DatabaseConnection.getConnection()) {
                System.out.println("[SUCCESS] Connected to MySQL Database: " + conn.getCatalog());
            }

            MedicineDAO medicineDAO = new MedicineDAO();
            List<Medicine> medicines = medicineDAO.getAllMedicines();
            System.out.println("[INFO] Catalog loaded: " + medicines.size() + " active medicines found.");

            UserDAO userDAO = new UserDAO();
            List<User> users = userDAO.getAllUsers();
            System.out.println("[INFO] Registered operators: " + users.size() + " accounts active.");

            System.out.println("\n[READY] MedCare Pharmacy Backend Engine Running.");
            System.out.println("Default Operator Credentials for Evaluation:");
            System.out.println(" - Administrator: admin@medcare.com / admin123");
            System.out.println(" - Pharmacist:    pharmacist@medcare.com / pharm123");
            System.out.println(" - Cashier:       cashier@medcare.com / cash123");
            System.out.println("==================================================================");

        } catch (Exception e) {
            System.err.println("[WARN] Running in standalone offline mode or MySQL server offline: " + e.getMessage());
            System.out.println("[INFO] Ensure MySQL is started and database/medical_store_db.sql is executed.");
        }
    }
}
