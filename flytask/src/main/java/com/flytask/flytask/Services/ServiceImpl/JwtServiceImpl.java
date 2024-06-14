package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.JwtService;
import com.flytask.flytask.model.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${SECRETKEY}")
    private String secretKey;
    public String getToken(UserDetails user, TokenType tokenType){
        return getToken(new HashMap<>(), user, tokenType);
    }

    @Override
    public String getUserNameFromToken(String token) {
        return getClaims(token,Claims::getSubject);
    }

    private Claims getAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes())).build().parseClaimsJws(token).getBody();
    }

    public <T> T getClaims (String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public boolean isTokenLogin(String token) {
        Claims claims = getAllClaims(token);
        String tokenType = (String) claims.get("tokenType");
        return tokenType != null && tokenType.equals("LOGIN");
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUserNameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired (String token){
        return getExpiration(token).before(new Date());
    }

    private Date getExpiration(String token){
        return getClaims(token, Claims::getExpiration);
    }


    public String getToken(Map<String, Object> extraClaims, UserDetails user, TokenType tokenType) {
        Date now = new Date();
        long expirationMillis;

        // Set expiration based on token type
        if (tokenType == TokenType.RECOVERY) {
            expirationMillis = now.getTime() + 1000 * 60 * 20; // 20 minutes
            extraClaims.put("tokenType", TokenType.RECOVERY);
        } else {
            expirationMillis = now.getTime() + 1000 * 60 * 60 * 4; // 4 hours
            extraClaims.put("tokenType", TokenType.LOGIN);
        }

        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getBytes());

        System.out.println(encodedKey); // Print encoded key

        return Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(now)
                .setExpiration(new Date(expirationMillis))
                .signWith(SignatureAlgorithm.HS256, encodedKey)
                .compact();
    }
}
