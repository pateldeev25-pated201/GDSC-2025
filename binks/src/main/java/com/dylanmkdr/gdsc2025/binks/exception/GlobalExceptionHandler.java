package com.dylanmkdr.gdsc2025.binks.exception;

import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler 
{

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e)
    {
        return "Error: " + e.getMessage();
    }
}
