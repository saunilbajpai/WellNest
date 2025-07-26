package com.example.healthupdate.Controller;

import java.util.*;
import com.example.healthupdate.Model.User;
import com.example.healthupdate.Repositories.UserRepository;
import com.example.healthupdate.Services.AuthService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;
    UserRepository userRepo;
    @Autowired
    public AuthController(AuthService authService, UserRepository userRepo) {
        this.authService = authService;
        this.userRepo = userRepo;
    }
    @PostMapping("/register")
    public ResponseEntity<?> registeruser(@RequestBody User user) {
        return authService.registerUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginuser(@RequestBody User LoginRequest) {
        return authService.login(LoginRequest);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("token");

            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String email = decodedToken.getEmail();
            String name = decodedToken.getName();

            // Check if user already exists
            Optional<User> userOpt = userRepo.findByEmail(email);
            User user = userOpt.orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUsername(name);
                newUser.setPassword("firebase"); // placeholder, since no password
                return userRepo.save(newUser);
            });

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid Firebase token");
        }
    }

}
