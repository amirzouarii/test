package com.example.neo.service;

import com.example.neo.User;
import com.example.neo.dto.AuthRequest;
import com.example.neo.dto.AuthResponse;
import com.example.neo.dto.RegisterRequest;
import com.example.neo.repository.UserRepository;
import com.example.neo.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Créer le nouvel utilisateur
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setMessages(new ArrayList<>());

        // Sauvegarder
        user = userRepository.save(user);

        // Générer le token
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token, user.getEmail(), user.getName(), "Registration successful");
    }

    public AuthResponse login(AuthRequest request) {
        // Authentifier
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // Récupérer l'utilisateur
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Générer le token
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token, user.getEmail(), user.getName(), "Login successful");
    }
}