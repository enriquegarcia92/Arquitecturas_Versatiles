package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;
import com.flytaskmongodb.flytaskmongodb.Utils.MailStructureUtil;
import com.flytaskmongodb.flytaskmongodb.exceptions.*;
import com.flytaskmongodb.flytaskmongodb.model.DTO.AuthResponse;
import com.flytaskmongodb.flytaskmongodb.model.DTO.LoginRequest;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RecoveryDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RegisterRequest;
import com.flytaskmongodb.flytaskmongodb.model.Role;
import com.flytaskmongodb.flytaskmongodb.model.TokenType;
import com.flytaskmongodb.flytaskmongodb.model.User;
import com.flytaskmongodb.flytaskmongodb.repository.UserRepository;
import com.flytaskmongodb.flytaskmongodb.services.AuthService;
import com.flytaskmongodb.flytaskmongodb.services.JwtService;
import com.flytaskmongodb.flytaskmongodb.services.SequenceGeneratorService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
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
    @Autowired
    private MongoOperations mongoOperations;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;
    @Override
    public HashMap<String, Object> sendRecoveryEmail(String email) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            UserDetails user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
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
        return AuthResponse.builder().token(token).name(user.getUsername()).id(userRepository.findByEmail(user.getUsername()).orElseThrow(()-> new NotFoundException("User not found")).getUserId()).build();
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
                .userId(sequenceGeneratorService.generarIdSecuencial(User.SEQUENCE_NAME))
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENT)
                .build();
        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Generate token and build AuthResponse
        String token = jwtService.getToken(savedUser, TokenType.LOGIN);
        return AuthResponse.builder().token(token).name(request.getName()).id(userRepository.findByEmail(user.getUsername()).orElseThrow(()-> new NotFoundException("User not found")).getUserId()).build();
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
