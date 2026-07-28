package com.vti.module.account.entity;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Account — Entity base cho tất cả tài khoản người dùng
 *
 * <p>Thiết kế: Dùng chiến lược Joined Inheritance (JOINED)
 * Nghĩa là: bảng `accounts` chứa các cột chung,
 * mỗi role con (Partner, Supplier, Shipper, Admin) có bảng riêng
 * chứa các cột đặc thù, được join qua khóa ngoại cùng ID.
 *
 * <p>Ưu điểm của JOINED so với SINGLE_TABLE:
 * - Dữ liệu chuẩn hóa (no null columns)
 * - Mỗi bảng con có ràng buộc riêng
 * - Phù hợp với thiết kế hướng đối tượng
 *
 * <p>Discriminator column: `role` — Spring dùng giá trị này
 * để biết phải load subtype nào (Partner, Supplier...)
 *
 * <p>@EntityListeners(AuditingEntityListener.class): Tự động
 * ghi createdAt, updatedAt, createdBy, updatedBy khi save.
 */
@Entity
@Table(
    name = "accounts",
    indexes = {
        @Index(name = "idx_account_email", columnList = "email"),
        @Index(name = "idx_account_status", columnList = "status"),
        @Index(name = "idx_account_role", columnList = "role")
    }
)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("ADMIN")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder // @SuperBuilder cho phép Builder kế thừa xuống subclass
public class Account {

    /** Khóa chính — tự tăng */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Email — dùng làm username đăng nhập và subject trong JWT
     * Unique: mỗi email chỉ được đăng ký một lần
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    /**
     * Mật khẩu đã hash bằng BCrypt
     * Null khi user đăng nhập bằng Google OAuth2
     */
    @Column(length = 255)
    private String password;

    /** Họ tên đầy đủ của người đại diện */
    @Column(name = "full_name", length = 100)
    private String fullName;

    /** Số điện thoại liên hệ */
    @Column(length = 20)
    private String phone;

    /** Tỉnh/thành phố hoạt động */
    @Column(length = 100)
    private String province;

    /** Địa chỉ chi tiết */
    @Column(columnDefinition = "TEXT")
    private String address;

    /** URL ảnh đại diện */
    @Column(length = 500)
    private String avatar;

    /**
     * Role — được tự động map từ DiscriminatorColumn
     * insertable = false, updatable = false vì Hibernate quản lý
     * Đây là cột chia sẻ với Discriminator Column tên 'role'
     */
    @Column(name = "role", insertable = false, updatable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    /**
     * Trạng thái tài khoản
     * Mặc định: PENDING_VERIFICATION (chờ xác thực email)
     */
    @Column(nullable = false, length = 30)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AccountStatus status = AccountStatus.PENDING_VERIFICATION;

    /**
     * Google ID — lưu khi user đăng nhập bằng Google
     * Null nếu user đăng ký thường (email/password)
     */
    @Column(name = "google_id", length = 100)
    private String googleId;

    // ─── JPA Auditing: tự động ghi thời gian và người thực hiện ─────────────

    /** Thời điểm tạo tài khoản — tự động ghi bởi @CreatedDate */
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /** Thời điểm cập nhật lần cuối — tự động cập nhật bởi @LastModifiedDate */
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /** Email người tạo — tự động ghi bởi AuditingConfig */
    @CreatedBy
    @Column(name = "created_by", length = 100, updatable = false)
    private String createdBy;

    /** Email người cập nhật lần cuối */
    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
