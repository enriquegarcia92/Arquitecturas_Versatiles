package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RegisterRequest;

public interface AuthService {
    public AuthResponse login(LoginRequest request);
    public AuthResponse register(RegisterRequest request);
}
