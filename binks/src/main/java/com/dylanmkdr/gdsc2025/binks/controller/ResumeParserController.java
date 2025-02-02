package com.dylanmkdr.gdsc2025.binks.controller;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/parser")
public class ResumeParserController {

    private final Tika tika = new Tika();
    private final RestTemplate restTemplate;
    private static final String AI_MODULE_URL = "http://ai-module-url/api/analyze"; // Update this URL

    public ResumeParserController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/parse")
    public ResponseEntity<?> parseResume(@RequestParam("resume") MultipartFile resumeFile) {
        try {
            // Extract text using Apache Tika
            String extractedText = tika.parseToString(resumeFile.getInputStream());

            // Send extracted text to AI module
            Map<String, String> request = new HashMap<>();
            request.put("resumeText", extractedText);
            ResponseEntity<String> aiResponse = restTemplate.postForEntity(AI_MODULE_URL, request, String.class);

            return ResponseEntity.ok(aiResponse.getBody());
        } catch (IOException | TikaException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing resume.");
        }
    }
}
