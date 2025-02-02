package com.dylanmkdr.gdsc2025.binks.controller;

import com.dylanmkdr.gdsc2025.binks.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/rank")
    public String rankResumes(@RequestBody String jobDescription) {
        return aiService.rankResumes(jobDescription);
    }
}
