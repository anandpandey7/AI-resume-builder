package com.resume.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.backend.dto.AuthResponse;
import com.resume.backend.dto.LoginRequest;
import com.resume.backend.dto.SignupRequest;
import com.resume.backend.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.signup(request);

        if (authResponse.getSuccess()) {
            // Set JWT token as HTTP-only cookie
            response.addHeader("Set-Cookie",
                    String.format("jwtToken=%s; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400",
                            authResponse.getToken()));
        }

        return new ResponseEntity<>(authResponse, 
                authResponse.getSuccess() ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request);

        if (authResponse.getSuccess()) {
            // Set JWT token as HTTP-only cookie
            response.addHeader("Set-Cookie",
                    String.format("jwtToken=%s; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400",
                            authResponse.getToken()));
        }

        return new ResponseEntity<>(authResponse,
                authResponse.getSuccess() ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Clear the JWT token cookie
        response.addHeader("Set-Cookie", "jwtToken=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    @GetMapping("/verify")
    public ResponseEntity<AuthResponse> verifyToken() {
        return new ResponseEntity<>(
                new AuthResponse(null, null, null, null, true, "Token is valid"),
                HttpStatus.OK
        );
    }
}
