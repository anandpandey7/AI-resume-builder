package com.resume.backend.service;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;
    Map<String, Object> editResumeForJobDescription(Map<String, Object> resumeData, String jobDescription) throws IOException;
    Map<String, Object> generateInterviewQuestions(Map<String, Object> resumeData) throws IOException;
}
