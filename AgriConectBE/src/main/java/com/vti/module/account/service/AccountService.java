package com.vti.module.account.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.module.account.dto.AccountDTO;
import com.vti.module.account.dto.UpdateProfileRequest;
import com.vti.module.account.dto.UpdateStatusRequest;
import org.springframework.data.domain.Pageable;

/**
 * Service interface quản lý thông tin tài khoản.
 */
public interface AccountService {
    
    /**
     * Lấy danh sách tài khoản theo bộ lọc có phân trang.
     * @param keyword Từ khóa tìm kiếm theo tên, email, điện thoại
     * @param role Lọc theo loại tài khoản
     * @param status Lọc theo trạng thái
     * @param pageable Đối tượng phân trang
     * @return Trang danh sách tài khoản
     */
    PageResponse<AccountDTO> getAll(String keyword, UserRole role, AccountStatus status, Pageable pageable);

    /**
     * Lấy chi tiết thông tin tài khoản theo ID.
     * @param id ID của tài khoản
     * @return Thông tin tài khoản
     */
    AccountDTO getById(Long id);

    /**
     * Cập nhật trạng thái tài khoản.
     * @param id ID tài khoản
     * @param request Thông tin cập nhật (trạng thái, lý do)
     * @return Thông tin tài khoản sau cập nhật
     */
    AccountDTO updateStatus(Long id, UpdateStatusRequest request);

    /**
     * Xóa tài khoản.
     * @param id ID tài khoản
     */
    void deleteAccount(Long id);

    /**
     * Lấy hồ sơ tài khoản của người dùng đang đăng nhập.
     * @param currentUserId ID người dùng đăng nhập
     * @return Thông tin hồ sơ
     */
    AccountDTO getProfile(Long currentUserId);

    /**
     * Cập nhật hồ sơ cá nhân.
     * @param currentUserId ID người dùng đăng nhập
     * @param request Dữ liệu cập nhật
     * @return Thông tin hồ sơ sau cập nhật
     */
    AccountDTO updateProfile(Long currentUserId, UpdateProfileRequest request);
}
