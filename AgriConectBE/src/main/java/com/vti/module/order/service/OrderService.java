package com.vti.module.order.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.OrderStatus;
import com.vti.module.order.dto.CreateOrderRequest;
import com.vti.module.order.dto.OrderDTO;
import com.vti.module.order.dto.UpdateOrderStatusRequest;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    // Tạo mới một đơn hàng (dành cho đối tác mua hàng)
    OrderDTO createOrder(CreateOrderRequest request, Long buyerId);

    // Lấy danh sách đơn hàng có phân trang và tìm kiếm (dành cho Admin)
    PageResponse<OrderDTO> getOrders(String keyword, OrderStatus status, Pageable pageable);

    // Lấy chi tiết đơn hàng theo ID
    OrderDTO getOrderById(Long id);

    // Lấy danh sách đơn hàng của một người mua (Partner)
    PageResponse<OrderDTO> getMyOrders(Long buyerId, OrderStatus status, Pageable pageable);

    // Cập nhật trạng thái đơn hàng (dành cho Admin/Nhân viên)
    OrderDTO updateOrderStatus(Long id, UpdateOrderStatusRequest request, Long adminId);
    OrderDTO updateOrderStatusSupplier(Long id, OrderStatus newStatus);

    // Hủy đơn hàng (chỉ thực hiện khi đơn hàng chưa được xử lý)
    OrderDTO cancelOrder(Long id, String reason, Long buyerId);
}
