package com.dylanmkdr.gdsc2025.binks.controller;

import com.dylanmkdr.gdsc2025.binks.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.apache.tika.exception.TikaException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
import org.springframework.http.HttpStatus;
import java.util.HashMap;


@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Long>> uploadResumeAndJob(
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("job") MultipartFile jobFile) throws TikaException {

        try {
            Map<String, Long> ids = resumeService.processResumeAndJob(resumeFile, jobFile);
            return ResponseEntity.ok(ids);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
