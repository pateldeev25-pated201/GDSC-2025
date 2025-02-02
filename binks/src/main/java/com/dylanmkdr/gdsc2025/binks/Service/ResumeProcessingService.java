package com.dylanmkdr.gdsc2025.binks.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeProcessingService {

    // Now delegates text extraction to an external module
    public String extractTextFromResume(MultipartFile file) {
        // Stub implementation. Replace this with a call to the separate AI module.
        return "Extracted Text from resume (stub)";
    }
}
