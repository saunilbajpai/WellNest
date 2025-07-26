package com.example.healthupdate.Services;

import com.example.healthupdate.Model.User;
import com.example.healthupdate.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;

    public ResponseEntity<?> registerUser(User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken.");
        }

        if (userRepo.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        // No hashing yet, we'll add later
        User savedUser = userRepo.save(user);
        return ResponseEntity.ok(savedUser);
    }

    public ResponseEntity<?> login(User loginRequest) {
        return userRepo.findByUsername(loginRequest.getUsername())
                .map(user -> {
                    if (user.getPassword().equals(loginRequest.getPassword())) {
                        return ResponseEntity.ok(user);
                    } else {
                        return ResponseEntity.status(401).body("Invalid password.");
                    }
                })
                .orElse(ResponseEntity.status(404).body("User not found."));
    }
}
