package com.vti.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service tiện ích để gửi email.
 */
@Service
public class EmailService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.username:noreply@agriconnect.com}")
    private String fromEmail;

    /**
     * Gửi email mã xác thực OTP.
     * 
     * @param toEmail Email người nhận
     * @param otp Mã xác thực
     */
    @Async
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("[AgriConnect] Mã xác thực tài khoản");
            
            String htmlContent = "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>"
                    + "<h2>Xác thực tài khoản AgriConnect</h2>"
                    + "<p>Xin chào,</p>"
                    + "<p>Mã xác thực của bạn là: <strong><span style='font-size: 24px; color: #4CAF50;'>" + otp + "</span></strong></p>"
                    + "<p>Mã này sẽ hết hạn sau 10 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>"
                    + "<br>"
                    + "<p>Trân trọng,<br>Đội ngũ AgriConnect</p>"
                    + "</div>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Đã gửi email chứa mã OTP đến: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Lỗi khi gửi email OTP đến {}: {}", toEmail, e.getMessage());
        }
    }

    /**
     * Gửi email chứa đường dẫn đặt lại mật khẩu.
     * 
     * @param toEmail Email người nhận
     * @param resetLink Đường dẫn đặt lại mật khẩu
     */
    @Async
    public void sendPasswordResetEmail(String toEmail, String resetLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("[AgriConnect] Đặt lại mật khẩu");
            
            String htmlContent = "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>"
                    + "<h2>Yêu cầu đặt lại mật khẩu</h2>"
                    + "<p>Xin chào,</p>"
                    + "<p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>"
                    + "<p>Vui lòng click vào đường dẫn bên dưới để thiết lập mật khẩu mới:</p>"
                    + "<p><a href='" + resetLink + "' style='display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;'>Đặt lại mật khẩu</a></p>"
                    + "<p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>"
                    + "<br>"
                    + "<p>Trân trọng,<br>Đội ngũ AgriConnect</p>"
                    + "</div>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Đã gửi email đặt lại mật khẩu đến: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Lỗi khi gửi email đặt lại mật khẩu đến {}: {}", toEmail, e.getMessage());
        }
    }

    /**
     * Gửi email chào mừng khi tài khoản được phê duyệt.
     * 
     * @param toEmail Email người nhận
     * @param fullName Tên đầy đủ
     */
    @Async
    public void sendWelcomeEmail(String toEmail, String fullName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("[AgriConnect] Chào mừng bạn gia nhập");
            
            String htmlContent = "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>"
                    + "<h2>Chào mừng " + fullName + " gia nhập AgriConnect</h2>"
                    + "<p>Tài khoản của bạn đã được phê duyệt thành công.</p>"
                    + "<p>Bây giờ bạn có thể bắt đầu sử dụng các dịch vụ của chúng tôi.</p>"
                    + "<br>"
                    + "<p>Trân trọng,<br>Đội ngũ AgriConnect</p>"
                    + "</div>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Đã gửi email chào mừng đến: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Lỗi khi gửi email chào mừng đến {}: {}", toEmail, e.getMessage());
        }
    }
}
