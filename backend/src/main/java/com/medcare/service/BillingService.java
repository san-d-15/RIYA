package com.medcare.service;

import com.medcare.config.DatabaseConnection;
import com.medcare.dao.MedicineDAO;
import com.medcare.model.Sale;
import com.medcare.model.SaleItem;

import java.sql.*;

/**
 * Handles Point of Sale business transactions with ACID rollback guarantees
 * and automatic stock deduction
 */
public class BillingService {
    private final MedicineDAO medicineDAO = new MedicineDAO();

    public boolean processSale(Sale sale) throws Exception {
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false); // Begin ACID Transaction

            // 1. Insert Sales Record
            String saleSql = "INSERT INTO sales (invoice_number, customer_id, user_id, subtotal, " +
                             "discount_percent, discount_amount, tax_percent, tax_amount, grand_total, payment_method, sale_date, sale_time) " +
                             "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), CURTIME())";

            int saleId;
            try (PreparedStatement ps = conn.prepareStatement(saleSql, Statement.RETURN_GENERATED_KEYS)) {
                ps.setString(1, sale.getInvoiceNumber());
                if (sale.getCustomerId() > 0) ps.setInt(2, sale.getCustomerId()); else ps.setNull(2, Types.INTEGER);
                ps.setInt(3, sale.getUserId());
                ps.setDouble(4, sale.getSubtotal());
                ps.setDouble(5, sale.getDiscountPercent());
                ps.setDouble(6, sale.getDiscountAmount());
                ps.setDouble(7, sale.getTaxPercent());
                ps.setDouble(8, sale.getTaxAmount());
                ps.setDouble(9, sale.getGrandTotal());
                ps.setString(10, sale.getPaymentMethod());

                ps.executeUpdate();
                try (ResultSet rs = ps.getGeneratedKeys()) {
                    if (rs.next()) {
                        saleId = rs.getInt(1);
                    } else {
                        throw new SQLException("Failed to retrieve generated Sale ID.");
                    }
                }
            }

            // 2. Insert Sale Items and Deduct Medicine Stock
            String itemSql = "INSERT INTO sale_items (sale_id, medicine_id, quantity, unit_price, total_amount) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement psItem = conn.prepareStatement(itemSql)) {
                for (SaleItem item : sale.getItems()) {
                    psItem.setInt(1, saleId);
                    psItem.setInt(2, item.getMedicineId());
                    psItem.setInt(3, item.getQuantity());
                    psItem.setDouble(4, item.getUnitPrice());
                    psItem.setDouble(5, item.getTotalAmount());
                    psItem.addBatch();

                    // Atomically decrease medicine stock
                    boolean stockDeducted = medicineDAO.decreaseStock(conn, item.getMedicineId(), item.getQuantity());
                    if (!stockDeducted) {
                        throw new Exception("Insufficient stock available for medicine ID: " + item.getMedicineId());
                    }
                }
                psItem.executeBatch();
            }

            conn.commit(); // Commit all operations atomically
            return true;

        } catch (Exception ex) {
            if (conn != null) {
                try {
                    conn.rollback(); // Rollback on any failure
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw ex;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }
}
