package com.dylanmkdr.gdsc2025.binks.model;


import jakarta.persistence.*;

@Entity
@Table(name = "resumes")
public class Resume 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalFileName;

    @Column(columnDefinition = "TEXT")
    private String parsedText;

    @Column(columnDefinition = "TEXT")
    private String processedText;

    @Column(columnDefinition = "TEXT")
    private String gradingReport;

    // Constructors
    public Resume() {}

    public Resume(String originalFileName, String parsedText) {
        this.originalFileName = originalFileName;
        this.parsedText = parsedText;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getParsedText() {
        return parsedText;
    }

    public void setParsedText(String parsedText) {
        this.parsedText = parsedText;
    }

    public String getProcessedText() {
        return processedText;
    }

    public void setProcessedText(String processedText) {
        this.processedText = processedText;
    }

    public String getGradingReport() {
        return gradingReport;
    }

    public void setGradingReport(String gradingReport) {
        this.gradingReport = gradingReport;
    }
}
