package com.vti.module.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // Sản phẩm chứa ảnh

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl; // URL ảnh

    @Column(name = "is_primary")
    private boolean isPrimary; // Ảnh chính của sản phẩm

    @Column(name = "display_order")
    private int displayOrder; // Thứ tự hiển thị

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt; // Thời gian upload ảnh
}
