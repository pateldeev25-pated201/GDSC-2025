package com.dylanmkdr.gdsc2025.binks.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class OpenAIConfig 
{

    @Value("${openai.api.key}")
    private String apiKey;

    public String getApiKey() 
    {
        return apiKey;
    }
}
