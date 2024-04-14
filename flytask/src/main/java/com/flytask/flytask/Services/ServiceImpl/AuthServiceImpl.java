package com.flytask.flytask.Services.ServiceImpl;
import com.flytask.flytask.Exceptions.*;
import com.flytask.flytask.Services.AuthService;
import com.flytask.flytask.Services.JwtService;
import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RecoveryDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import com.flytask.flytask.model.Role;
import com.flytask.flytask.model.TokenType;
import com.flytask.flytask.model.User;
import com.flytask.flytask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public HashMap<String, Object> sendRecoveryEmail(String email) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            UserDetails user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
            String token = jwtService.getToken(user, TokenType.RECOVERY);
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);
            msg.setSubject("Password Recovery");
            msg.setText("Your password recovery token is: " + token);
            javaMailSender.send(msg);
            response.put("status", "success");
            response.put("message", "Password recovery email sent successfully.");
        } catch (NotFoundException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        } catch (MailException e) {
            response.put("status", "error");
            response.put("message", "Failed to send password recovery email.");
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public AuthResponse login(LoginRequest request){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Invalid email/password");
        }

        UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
        String token = jwtService.getToken(user, TokenType.LOGIN);
        return AuthResponse.builder().token(token).name(user.getUsername()).build();
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("Password and confirm password do not match");
        }
        // Check if the email is already registered
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }

        // Create a new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENT)
                .build();

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Generate token and build AuthResponse
        String token = jwtService.getToken(savedUser, TokenType.LOGIN);
        return AuthResponse.builder().token(token).name(request.getName()).build();
    }

    @Override
    public HashMap<String, Object> recoverPassword(RecoveryDTO request){
        HashMap<String, Object> response = new HashMap<>();
        try{
            if (!request.getNewPassword().equals(request.getPasswordConfirmation())) {
                throw new PasswordMismatchException("Password and confirm password do not match");
            }
            // Check if the email is already registered
            UserDetails user = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));
            User userToEdit = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));
            if(jwtService.isTokenLogin(request.getToken())){
                throw new TokenNotValidRecoveryException("The token is not valid for password recovery");
            }else if(!jwtService.isTokenValid(request.getToken(), user)){
                throw new TokenNotValidRecoveryException("Token is expired or user is locked");
            }else{
                userToEdit.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(userToEdit);
                response.put("message", "success");
                response.put("message", "Password recovered successfully");
            }
        }catch (PasswordMismatchException e){
            response.put("status", "error");
            response.put("message", e.getMessage());
        } catch (NotFoundException e){
            response.put("status", "error");
            response.put("message", e.getMessage());
        }catch (TokenNotValidRecoveryException e){
            response.put("status", "error");
            response.put("message", e.getMessage());
        }catch (Exception e){
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }
}
