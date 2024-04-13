package com.flytask.flytask.Services.ServiceImpl;
import com.flytask.flytask.Exceptions.DuplicateEmailException;
import com.flytask.flytask.Exceptions.NotFoundException;
import com.flytask.flytask.Exceptions.PasswordMismatchException;
import com.flytask.flytask.Exceptions.UnauthorizedException;
import com.flytask.flytask.Services.AuthService;
import com.flytask.flytask.Services.JwtService;
import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.LoginRequest;
import com.flytask.flytask.model.DTO.RegisterRequest;
import com.flytask.flytask.model.Role;
import com.flytask.flytask.model.User;
import com.flytask.flytask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public AuthResponse login(LoginRequest request){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Invalid email/password");
        }

        UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
        String token = jwtService.getToken(user);
        return AuthResponse.builder().token(token).name(user.getUsername()).build();
    }
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
        String token = jwtService.getToken(savedUser);
        return AuthResponse.builder().token(token).name(request.getName()).build();
    }
}
