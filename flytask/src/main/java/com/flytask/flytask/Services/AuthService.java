package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RecoveryDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface AuthService {
    public ResponseEntity<HashMap<String, Object>> sendRecoveryEmail(String email);
    public ResponseEntity<HashMap<String, Object>> login(LoginRequest request);
    public ResponseEntity<HashMap<String, Object>> register(RegisterRequest request);
    public ResponseEntity<HashMap<String, Object>> recoverPassword(RecoveryDTO request);
}
