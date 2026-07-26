package com.vti.AccountManagement.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendApprovalEmail(String toEmail, String username) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("Tài khoản của bạn đã được duyệt");
		message.setText("Xin chào " + username + ",\n\n"
				+ "Tài khoản của bạn trên hệ thống AgriConnect đã được duyệt và kích hoạt thành công. "
				+ "Bạn có thể đăng nhập ngay bây giờ.\n\n" + "Trân trọng,\nĐội ngũ AgriConnect");
		mailSender.send(message);
	}

}
