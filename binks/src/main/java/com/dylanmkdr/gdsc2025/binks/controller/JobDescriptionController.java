package com.dylanmkdr.gdsc2025.binks.controller;

import com.dylanmkdr.gdsc2025.binks.service.JobDescriptionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobDescriptionController {

    private final JobDescriptionService jobService;

    public JobDescriptionController(JobDescriptionService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/add")
    public String addJobDescription(@RequestBody String jobDescription) {
        return jobService.processJobDescription(jobDescription);
    }
}

