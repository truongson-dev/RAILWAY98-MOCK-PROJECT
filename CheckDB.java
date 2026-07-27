import java.sql.*;
public class CheckDB {
    public static void main(String[] args) throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/agriconnect_db", "root", "");
        PreparedStatement ps = conn.prepareStatement("SELECT email, status, role FROM accounts WHERE email = 'thanhsonpnv27@gmail.com'");
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            System.out.println("Email: " + rs.getString(1) + ", Status: " + rs.getString(2) + ", Role: " + rs.getString(3));
        } else {
            System.out.println("Account not found");
        }
    }
}
