package com.dylanmkdr.gdsc2025.binks.controller;

import com.dylanmkdr.gdsc2025.binks.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController 
{
    private final ResumeService resumeService;

    public AIController(ResumeService resumeService) 
    {
        this.resumeService = resumeService;
    }

    @GetMapping("/resume/{resumeId}")
    public ResponseEntity<String> getParsedResume(@PathVariable Long resumeId) 
    {
        String resumeText = resumeService.getParsedResume(resumeId);
        return ResponseEntity.ok(resumeText);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<String> getJobDescription(@PathVariable Long jobId) 
    {
        String jobText = resumeService.getJobDescription(jobId);
        return ResponseEntity.ok(jobText);
    }

    @PostMapping("/processed/resume/{resumeId}")
    public ResponseEntity<String> uploadProcessedResume(
            @PathVariable Long resumeId,
            @RequestBody String processedResume) {
        
        resumeService.saveProcessedResume(resumeId, processedResume);
        return ResponseEntity.ok("Processed resume received.");
    }
    
    @PostMapping("/grading/{resumeId}")
    public ResponseEntity<String> uploadGradingReport(
            @PathVariable Long resumeId,
            @RequestBody String gradingReport) {
    
        resumeService.saveGradingReport(resumeId, gradingReport);
        return ResponseEntity.ok("Grading report received.");
    }


}
