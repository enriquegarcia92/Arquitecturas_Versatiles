package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;
import com.flytaskmongodb.flytaskmongodb.Utils.MailStructureUtil;
import com.flytaskmongodb.flytaskmongodb.exceptions.*;
import com.flytaskmongodb.flytaskmongodb.model.DTO.LoginRequest;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RecoveryDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RegisterRequest;
import com.flytaskmongodb.flytaskmongodb.model.Role;
import com.flytaskmongodb.flytaskmongodb.model.TokenType;
import com.flytaskmongodb.flytaskmongodb.model.User;
import com.flytaskmongodb.flytaskmongodb.repository.UserRepository;
import com.flytaskmongodb.flytaskmongodb.services.AuthService;
import com.flytaskmongodb.flytaskmongodb.services.JwtService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
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
    public ResponseEntity<HashMap<String, Object>> sendRecoveryEmail(String email) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            UserDetails user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("User not found"));
            String token = jwtService.getToken(user, TokenType.RECOVERY);

            MailStructureUtil mailStructureUtil = new MailStructureUtil();

            javaMailSender.send(new MimeMessagePreparator() {
                @Override
                public void prepare(MimeMessage mimeMessage) throws MessagingException {
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
                    helper.setTo(email);
                    helper.setSubject("Password Recovery");
                    helper.setText(mailStructureUtil.EmailTemplate(token), true); // Set HTML content
                }
            });
            response.put("status", "success");
            response.put("message", "Recovery email send successfully");
            return ResponseEntity.status(200).body(response);
        } catch (NotFoundException | MailException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> login(LoginRequest request){
        HashMap<String, Object> response = new HashMap<>();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
            String token = jwtService.getToken(user, TokenType.LOGIN);
            response.put("token", token);
            response.put("status", "success");
            response.put("message", "Logged succesfully");
            response.put("id", userRepository.findByEmail(user.getUsername()).orElseThrow(()-> new NotFoundException("User not found")).getUserId().toHexString());
            return ResponseEntity.status(200).body(response);
        } catch (AuthenticationException e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> register(RegisterRequest request) {
        HashMap<String, Object> response = new HashMap<>();
        try {
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
            response.put("status",  "success");
            response.put("message", "User registered successfully");
            response.put("user id", savedUser.getUserId().toHexString());
            return ResponseEntity.status(200).body(response);
        } catch (PasswordMismatchException | DuplicateEmailException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            String errorMessage = "An unexpected error occurred: " + e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> recoverPassword(RecoveryDTO request) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!request.getNewPassword().equals(request.getPasswordConfirmation())) {
                throw new PasswordMismatchException("Password and confirm password do not match");
            }
            // Check if the email is already registered
            UserDetails user = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));

            User userToEdit = userRepository.findByEmail(jwtService.getUserNameFromToken(request.getToken()))
                    .orElseThrow(() -> new NotFoundException("User not found"));

            if (jwtService.isTokenLogin(request.getToken())) {
                throw new TokenNotValidRecoveryException("The token is not valid for password recovery");
            } else if (!jwtService.isTokenValid(request.getToken(), user)) {
                throw new TokenNotValidRecoveryException("Token is expired or user is locked");
            } else {
                userToEdit.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(userToEdit);
                response.put("status", "success");
                response.put("message", "Password recovered successfully");
            }
            return ResponseEntity.status(200).body(response);
        } catch (PasswordMismatchException | NotFoundException | TokenNotValidRecoveryException e) {
            // Catch specific exceptions and handle them
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

}
