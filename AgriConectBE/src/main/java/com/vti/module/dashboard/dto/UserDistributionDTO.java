package com.vti.module.dashboard.dto;

import lombok.Data;

@Data
public class UserDistributionDTO {
    private long totalUsers;
    private long admins;
    private long partners;
    private long suppliers;
    private long shippers;
    private long activeAccounts;
    private long pendingAccounts;
    
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public void setAdmins(long admins) { this.admins = admins; }
    public void setPartners(long partners) { this.partners = partners; }
    public void setSuppliers(long suppliers) { this.suppliers = suppliers; }
    public void setShippers(long shippers) { this.shippers = shippers; }
    public void setActiveAccounts(long activeAccounts) { this.activeAccounts = activeAccounts; }
    public void setPendingAccounts(long pendingAccounts) { this.pendingAccounts = pendingAccounts; }
    
    public long getTotalUsers() { return totalUsers; }
    public long getAdmins() { return admins; }
    public long getPartners() { return partners; }
    public long getSuppliers() { return suppliers; }
    public long getShippers() { return shippers; }
    public long getActiveAccounts() { return activeAccounts; }
    public long getPendingAccounts() { return pendingAccounts; }
}
