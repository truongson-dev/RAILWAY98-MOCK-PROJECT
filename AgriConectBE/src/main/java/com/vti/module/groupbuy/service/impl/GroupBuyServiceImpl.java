package com.vti.module.groupbuy.service.impl;

import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.common.enums.OrderStatus;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.entity.GroupBuy;
import com.vti.module.groupbuy.repository.GroupBuyRepository;
import com.vti.module.groupbuy.service.GroupBuyService;
import com.vti.module.order.entity.Order;
import com.vti.module.order.entity.OrderItem;
import com.vti.module.order.entity.PaymentStatus;
import com.vti.module.order.repository.OrderItemRepository;
import com.vti.module.order.repository.OrderRepository;
import com.vti.module.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupBuyServiceImpl implements GroupBuyService {

    private final GroupBuyRepository groupBuyRepository;
    private final AccountRepository accountRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public PageResponse<GroupBuyDTO> getGroupBuys(GroupBuyStatus status, Pageable pageable) {
        Page<GroupBuy> page;
        if (status != null) {
            page = groupBuyRepository.findByStatus(status, pageable);
        } else {
            page = groupBuyRepository.findAll(pageable);
        }
        return PageResponse.of(page.map(this::mapToDTO));
    }

    @Override
    public PageResponse<GroupBuyDTO> getSupplierGroupBuys(Long supplierId, GroupBuyStatus status, Pageable pageable) {
        Page<GroupBuy> page = groupBuyRepository.findBySupplierAndStatus(supplierId, status, pageable);
        return PageResponse.of(page.map(this::mapToDTO));
    }

    @Override
    @Transactional
    public GroupBuyDTO joinGroupBuy(Long id, Long partnerId, BigDecimal volumeKg) {
        GroupBuy gb = groupBuyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.GROUP_BUY_NOT_FOUND));

        if (gb.getStatus() != GroupBuyStatus.OPEN) {
            throw new AppException(ErrorCode.GROUP_BUY_CLOSED);
        }

        Account buyer = accountRepository.findById(partnerId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        // Create an order for the group buy at discounted price
        Order order = new Order();
        order.setBuyer(buyer);
        order.setOrderCode("GB-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setStatus(OrderStatus.pending);
        order.setPaymentMethod(com.vti.module.order.entity.PaymentMethod.credit_30);
        order.setPaymentStatus(PaymentStatus.unpaid);
        
        BigDecimal subtotal = gb.getDiscountPrice().multiply(volumeKg);
        order.setTotalAmount(subtotal);
        orderRepository.save(order);

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(gb.getProduct());
        item.setProductName(gb.getProduct().getName());
        item.setQuantity(volumeKg);
        item.setPrice(gb.getDiscountPrice());
        item.setSubtotal(subtotal);
        orderItemRepository.save(item);

        // Update group buy stats
        gb.setCurrentQuantity(gb.getCurrentQuantity().add(volumeKg));
        gb.setParticipantsCount(gb.getParticipantsCount() + 1);
        
        // Auto close if target reached
        if (gb.getCurrentQuantity().compareTo(gb.getTargetQuantity()) >= 0) {
            gb.setStatus(GroupBuyStatus.CLOSED); // Wait for fulfillment
        }
        groupBuyRepository.save(gb);

        return mapToDTO(gb);
    }

    @Override
    @Transactional
    public GroupBuyDTO updateStatus(Long id, GroupBuyStatus status, Long supplierId) {
        GroupBuy gb = groupBuyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.GROUP_BUY_NOT_FOUND));
                
        // Ensure the supplier owns the product
        if (!gb.getProduct().getSeller().getId().equals(supplierId)) {
            throw new AppException(ErrorCode.AUTH_FORBIDDEN);
        }
        
        gb.setStatus(status);
        groupBuyRepository.save(gb);
        return mapToDTO(gb);
    }

    private GroupBuyDTO mapToDTO(GroupBuy gb) {
        Product p = gb.getProduct();
        
        GroupBuyDTO.ProductSummary ps = GroupBuyDTO.ProductSummary.builder()
                .id(p.getId())
                .name(p.getName())
                .location(p.getLocation())
                .image("https://images.unsplash.com/photo-1542838132-92c53300491e")
                .minOrderKg(p.getMinOrderKg())
                .supplierName(p.getSeller() != null ? p.getSeller().getFullName() : "Unknown")
                .build();

        return GroupBuyDTO.builder()
                .id(gb.getId())
                .title(gb.getTitle())
                .targetVolumeKg(gb.getTargetQuantity())
                .currentVolumeKg(gb.getCurrentQuantity())
                .discountedPriceVnd(gb.getDiscountPrice())
                .originalPriceVnd(gb.getOriginalPrice())
                .discountPercent(gb.getDiscountPercent())
                .participantsCount(gb.getParticipantsCount())
                .startDate(gb.getStartDate())
                .endDate(gb.getEndDate())
                .status(gb.getStatus())
                .product(ps)
                .build();
    }
}
