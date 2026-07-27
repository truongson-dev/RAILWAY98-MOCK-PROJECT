import java.sql.*;
public class DeleteDB {
    public static void main(String[] args) throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/agriconnect_db", "root", "");
        
        // Find account id
        PreparedStatement psFind = conn.prepareStatement("SELECT id FROM accounts WHERE email = 'thanhsonpnv27@gmail.com'");
        ResultSet rs = psFind.executeQuery();
        if (rs.next()) {
            long id = rs.getLong(1);
            
            // Delete from child tables
            conn.createStatement().executeUpdate("DELETE FROM suppliers WHERE id = " + id);
            conn.createStatement().executeUpdate("DELETE FROM partners WHERE id = " + id);
            conn.createStatement().executeUpdate("DELETE FROM shippers WHERE id = " + id);
            conn.createStatement().executeUpdate("DELETE FROM admins WHERE id = " + id);
            
            // Delete from accounts
            int deleted = conn.createStatement().executeUpdate("DELETE FROM accounts WHERE id = " + id);
            System.out.println("Deleted accounts: " + deleted);
        }
        
        // Delete email_verifications
        int ev = conn.createStatement().executeUpdate("DELETE FROM email_verifications WHERE email = 'thanhsonpnv27@gmail.com'");
        System.out.println("Deleted email_verifications: " + ev);
    }
}
