package com.dylanmkdr.gdsc2025.binks.service;

import com.dylanmkdr.gdsc2025.binks.model.JobDescription;
import com.dylanmkdr.gdsc2025.binks.model.Resume;
import com.dylanmkdr.gdsc2025.binks.repository.JobDescriptionRepository;
import com.dylanmkdr.gdsc2025.binks.repository.ResumeRepository;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
public class ResumeService {
    private final Tika tika = new Tika();
    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;

    public ResumeService(ResumeRepository resumeRepository, JobDescriptionRepository jobDescriptionRepository) {
        this.resumeRepository = resumeRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
    }

    public Resume processAndSaveResume(MultipartFile resumeFile) throws IOException, TikaException {
        String parsedText = tika.parseToString(resumeFile.getInputStream());
        Resume resume = new Resume();
        resume.setOriginalFileName(resumeFile.getOriginalFilename());
        resume.setParsedText(parsedText);
        return resumeRepository.save(resume);
    }

    public JobDescription processAndSaveJobDescription(MultipartFile jobFile) throws IOException, TikaException {
        String parsedText = tika.parseToString(jobFile.getInputStream());
        JobDescription jobDescription = new JobDescription();
        jobDescription.setOriginalFileName(jobFile.getOriginalFilename());
        jobDescription.setParsedText(parsedText);
        return jobDescriptionRepository.save(jobDescription);
    }

    public Map<String, Long> processResumeAndJob(MultipartFile resumeFile, MultipartFile jobFile) throws IOException, TikaException {
        Resume resume = processAndSaveResume(resumeFile);
        JobDescription jobDescription = processAndSaveJobDescription(jobFile);

        Map<String, Long> response = new HashMap<>();
        response.put("resumeId", resume.getId());
        response.put("jobId", jobDescription.getId());

        return response;
    }


    public String getParsedResume(Long resumeId) {
        Optional<Resume> resume = resumeRepository.findById(resumeId);
        return resume.map(Resume::getParsedText).orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    public String getJobDescription(Long jobId) {
        Optional<JobDescription> jobDescription = jobDescriptionRepository.findById(jobId);
        return jobDescription.map(JobDescription::getParsedText).orElseThrow(() -> new RuntimeException("Job description not found"));
    }

    public void saveProcessedResume(Long resumeId, String processedResume) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new RuntimeException("Resume not found"));
        resume.setProcessedText(processedResume);
        resumeRepository.save(resume);
    }

    public void saveGradingReport(Long resumeId, String gradingReport) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(() -> new RuntimeException("Resume not found"));
        resume.setGradingReport(gradingReport);
        resumeRepository.save(resume);
    }

}
