package com.resume.backend;

import java.util.Map;

public record ResumeEditRequest(
        Map<String, Object> resumeData,
        String jobDescription
) {
}
