package com.dylanmkdr.gdsc2025.binks.dto;

public class ResumeDTO 
{
    private String fileName;
    private String extractedText;

    public ResumeDTO() {}

    public ResumeDTO(String fileName, String extractedText) 
    {
        this.fileName = fileName;
        this.extractedText = extractedText;
    }

    public String getFileName() { return fileName; }
    public String getExtractedText() { return extractedText; }
}
