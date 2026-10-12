package com.medcare.dao;

import com.medcare.config.DatabaseConnection;
import com.medcare.model.Sale;
import com.medcare.model.SaleItem;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for Sales, Line items & Invoices
 */
public class SaleDAO {

    public List<Sale> getRecentSales(int limit) throws SQLException {
        List<Sale> sales = new ArrayList<>();
        String sql = "SELECT s.*, c.customer_name, c.phone AS customer_phone, u.name AS user_name " +
                     "FROM sales s " +
                     "LEFT JOIN customers c ON s.customer_id = c.id " +
                     "JOIN users u ON s.user_id = u.id " +
                     "ORDER BY s.id DESC LIMIT ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, limit);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Sale sale = new Sale();
                    sale.setId(rs.getInt("id"));
                    sale.setInvoiceNumber(rs.getString("invoice_number"));
                    sale.setCustomerId(rs.getInt("customer_id"));
                    sale.setCustomerName(rs.getString("customer_name") != null ? rs.getString("customer_name") : "Walk-in Customer");
                    sale.setCustomerPhone(rs.getString("customer_phone"));
                    sale.setUserId(rs.getInt("user_id"));
                    sale.setUserName(rs.getString("user_name"));
                    sale.setSubtotal(rs.getDouble("subtotal"));
                    sale.setDiscountPercent(rs.getDouble("discount_percent"));
                    sale.setDiscountAmount(rs.getDouble("discount_amount"));
                    sale.setTaxPercent(rs.getDouble("tax_percent"));
                    sale.setTaxAmount(rs.getDouble("tax_amount"));
                    sale.setGrandTotal(rs.getDouble("grand_total"));
                    sale.setPaymentMethod(rs.getString("payment_method"));
                    sale.setSaleDate(rs.getDate("sale_date"));
                    sale.setSaleTime(rs.getString("sale_time"));
                    sales.add(sale);
                }
            }
        }
        return sales;
    }
}
