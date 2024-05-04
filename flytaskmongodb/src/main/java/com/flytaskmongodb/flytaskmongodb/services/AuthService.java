package com.flytaskmongodb.flytaskmongodb.services;
import com.flytaskmongodb.flytaskmongodb.model.DTO.AuthResponse;
import com.flytaskmongodb.flytaskmongodb.model.DTO.LoginRequest;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RecoveryDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RegisterRequest;

import java.util.HashMap;

public interface AuthService {
    public HashMap<String, Object> sendRecoveryEmail(String email);
    public AuthResponse login(LoginRequest request);
    public AuthResponse register(RegisterRequest request);
    public HashMap<String, Object> recoverPassword(RecoveryDTO request);
}
