package com.vti.module.kyc.entity;

import com.vti.common.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "kyc_documents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class KycDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kyc_profile_id", nullable = false)
    private KycProfile kycProfile; // Hồ sơ KYC chứa tài liệu này

    @Enumerated(EnumType.STRING)
    private DocumentType documentType; // Loại tài liệu: ID_CARD, BUSINESS_LICENSE, CERTIFICATE...

    private String documentUrl; // Đường dẫn lưu trữ tài liệu

    private LocalDateTime uploadedAt; // Ngày tải lên
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setKycProfile(KycProfile kycProfile) { this.kycProfile = kycProfile; }
    public void setDocumentType(DocumentType documentType) { this.documentType = documentType; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    public Long getId() { return id; }
    public DocumentType getDocumentType() { return documentType; }
    public String getDocumentUrl() { return documentUrl; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
