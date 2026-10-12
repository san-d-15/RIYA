package com.medcare.dao;

import com.medcare.config.DatabaseConnection;
import com.medcare.model.Medicine;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for Medicine operations using safe PreparedStatements
 */
public class MedicineDAO {

    public List<Medicine> getAllMedicines() throws SQLException {
        List<Medicine> list = new ArrayList<>();
        String sql = "SELECT m.*, c.name AS category_name, s.supplier_name " +
                     "FROM medicines m " +
                     "JOIN categories c ON m.category_id = c.id " +
                     "LEFT JOIN suppliers s ON m.supplier_id = s.id " +
                     "ORDER BY m.name ASC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapResultSet(rs));
            }
        }
        return list;
    }

    public Medicine getMedicineById(int id) throws SQLException {
        String sql = "SELECT m.*, c.name AS category_name, s.supplier_name " +
                     "FROM medicines m " +
                     "JOIN categories c ON m.category_id = c.id " +
                     "LEFT JOIN suppliers s ON m.supplier_id = s.id " +
                     "WHERE m.id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapResultSet(rs);
                }
            }
        }
        return null;
    }

    public boolean addMedicine(Medicine med) throws SQLException {
        String sql = "INSERT INTO medicines (name, generic_name, category_id, manufacturer, batch_number, " +
                     "purchase_price, selling_price, quantity, min_stock_level, mfg_date, expiry_date, supplier_id, description) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, med.getName());
            ps.setString(2, med.getGenericName());
            ps.setInt(3, med.getCategoryId());
            ps.setString(4, med.getManufacturer());
            ps.setString(5, med.getBatchNumber());
            ps.setDouble(6, med.getPurchasePrice());
            ps.setDouble(7, med.getSellingPrice());
            ps.setInt(8, med.getQuantity());
            ps.setInt(9, med.getMinStockLevel());
            ps.setDate(10, med.getMfgDate() != null ? new java.sql.Date(med.getMfgDate().getTime()) : null);
            ps.setDate(11, new java.sql.Date(med.getExpiryDate().getTime()));
            if (med.getSupplierId() > 0) ps.setInt(12, med.getSupplierId()); else ps.setNull(12, Types.INTEGER);
            ps.setString(13, med.getDescription());

            int affected = ps.executeUpdate();
            if (affected > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        med.setId(generatedKeys.getInt(1));
                    }
                }
                return true;
            }
        }
        return false;
    }

    public boolean updateMedicine(Medicine med) throws SQLException {
        String sql = "UPDATE medicines SET name=?, generic_name=?, category_id=?, manufacturer=?, batch_number=?, " +
                     "purchase_price=?, selling_price=?, quantity=?, min_stock_level=?, mfg_date=?, expiry_date=?, " +
                     "supplier_id=?, description=? WHERE id=?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, med.getName());
            ps.setString(2, med.getGenericName());
            ps.setInt(3, med.getCategoryId());
            ps.setString(4, med.getManufacturer());
            ps.setString(5, med.getBatchNumber());
            ps.setDouble(6, med.getPurchasePrice());
            ps.setDouble(7, med.getSellingPrice());
            ps.setInt(8, med.getQuantity());
            ps.setInt(9, med.getMinStockLevel());
            ps.setDate(10, med.getMfgDate() != null ? new java.sql.Date(med.getMfgDate().getTime()) : null);
            ps.setDate(11, new java.sql.Date(med.getExpiryDate().getTime()));
            if (med.getSupplierId() > 0) ps.setInt(12, med.getSupplierId()); else ps.setNull(12, Types.INTEGER);
            ps.setString(13, med.getDescription());
            ps.setInt(14, med.getId());

            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteMedicine(int id) throws SQLException {
        String sql = "DELETE FROM medicines WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean decreaseStock(Connection conn, int medicineId, int quantityToDeduct) throws SQLException {
        String sql = "UPDATE medicines SET quantity = quantity - ? WHERE id = ? AND quantity >= ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, quantityToDeduct);
            ps.setInt(2, medicineId);
            ps.setInt(3, quantityToDeduct);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean increaseStock(Connection conn, int medicineId, int quantityToAdd) throws SQLException {
        String sql = "UPDATE medicines SET quantity = quantity + ? WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, quantityToAdd);
            ps.setInt(2, medicineId);
            return ps.executeUpdate() > 0;
        }
    }

    private Medicine mapResultSet(ResultSet rs) throws SQLException {
        Medicine m = new Medicine();
        m.setId(rs.getInt("id"));
        m.setName(rs.getString("name"));
        m.setGenericName(rs.getString("generic_name"));
        m.setCategoryId(rs.getInt("category_id"));
        m.setCategoryName(rs.getString("category_name"));
        m.setManufacturer(rs.getString("manufacturer"));
        m.setBatchNumber(rs.getString("batch_number"));
        m.setPurchasePrice(rs.getDouble("purchase_price"));
        m.setSellingPrice(rs.getDouble("selling_price"));
        m.setQuantity(rs.getInt("quantity"));
        m.setMinStockLevel(rs.getInt("min_stock_level"));
        m.setMfgDate(rs.getDate("mfg_date"));
        m.setExpiryDate(rs.getDate("expiry_date"));
        m.setSupplierId(rs.getInt("supplier_id"));
        m.setSupplierName(rs.getString("supplier_name"));
        m.setDescription(rs.getString("description"));
        return m;
    }
}
