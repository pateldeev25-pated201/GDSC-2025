package com.dylanmkdr.gdsc2025.binks.controller;

import com.dylanmkdr.gdsc2025.binks.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.apache.tika.exception.TikaException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadResumeAndJobDescription(
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobDescription") MultipartFile jobDescriptionFile) {

        try 
        {
            // Process files and send them to the AI module
            Map<String, String> result = resumeService.processResumeAndJob(resumeFile, jobDescriptionFile);
            return ResponseEntity.ok(result);
        } catch (IOException | TikaException e) 
        {
            return ResponseEntity.badRequest().body(Map.of("error", "File processing failed"));
        }
    }
}
