package com.vti.module.account.controller;

import com.vti.common.ApiResponse;
import com.vti.util.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@Tag(name = "File Upload", description = "API upload file")
public class UploadController {

    private final FileStorageService fileStorageService;

    @Operation(summary = "Upload ảnh đại diện")
    @PostMapping("/avatar")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        // storeFile đã trả về URL đầy đủ (VD: http://localhost:8080/uploads/avatar/xxx.jpg)
        String fileUrl = fileStorageService.storeFile(file, "avatar");
        
        Map<String, String> response = new HashMap<>();
        response.put("url", fileUrl);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
