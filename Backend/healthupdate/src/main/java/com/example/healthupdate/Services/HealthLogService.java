package com.example.healthupdate.Services;


import com.example.healthupdate.Model.HealthLog;
import com.example.healthupdate.Model.User;
import com.example.healthupdate.Repositories.HealthLogRepository;
import com.example.healthupdate.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthLogService {
    private final HealthLogRepository healthLogRepo;
    private final UserRepository userRepo;

    public ResponseEntity<?> createHealthLog(Long userId, HealthLog log) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        log.setUser(user);
        log.setDate(LocalDate.now());
        HealthLog savedLog = healthLogRepo.save(log);
        return ResponseEntity.ok(savedLog);
    }

    public ResponseEntity<?> getHealthLogsByUser(Long userId) {
        if (!userRepo.existsById(userId)) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        List<HealthLog> logs = healthLogRepo.findByUserIdOrderByDateDesc(Math.toIntExact(userId));
        return ResponseEntity.ok(logs);
    }
    public ResponseEntity<?> deleteHealthLog(Long logId) {
        if (!healthLogRepo.existsById(logId)) {
            return ResponseEntity.notFound().build();
        }

        healthLogRepo.deleteById(logId);
        return ResponseEntity.ok("Log deleted successfully.");
    }
}
