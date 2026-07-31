import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbFix {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/agriconnect_db?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true&characterEncoding=UTF-8", "root", "");
            Statement stmt = conn.createStatement();
            stmt.execute("ALTER TABLE products MODIFY COLUMN status ENUM('PENDING_APPROVAL','AVAILABLE','OUT_OF_STOCK','DISCONTINUED','REJECTED') DEFAULT 'PENDING_APPROVAL'");
            System.out.println("Enum updated successfully!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
