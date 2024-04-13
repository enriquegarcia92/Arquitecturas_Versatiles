package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.JwtService;
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
    public String getToken(UserDetails user){
        return getToken(new HashMap<>(), user);
    }

    @Override
    public String getUserNameFromToken(String token) {
        return getClaims(token,Claims::getSubject);
    }

    private Claims getAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
    }

    public <T> T getClaims (String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
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


    private String getToken (Map<String, Object> extraClaims, UserDetails user){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*8))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey(){
        byte [] keyBytes = Decoders.BASE64.decode("dwas82kjskasdascasckd01sdusdhf982jkdsf9882kjdf83fsdf9");
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
