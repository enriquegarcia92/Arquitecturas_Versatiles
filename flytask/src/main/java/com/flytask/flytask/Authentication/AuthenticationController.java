package com.flytask.flytask.Authentication;

import com.flytask.flytask.Services.AuthService;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RecoveryDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody @Valid LoginRequest request){
        return authService.login(request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/recover-password")
    public ResponseEntity<?> recoveryPassword(@RequestParam String email){
        return authService.sendRecoveryEmail(email);
    }

    @PostMapping("/recover-authenticated")
    public ResponseEntity<?> recoveryAuthenticated(@RequestBody RecoveryDTO request){
        return authService.recoverPassword(request);
    }

    @PostMapping("/whoami")
    public ResponseEntity<?> checkToken(){
        return ResponseEntity.ok("Token valido");
    }
}
