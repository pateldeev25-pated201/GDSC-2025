package com.dylanmkdr.gdsc2025.binks.service;

import org.springframework.stereotype.Service;

@Service
public class AIService 
{

    public String rankResumes(String jobDescription) 
    {
        return "AI ranking results for: " + jobDescription;
    }
}
