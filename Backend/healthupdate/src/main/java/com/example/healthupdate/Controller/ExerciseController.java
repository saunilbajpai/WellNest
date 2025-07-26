package com.example.healthupdate.Controller;

import com.example.healthupdate.DTO.ExerciseRequest;
import com.example.healthupdate.Services.GeminiService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ExerciseController {

    @Autowired
    private GeminiService geminiService; // make sure this is set up like your AI tip flow

    @PostMapping("/exercise")
    public String generateExercisePlan(@RequestBody ExerciseRequest request) {
        String prompt = buildPrompt(request);
        String geminiResponse = geminiService.getHealthTipFromGemini(prompt);

        try {
            JSONObject json = new JSONObject(geminiResponse);
            String tip = json
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            return tip;
        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Failed to parse AI response.";
        }
    }

    private String buildPrompt(ExerciseRequest request) {
        String goal = request.getGoal();      // "exercises" or "schedule"
        String focus = request.getFocus();    // "chest", "legs", etc.
        String weight = request.getWeight();  // as String

        StringBuilder prompt = new StringBuilder("You are a fitness AI assistant. ");

        prompt.append("The user weighs ").append(weight).append(" kg. ");

        if (goal.equals("exercises")) {
            prompt.append("Suggest 4–5 exercises targeting ")
                    .append(focus.replace("-", " "))
                    .append(". Keep it concise and beginner-friendly.");
        } else {
            prompt.append("Generate a detailed ")
                    .append(focus.equals("weekly-plan") ? "7-day" : "full-body")
                    .append(" workout schedule for this user.");
        }

        return prompt.toString();
    }
}
