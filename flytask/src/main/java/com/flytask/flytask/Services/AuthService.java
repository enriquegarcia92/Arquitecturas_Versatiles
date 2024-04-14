package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RecoveryDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;

import java.util.HashMap;

public interface AuthService {
    public HashMap<String, Object> sendRecoveryEmail(String email);
    public AuthResponse login(LoginRequest request);
    public AuthResponse register(RegisterRequest request);
    public HashMap<String, Object> recoverPassword(RecoveryDTO request);
}
