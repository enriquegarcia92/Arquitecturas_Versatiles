package com.flytaskmongodb.flytaskmongodb.authentication;
import com.flytaskmongodb.flytaskmongodb.model.DTO.AuthResponse;
import com.flytaskmongodb.flytaskmongodb.model.DTO.LoginRequest;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RecoveryDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.RegisterRequest;
import com.flytaskmongodb.flytaskmongodb.services.AuthService;
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
