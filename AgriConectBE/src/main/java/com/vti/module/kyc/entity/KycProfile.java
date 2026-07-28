package com.vti.module.kyc.entity;

import com.vti.common.enums.KycStatus;
import com.vti.module.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "kyc_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class KycProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account; // Liên kết 1-1 với tài khoản

    @Enumerated(EnumType.STRING)
    private KycStatus status; // Trạng thái KYC: PENDING, APPROVED, REJECTED, NEEDS_INFO

    private LocalDateTime submittedAt; // Ngày nộp hồ sơ
    private LocalDateTime reviewedAt; // Ngày duyệt hồ sơ

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private Account reviewedBy; // Admin đã duyệt hồ sơ

    private String rejectReason; // Lý do từ chối (nếu có)
    private String additionalNote; // Ghi chú thêm

    @OneToMany(mappedBy = "kycProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KycDocument> documents; // Danh sách tài liệu liên kết

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Các field phụ
    @Transient private String documentType;
    @Transient private String documentNumber;
    @Transient private String frontImageUrl;
    @Transient private String backImageUrl;
    @Transient private String selfieImageUrl;

    public Long getId() { return id; }
    public KycStatus getStatus() { return status; }
    public void setAccount(Account account) { this.account = account; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }
    public void setDocumentNumber(String documentNumber) { this.documentNumber = documentNumber; }
    public void setFrontImageUrl(String frontImageUrl) { this.frontImageUrl = frontImageUrl; }
    public void setBackImageUrl(String backImageUrl) { this.backImageUrl = backImageUrl; }
    public void setSelfieImageUrl(String selfieImageUrl) { this.selfieImageUrl = selfieImageUrl; }
    public void setStatus(KycStatus status) { this.status = status; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    public void setAdditionalNote(String additionalNote) { this.additionalNote = additionalNote; }
    public void setDocuments(List<KycDocument> documents) { this.documents = documents; }
    public Account getAccount() { return account; }
    public void setReviewedBy(Account reviewedBy) { this.reviewedBy = reviewedBy; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
    public List<KycDocument> getDocuments() { return documents; }
    public void setRejectReason(String rejectReason) { this.rejectReason = rejectReason; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public Account getReviewedBy() { return reviewedBy; }
    public String getRejectReason() { return rejectReason; }
    public String getAdditionalNote() { return additionalNote; }
}
