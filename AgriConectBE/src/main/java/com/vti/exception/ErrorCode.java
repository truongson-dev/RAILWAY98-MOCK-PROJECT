package com.vti.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * ErrorCode — Enum tập trung toàn bộ mã lỗi của hệ thống
 *
 * <p>Mục đích: Thay vì viết thông báo lỗi rải rác khắp nơi,
 * tập trung tại đây để dễ quản lý, dịch thuật và mở rộng.
 *
 * <p>Quy ước đặt tên:
 * - AUTH_*      : Lỗi liên quan xác thực
 * - ACCOUNT_*   : Lỗi tài khoản
 * - PRODUCT_*   : Lỗi sản phẩm
 * - ORDER_*     : Lỗi đơn hàng
 * - VALIDATION_*: Lỗi kiểm tra dữ liệu đầu vào
 * - SYSTEM_*    : Lỗi hệ thống
 *
 * <p>Cách dùng trong Service:
 * <pre>
 * throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
 * </pre>
 */
@Getter
public enum ErrorCode {

    // ─── AUTH ───────────────────────────────────────────────────────────────
    AUTH_INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng"),
    AUTH_ACCOUNT_LOCKED(HttpStatus.FORBIDDEN, "Tài khoản đã bị khóa. Vui lòng liên hệ Admin."),
    AUTH_ACCOUNT_NOT_VERIFIED(HttpStatus.FORBIDDEN, "Tài khoản chưa được xác thực email. Kiểm tra hộp thư của bạn."),
    AUTH_ACCOUNT_PENDING_APPROVAL(HttpStatus.FORBIDDEN, "Tài khoản đang chờ Admin phê duyệt."),
    AUTH_ACCOUNT_REJECTED(HttpStatus.FORBIDDEN, "Tài khoản đã bị từ chối. Liên hệ hỗ trợ để biết thêm."),
    AUTH_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "Token không hợp lệ hoặc đã hết hạn"),
    AUTH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Token đã hết hạn. Vui lòng đăng nhập lại."),
    AUTH_REFRESH_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "Refresh token không hợp lệ hoặc đã bị thu hồi"),
    AUTH_OTP_INVALID(HttpStatus.BAD_REQUEST, "Mã OTP không đúng"),
    AUTH_OTP_EXPIRED(HttpStatus.BAD_REQUEST, "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới."),
    AUTH_EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "Email này đã được đăng ký. Vui lòng dùng email khác."),
    AUTH_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Bạn cần đăng nhập để thực hiện thao tác này"),
    AUTH_FORBIDDEN(HttpStatus.FORBIDDEN, "Bạn không có quyền thực hiện thao tác này"),
    AUTH_RESET_TOKEN_INVALID(HttpStatus.BAD_REQUEST, "Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn"),
    AUTH_OLD_PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST, "Mật khẩu cũ không đúng"),

    // ─── ACCOUNT ────────────────────────────────────────────────────────────
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản"),
    ACCOUNT_STATUS_INVALID_TRANSITION(HttpStatus.BAD_REQUEST, "Không thể chuyển sang trạng thái này"),

    // ─── KYC ────────────────────────────────────────────────────────────────
    KYC_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy hồ sơ KYC"),
    KYC_ALREADY_SUBMITTED(HttpStatus.CONFLICT, "Hồ sơ KYC đã được nộp trước đó"),

    // ─── PRODUCT ────────────────────────────────────────────────────────────
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"),
    PRODUCT_INSUFFICIENT_STOCK(HttpStatus.BAD_REQUEST, "Số lượng sản phẩm không đủ"),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy danh mục"),

    // ─── ORDER ──────────────────────────────────────────────────────────────
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng"),
    ORDER_CANNOT_CANCEL(HttpStatus.BAD_REQUEST, "Đơn hàng ở trạng thái hiện tại không thể hủy"),
    ORDER_EMPTY_ITEMS(HttpStatus.BAD_REQUEST, "Đơn hàng phải có ít nhất một sản phẩm"),

    // ─── GROUP BUY ──────────────────────────────────────────────────────────
    GROUP_BUY_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy chiến dịch mua chung"),
    GROUP_BUY_CLOSED(HttpStatus.BAD_REQUEST, "Chiến dịch mua chung đã đóng"),
    GROUP_BUY_ALREADY_JOINED(HttpStatus.CONFLICT, "Bạn đã tham gia chiến dịch này rồi"),

    // ─── CONTRACT ───────────────────────────────────────────────────────────
    CONTRACT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy hợp đồng"),
    ESCROW_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy hợp đồng escrow"),
    FORWARD_CONTRACT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy hợp đồng tương lai"),
    SHIPMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin vận chuyển"),
    ALERT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy thông báo"),

    // ─── INVENTORY ──────────────────────────────────────────────────────────
    WAREHOUSE_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy kho hàng"),
    INVENTORY_BATCH_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy lô hàng"),

    // ─── CREDIT ─────────────────────────────────────────────────────────────
    CREDIT_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin tín dụng"),
    CREDIT_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "Vượt quá hạn mức tín dụng"),

    // ─── FILE ───────────────────────────────────────────────────────────────
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "Tải file thất bại"),
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "Không tìm thấy file"),
    FILE_TYPE_INVALID(HttpStatus.BAD_REQUEST, "Định dạng file không được hỗ trợ. Chỉ chấp nhận JPG, PNG, PDF."),
    FILE_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "File quá lớn. Tối đa 10MB."),

    // ─── SYSTEM ─────────────────────────────────────────────────────────────
    SYSTEM_INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi hệ thống. Vui lòng thử lại sau."),
    SYSTEM_VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Dữ liệu đầu vào không hợp lệ");

    /** HTTP status code trả về cho client */
    private final HttpStatus httpStatus;

    /** Thông báo lỗi bằng tiếng Việt, dễ hiểu cho người dùng */
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() { return httpStatus; }
    public String getMessage() { return message; }
}
