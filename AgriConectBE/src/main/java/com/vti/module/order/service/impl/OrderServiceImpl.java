package com.vti.module.order.service.impl;

import com.vti.common.PageResponse;

import com.vti.module.shipment.repository.ShipmentRepository;
import com.vti.module.shipment.entity.Shipment;
import com.vti.common.enums.ShipmentStatus;
import java.util.UUID;
import com.vti.common.enums.OrderStatus;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.order.dto.*;
import com.vti.module.order.entity.Order;
import com.vti.module.order.entity.OrderItem;
import com.vti.module.order.entity.PaymentStatus;
import com.vti.module.order.repository.OrderItemRepository;
import com.vti.module.order.repository.OrderRepository;
import com.vti.module.order.service.OrderService;
import com.vti.module.product.entity.Product;
import com.vti.module.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final AccountRepository accountRepository;
    private final ShipmentRepository shipmentRepository;

    @Override
    @Transactional
    public OrderDTO createOrder(CreateOrderRequest request, Long buyerId) {
        Account buyer = accountRepository.findById(buyerId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        Order order = new Order();
        order.setBuyer(buyer);
        order.setOrderCode(generateOrderCode());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setPaymentStatus(PaymentStatus.UNPAID);
        order.setShippingAddress(request.getShippingAddress());
        order.setNote(request.getNote());
        order.setEstimatedDelivery(request.getEstimatedDelivery());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        if (request.getItems() != null) {
            for (OrderItemRequest itemRequest : request.getItems()) {
                Product product = productRepository.findById(itemRequest.getProductId())
                        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProduct(product);
                orderItem.setProductName(product.getName());
                orderItem.setQuantity(itemRequest.getQuantity());
                orderItem.setPrice(product.getPrice());

                BigDecimal subtotal = product.getPrice().multiply(itemRequest.getQuantity());
                orderItem.setSubtotal(subtotal);
                orderItems.add(orderItem);

                totalAmount = totalAmount.add(subtotal);
            }
        }

        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);

        order = orderRepository.save(order);
        return mapToDTO(order);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderDTO> getOrders(String keyword, OrderStatus status, Pageable pageable) {
        Page<Order> orderPage = orderRepository.searchOrders(keyword, status, null, pageable);
        Page<OrderDTO> dtoPage = orderPage.map(this::mapToDTO);
        return PageResponse.of(dtoPage);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return mapToDTO(order);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<OrderDTO> getMyOrders(Long buyerId, OrderStatus status, Pageable pageable) {
        Page<Order> orderPage = orderRepository.searchOrders(null, status, buyerId, pageable);
        Page<OrderDTO> dtoPage = orderPage.map(this::mapToDTO);
        return PageResponse.of(dtoPage);
    }

    @Override
    @Transactional
    public OrderDTO updateOrderStatusSupplier(Long id, OrderStatus newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        
        order.setStatus(newStatus);
        order = orderRepository.save(order);
        
        // If status is SHIPPING, we make sure a Shipment exists and is READY_FOR_PICKUP
        if (newStatus == OrderStatus.SHIPPING) {
            java.util.Optional<Shipment> existingShipment = shipmentRepository.findByOrderId(order.getId());
            if (existingShipment.isEmpty()) {
                Shipment s = new Shipment();
                s.setOrder(order);
                s.setTrackingCode("SHP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
                s.setStatus(ShipmentStatus.READY_FOR_PICKUP);
                s.setDeliveryAddress(order.getShippingAddress());
                shipmentRepository.save(s);
            } else {
                Shipment s = existingShipment.get();
                if (s.getStatus() == ShipmentStatus.PENDING) {
                    s.setStatus(ShipmentStatus.READY_FOR_PICKUP);
                    shipmentRepository.save(s);
                }
            }
        }
        
        return mapToDTO(order);
    }

    public OrderDTO updateOrderStatus(Long id, UpdateOrderStatusRequest request, Long adminId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        
        order.setStatus(request.getStatus());
        if (request.getReason() != null) {
            order.setCancelledReason(request.getReason());
        }

        order = orderRepository.save(order);
        return mapToDTO(order);
    }

    @Override
    @Transactional
    public OrderDTO cancelOrder(Long id, String reason, Long buyerId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
                
        if (order.getBuyer() == null || !order.getBuyer().getId().equals(buyerId)) {
            throw new AppException(ErrorCode.AUTH_UNAUTHORIZED);
        }

        if (order.getStatus() != OrderStatus.PENDING && order.getStatus() != OrderStatus.CONFIRMED) {
            throw new AppException(ErrorCode.ORDER_CANNOT_CANCEL);
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setCancelledReason(reason);
        order = orderRepository.save(order);
        
        return mapToDTO(order);
    }

    private String generateOrderCode() {
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomNum = new Random().nextInt(9000) + 1000;
        return "AG-" + dateStr + "-" + randomNum;
    }

    private OrderDTO mapToDTO(Order order) {
        List<OrderItemDTO> itemDTOs = new ArrayList<>();
        if (order.getItems() != null) {
            itemDTOs = order.getItems().stream().map(item -> {
                OrderItemDTO dto = new OrderItemDTO();
                dto.setId(item.getId());
                dto.setProductId(item.getProduct() != null ? item.getProduct().getId() : null);
                dto.setProductName(item.getProductName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getPrice());
                dto.setSubtotal(item.getSubtotal());
                return dto;
            }).collect(Collectors.toList());
        }

        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderCode(order.getOrderCode());
        dto.setBuyerId(order.getBuyer() != null ? order.getBuyer().getId() : null);
        dto.setSupplierName(order.getSupplierName());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setTrackingCode(order.getTrackingCode());
        dto.setEstimatedDelivery(order.getEstimatedDelivery());
        dto.setNote(order.getNote());
        dto.setCancelledReason(order.getCancelledReason());
        dto.setItems(itemDTOs);
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        return dto;
    }
}
