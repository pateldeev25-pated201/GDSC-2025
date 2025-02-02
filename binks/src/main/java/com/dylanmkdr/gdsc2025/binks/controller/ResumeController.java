package com.dylanmkdr.gdsc2025.binks.controller;

import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import com.dylanmkdr.gdsc2025.binks.util.MultipartInputStreamFileResource;

import java.io.IOException;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final RestTemplate restTemplate;
    private static final String PARSER_URL = "http://localhost:8080/api/parser/parse"; // Update if necessary

    public ResumeController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(@RequestParam("resume") MultipartFile resumeFile) {
        try {
            // Create request to send file to ResumeParserController
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("resume", new MultipartInputStreamFileResource(resumeFile));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Forward file to ResumeParserController
            ResponseEntity<String> response = restTemplate.exchange(PARSER_URL, HttpMethod.POST, requestEntity, String.class);

            return ResponseEntity.ok(response.getBody());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing resume.");
        }
    }
}
