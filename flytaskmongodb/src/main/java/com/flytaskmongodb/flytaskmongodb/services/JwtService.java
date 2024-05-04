package com.flytaskmongodb.flytaskmongodb.services;
import com.flytaskmongodb.flytaskmongodb.model.TokenType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

public interface JwtService {

    public boolean isTokenLogin(String token);
    public String getToken(UserDetails user, TokenType tokenType);

    String getUserNameFromToken(String token);

    boolean isTokenValid(String token, UserDetails userDetails);
}
