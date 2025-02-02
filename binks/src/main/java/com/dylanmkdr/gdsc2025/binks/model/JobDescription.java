package com.dylanmkdr.gdsc2025.binks.model;

import jakarta.persistence.*;

@Entity
@Table(name = "job_descriptions")
public class JobDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalFileName;

    @Column(columnDefinition = "TEXT")
    private String parsedText;

    // Constructors
    public JobDescription() {}

    public JobDescription(String originalFileName, String parsedText) {
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
}
