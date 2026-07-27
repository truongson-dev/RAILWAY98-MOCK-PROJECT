package com.vti.common.enums;

/**
 * UserRole — Enum định nghĩa các vai trò người dùng trong hệ thống
 *
 * <p>Được dùng trong:
 * - Entity Account (discriminator value)
 * - Spring Security (GrantedAuthority)
 * - SecurityConfig (authorizeHttpRequests)
 *
 * <p>Mỗi role có màn hình dashboard riêng:
 * - ADMIN:    /dashboard/admin  → Quản trị toàn hệ thống
 * - PARTNER:  /dashboard/partner → Đối tác thu mua B2B
 * - SUPPLIER: /dashboard/supplier → Nhà cung cấp/nông dân
 * - SHIPPER:  /dashboard/shipper → Đơn vị vận chuyển
 */
public enum UserRole {
    ADMIN,
    PARTNER,
    SUPPLIER,
    SHIPPER
}
