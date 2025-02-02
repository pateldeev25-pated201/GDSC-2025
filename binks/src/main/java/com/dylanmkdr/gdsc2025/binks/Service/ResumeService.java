package com.dylanmkdr.gdsc2025.binks.service;

import com.dylanmkdr.gdsc2025.binks.util.ResumeParser;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    private final ResumeParser resumeParser;

    public ResumeService(ResumeParser resumeParser) {
        this.resumeParser = resumeParser;
    }

    public String processResume(MultipartFile file) {
        return resumeParser.extractText(file);
    }
}
