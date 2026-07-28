package com.vti.exception;

import lombok.Getter;

/**
 * AppException — Exception tùy chỉnh cho toàn bộ business logic
 *
 * <p>Mục đích: Thay vì throw RuntimeException thô,
 * dùng AppException để kèm theo ErrorCode có sẵn HTTP status và message.
 *
 * <p>Cách dùng trong Service:
 * <pre>
 * // Tìm sản phẩm theo ID, nếu không tìm thấy → throw AppException
 * Product product = productRepository.findById(id)
 *     .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
 * </pre>
 *
 * <p>GlobalExceptionHandler sẽ bắt AppException này và trả về
 * response lỗi chuẩn với HTTP status từ ErrorCode.
 */
@Getter
public class AppException extends RuntimeException {

    /** Mã lỗi chứa HTTP status và message */
    private final ErrorCode errorCode;

    /**
     * Constructor dùng khi lỗi có sẵn message từ ErrorCode
     *
     * @param errorCode Mã lỗi định nghĩa trong enum ErrorCode
     */
    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    /**
     * Constructor dùng khi cần thêm thông tin vào message lỗi
     *
     * <p>Ví dụ: "Không tìm thấy tài khoản với ID: 123"
     *
     * @param errorCode      Mã lỗi gốc
     * @param customMessage  Thông báo tùy chỉnh thêm
     */
    public AppException(ErrorCode errorCode, String customMessage) {
        super(customMessage);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() { return errorCode; }
}
