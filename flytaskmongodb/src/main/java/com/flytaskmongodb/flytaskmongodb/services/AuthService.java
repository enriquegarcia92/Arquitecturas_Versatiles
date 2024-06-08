package com.flytaskmongodb.flytaskmongodb.services;
import com.flytaskmongodb.flytaskmongodb.model.DTO.LoginRequest;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RecoveryDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RegisterRequest;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface AuthService {
    public ResponseEntity<HashMap<String, Object>> sendRecoveryEmail(String email);
    public ResponseEntity<HashMap<String, Object>> login(LoginRequest request);
    public ResponseEntity<HashMap<String, Object>> register(RegisterRequest request);
    public ResponseEntity<HashMap<String, Object>> recoverPassword(RecoveryDTO request);
}
