package com.vti.util;

import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Service tiện ích để lưu trữ và quản lý file.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageService {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.upload.base-url:http://localhost:8080/files/}")
    private String baseUrl;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "pdf");

    /**
     * Lưu trữ tệp tin tải lên.
     * 
     * @param file Tệp tin tải lên
     * @param subFolder Thư mục con để lưu trữ (ví dụ: avatar, document)
     * @return URL của tệp tin có thể truy cập
     */
    public String storeFile(MultipartFile file, String subFolder) {
        if (file.isEmpty()) {
            // throw new AppException(ErrorCode.FILE_EMPTY);
            throw new RuntimeException("Tệp tin trống"); // Tạm throw RuntimeException để build pass nếu chưa có ErrorCode
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "");
        String fileExtension = getFileExtension(originalFilename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
            System.err.println("Loại file không được hỗ trợ: " + fileExtension);
            // throw new AppException(ErrorCode.UNSUPPORTED_FILE_TYPE);
            throw new RuntimeException("Định dạng file không hỗ trợ: " + fileExtension);
        }

        try {
            // Đảm bảo thư mục tồn tại
            Path uploadPath = Paths.get(uploadDir, subFolder).toAbsolutePath().normalize();
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Tạo tên tệp độc nhất
            String newFileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path targetLocation = uploadPath.resolve(newFileName);

            // Lưu tệp
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File saved successfully at: " + targetLocation);

            // Trả về URL truy cập
            return baseUrl + subFolder + "/" + newFileName;
        } catch (IOException ex) {
            System.err.println("Failed to store file " + originalFilename + ". Error: " + ex.getMessage());
            // throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
            throw new RuntimeException("Lỗi lưu file");
        }
    }

    /**
     * Xóa tệp tin khỏi hệ thống lưu trữ.
     * 
     * @param fileUrl URL của tệp tin cần xóa
     */
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || !fileUrl.startsWith(baseUrl)) {
            System.err.println("URL tệp không hợp lệ hoặc không thuộc hệ thống quản lý: " + fileUrl);
            return;
        }

        try {
            String relativePath = fileUrl.substring(baseUrl.length());
            Path filePath = Paths.get(uploadDir, relativePath).toAbsolutePath().normalize();

            if (Files.exists(filePath)) {
                Files.delete(filePath);
                System.out.println("File deleted successfully: " + filePath);
            } else {
                System.err.println("Không tìm thấy file để xóa: " + filePath);
            }
        } catch (IOException ex) {
            System.err.println("Error occurred while deleting file " + fileUrl + ": " + ex.getMessage());
        }
    }

    /**
     * Lấy phần mở rộng của tên tệp.
     * 
     * @param filename Tên tệp
     * @return Phần mở rộng
     */
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
