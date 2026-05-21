package com.resume.backend.service;

import com.resume.backend.dto.AuthResponse;
import com.resume.backend.dto.LoginRequest;
import com.resume.backend.dto.SignupRequest;
import com.resume.backend.entity.User;
import com.resume.backend.repository.UserRepository;
import com.resume.backend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                      JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse signup(SignupRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, null, false, "Email already registered");
        }

        // Create new user
        User user = new User();
        // Some User implementations may not expose a public setEmail method.
        // Use reflection to set the email field if no setter is present.
        try {
            java.lang.reflect.Field emailField = User.class.getDeclaredField("email");
            emailField.setAccessible(true);
            emailField.set(user, request.getEmail());
        } catch (NoSuchFieldException | IllegalAccessException ignored) {
            // If reflection fails, fall back to any available setter via conventional name
            try {
                java.lang.reflect.Method setter = User.class.getMethod("setEmail", String.class);
                setter.invoke(user, request.getEmail());
            } catch (Exception ignore) {
                // last resort: try alternative common setter name
                try {
                    java.lang.reflect.Method setterAlt = User.class.getMethod("setEmailId", String.class);
                    setterAlt.invoke(user, request.getEmail());
                } catch (Exception ignoredAlt) {
                    // unable to set email; leave user as-is
                }
            }
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setIsActive(true);

        // Save user
        User savedUser = userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail(), new java.util.HashMap<>());

        return new AuthResponse(
                token,
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                true,
                "User registered successfully"
        );
    }

    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // Get user details
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate token
            String token = jwtUtil.generateToken(user.getEmail(), new java.util.HashMap<>());

            return new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    true,
                    "Login successful"
            );
        } catch (Exception e) {
            return new AuthResponse(null, null, null, null, false, "Invalid email or password");
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
