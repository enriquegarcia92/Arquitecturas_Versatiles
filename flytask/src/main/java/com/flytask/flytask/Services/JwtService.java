package com.flytask.flytask.Services;

import com.flytask.flytask.Services.ServiceImpl.JwtServiceImpl;
import com.flytask.flytask.model.TokenType;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    public boolean isTokenLogin(String token);
    public String getToken(UserDetails user, TokenType tokenType);

    String getUserNameFromToken(String token);

    boolean isTokenValid(String token, UserDetails userDetails);
}
