package com.vti.module.product.entity;

import com.vti.common.enums.CertificationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "product_certifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCertification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // Sản phẩm được chứng nhận

    @Enumerated(EnumType.STRING)
    private CertificationType certificationType; // Loại chứng nhận: VIETGAP, GLOBALGAP, ORGANIC, HACCP, OTHER

    private String issuedBy; // Nơi cấp
    private LocalDate issuedDate; // Ngày cấp
    private LocalDate expiredDate; // Ngày hết hạn
    private String documentUrl; // URL tài liệu chứng nhận
}
