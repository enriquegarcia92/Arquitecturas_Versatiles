package com.flytask.flytask.Authentication;

import com.flytask.flytask.Services.AuthService;
import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RecoveryDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> Login(@RequestBody @Valid LoginRequest request){
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/recover-password")
    public ResponseEntity<?> recoveryPassword(@RequestParam String email){
        return ResponseEntity.ok(authService.sendRecoveryEmail(email));
    }

    @PostMapping("/recover-authenticated")
    public ResponseEntity<?> recoveryAuthenticated(@RequestBody RecoveryDTO request){
        return ResponseEntity.ok(authService.recoverPassword(request));
    }

    @PostMapping("/whoami")
    public ResponseEntity<?> checkToken(){
        return ResponseEntity.ok("Token valido");
    }
}
