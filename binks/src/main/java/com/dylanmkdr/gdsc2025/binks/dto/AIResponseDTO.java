package com.dylanmkdr.gdsc2025.binks.dto;

import java.util.List;

public class AIResponseDTO 
{
    private List<String> rankedResumes;

    public AIResponseDTO(List<String> rankedResumes) 
    {
        this.rankedResumes = rankedResumes;
    }

    public List<String> getRankedResumes() { return rankedResumes; }
}
