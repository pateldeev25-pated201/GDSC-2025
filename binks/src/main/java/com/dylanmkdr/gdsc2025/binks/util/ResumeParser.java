package com.dylanmkdr.gdsc2025.binks.util;

import org.apache.tika.Tika;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ResumeParser 
{

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file) 
    {
        try 
        {
            return tika.parseToString(file.getInputStream());
        } catch (Exception e) 
        {
            return "Error parsing resume.";
        }
    }
}
