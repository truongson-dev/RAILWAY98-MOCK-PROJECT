package com.vti.module.order.repository;

import com.vti.common.enums.OrderStatus;
import com.vti.module.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    long countByStatus(OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE (:keyword IS NULL OR o.orderCode LIKE %:keyword%) " +
           "AND (:status IS NULL OR o.status = :status) " +
           "AND (:buyerId IS NULL OR o.buyer.id = :buyerId)")
    org.springframework.data.domain.Page<Order> searchOrders(@Param("keyword") String keyword, @Param("status") OrderStatus status, @Param("buyerId") Long buyerId, org.springframework.data.domain.Pageable pageable);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'COMPLETED'")
    BigDecimal calculateTotalRevenue();

    // Query lấy doanh thu theo từng tháng trong năm hiện tại
    @Query("SELECT MONTH(o.createdAt) AS month, SUM(o.totalAmount) AS total " +
           "FROM Order o " +
           "WHERE o.status = 'COMPLETED' AND YEAR(o.createdAt) = :year " +
           "GROUP BY MONTH(o.createdAt) " +
           "ORDER BY MONTH(o.createdAt)")
    List<Object[]> getMonthlyRevenue(@Param("year") int year);
    
    // Query lấy doanh thu theo từng tuần (Native query cho MySQL/PostgreSQL hoặc đơn giản hóa theo JPQL)
    // Tạm thời mô phỏng qua list object tương tự tháng
    @Query("SELECT WEEK(o.createdAt) AS week, SUM(o.totalAmount) AS total " +
           "FROM Order o " +
           "WHERE o.status = 'COMPLETED' AND YEAR(o.createdAt) = :year " +
           "GROUP BY WEEK(o.createdAt) " +
           "ORDER BY WEEK(o.createdAt)")
    List<Object[]> getWeeklyRevenue(@Param("year") int year);
}
