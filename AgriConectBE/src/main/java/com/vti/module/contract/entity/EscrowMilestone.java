package com.vti.module.contract.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "escrow_milestones")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class EscrowMilestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id")
    private EscrowContract contract;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private com.vti.module.contract.enums.MilestoneStatus status = com.vti.module.contract.enums.MilestoneStatus.PENDING;

    private int displayOrder;
    
    private LocalDateTime completionDate;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public void setContract(EscrowContract contract) { this.contract = contract; }
    public void setStatus(com.vti.module.contract.enums.MilestoneStatus status) { this.status = status; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }
    
    public Long getId() { return id; }
    public EscrowContract getContract() { return contract; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public com.vti.module.contract.enums.MilestoneStatus getStatus() { return status; }
    public int getDisplayOrder() { return displayOrder; }
    public LocalDateTime getCompletionDate() { return completionDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
