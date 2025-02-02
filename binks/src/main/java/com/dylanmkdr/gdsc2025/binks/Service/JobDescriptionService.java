package com.dylanmkdr.gdsc2025.binks.service;

import org.springframework.stereotype.Service;

@Service
public class JobDescriptionService 
{

    public String processJobDescription(String jobDescription) 
    {
        return "Job description processed: " + jobDescription;
    }
}
