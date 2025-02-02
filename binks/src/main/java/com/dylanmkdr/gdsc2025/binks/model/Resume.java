package com.dylanmkdr.gdsc2025.binks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String content;  // Extracted text from resume

    // Getters and Setters
    public Long getId() 
    {
        return id;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }

    public String getFileName() 
    {
        return fileName;
    }

    public void setFileName(String fileName) 
    {
        this.fileName = fileName;
    }
}

