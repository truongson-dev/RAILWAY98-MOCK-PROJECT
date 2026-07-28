package com.vti.module.kyc.dto;

import com.vti.common.enums.KycStatus;
import java.time.LocalDateTime;
import java.util.List;

public class KycProfileDTO {
    public KycProfileDTO() {}
    
    private Long id;
    private Long accountId;
    private String accountName;
    private KycStatus status;
    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;
    private Long reviewedById;
    private String rejectReason;
    private String additionalNote;
    private List<KycDocumentDTO> documents;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }
    public String getAccountName() { return accountName; }
    public void setAccountName(String accountName) { this.accountName = accountName; }
    public KycStatus getStatus() { return status; }
    public void setStatus(KycStatus status) { this.status = status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
    public Long getReviewedById() { return reviewedById; }
    public void setReviewedById(Long reviewedById) { this.reviewedById = reviewedById; }
    public String getRejectReason() { return rejectReason; }
    public void setRejectReason(String rejectReason) { this.rejectReason = rejectReason; }
    public String getAdditionalNote() { return additionalNote; }
    public void setAdditionalNote(String additionalNote) { this.additionalNote = additionalNote; }
    public List<KycDocumentDTO> getDocuments() { return documents; }
    public void setDocuments(List<KycDocumentDTO> documents) { this.documents = documents; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class KycDocumentDTO {
        public KycDocumentDTO() {}
        
        private Long id;
        private String documentType;
        private String documentUrl;
        private LocalDateTime uploadedAt;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getDocumentType() { return documentType; }
        public void setDocumentType(String documentType) { this.documentType = documentType; }
        public String getDocumentUrl() { return documentUrl; }
        public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }
        public LocalDateTime getUploadedAt() { return uploadedAt; }
        public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    }
}
