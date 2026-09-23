package com.vti.module.groupbuy.entity;

import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "group_buys")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "title", length = 500)
    private String title;

    @Column(name = "target_quantity", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetQuantity;

    @Column(name = "current_quantity", precision = 15, scale = 2)
    private BigDecimal currentQuantity;

    @Column(name = "discount_price", nullable = false, precision = 15, scale = 2)
    private BigDecimal discountPrice;

    @Column(name = "original_price", precision = 15, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "participants_count")
    private Integer participantsCount;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50)
    private GroupBuyStatus status;

    @PrePersist
    public void prePersist() {
        if (this.currentQuantity == null) {
            this.currentQuantity = BigDecimal.ZERO;
        }
        if (this.participantsCount == null) {
            this.participantsCount = 0;
        }
        if (this.status == null) {
            this.status = GroupBuyStatus.OPEN;
        }
    }
}
