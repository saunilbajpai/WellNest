package com.example.healthupdate.Controller;

import com.example.healthupdate.Services.AuthService;
import com.example.healthupdate.Services.HealthLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.healthupdate.Model.HealthLog;

@CrossOrigin("https://localhost:5173")
@RestController
@RequestMapping("/api/logs")
public class HealthController {
    private final HealthLogService healthLogService;
    @Autowired
    public HealthController( HealthLogService healthLogService) {
        this.healthLogService = healthLogService;
    }
    @PostMapping("/{userId}")
    public ResponseEntity<?> createLog(@PathVariable Long userId, @RequestBody HealthLog log) {
        return healthLogService.createHealthLog(userId, log);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserLogs(@PathVariable Long userId) {
        return healthLogService.getHealthLogsByUser(userId);
    }

    @DeleteMapping("/{logId}")
    public ResponseEntity<?> deleteLog(@PathVariable Long logId) {
        return healthLogService.deleteHealthLog(logId);
    }
}
