package com.example.healthupdate.Controller;

import com.example.healthupdate.Model.HealthLog;
import com.example.healthupdate.Repositories.HealthLogRepository;
import com.example.healthupdate.Services.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import java.util.List;

@RestController
@RequestMapping("/api/tip")
@CrossOrigin(origins = "http://localhost:5173") // adjust if needed
public class TipController {

    @Autowired
    private HealthLogRepository logRepository;

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/{userId}")
    public String generateTip(@PathVariable int userId) {
        List<HealthLog> logs = logRepository.findByUserId(userId);

        if (logs.isEmpty()) {
            return "No logs available to generate a health tip.";
        }

        // Basic prompt
        StringBuilder prompt = new StringBuilder("Give a short personalized health tip based on this data:\n");

        for (HealthLog log : logs) {
            prompt.append(String.format(
                    "Date: %s, Water: %.1fL, Sleep: %.1fhrs, Steps: %d, Weight: %.1fkg\n",
                    log.getDate(), log.getWaterIntake(), log.getSleepHours(), log.getSteps(), log.getWeight()
            ));
        }

        // You can refine parsing if needed

        String geminiResponse = geminiService.getHealthTipFromGemini(prompt.toString());
        try {
            JSONObject json = new JSONObject(geminiResponse);
            String tip = json
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            return tip; // ✅ just the tip string
        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Failed to parse AI response.";
        }
    }
}
