package com.vti;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class FixDB {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/agriconnect_db?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true&characterEncoding=UTF-8";
        String user = "root";
        String pass = "";
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            int updated = stmt.executeUpdate("UPDATE accounts SET role = UPPER(role)");
            System.out.println("Updated " + updated + " rows in accounts table to UPPER(role).");
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
