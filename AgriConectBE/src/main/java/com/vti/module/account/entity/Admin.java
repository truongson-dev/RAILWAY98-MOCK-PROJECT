package com.vti.module.account.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * Admin — Entity đại diện cho Quản trị viên hệ thống
 *
 * <p>Bảng: `admins`
 * Discriminator: "ADMIN"
 *
 * <p>Admin có quyền truy cập toàn bộ tính năng quản trị:
 * duyệt KYC, quản lý user, xem báo cáo, cấu hình hệ thống...
 */
@Entity
@Table(name = "admins")
@DiscriminatorValue("ADMIN")
@Data
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Admin extends Account {

    /**
     * Phòng ban / bộ phận
     * Ví dụ: Vận hành, Kinh doanh, Kỹ thuật, Pháp lý...
     */
    @Column(name = "department", length = 100)
    private String department;
}
