package com.resume.backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.ResumeEditRequest;
import com.resume.backend.ResumeRequest;
import com.resume.backend.entity.Resume;
import com.resume.backend.entity.User;
import com.resume.backend.repository.ResumeRepository;
import com.resume.backend.repository.UserRepository;
import com.resume.backend.service.ResumeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ObjectMapper objectMapper;

    public ResumeController(ResumeService resumeService, UserRepository userRepository, ResumeRepository resumeRepository, ObjectMapper objectMapper) {
        this.resumeService = resumeService;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String,Object>> getResumeData(
            @RequestBody ResumeRequest resumeRequest
    ) throws IOException {
        Map<String, Object> stringObjectMap =  resumeService.generateResumeResponse(resumeRequest.userDescription());
        return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<Map<String,Object>> editResumeForJobDescription(
            @RequestBody ResumeEditRequest editRequest
    ) throws IOException {
        Map<String, Object> editedResume = resumeService.editResumeForJobDescription(editRequest.resumeData(), editRequest.jobDescription());
        return ResponseEntity.ok(editedResume);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveResumeForUser(@RequestBody Map<String, Object> resumeResponse) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // persist the entire response as JSON
        String json = objectMapper.writeValueAsString(resumeResponse);

        // determine title: prefer top-level "title", then data.personalInformation.fullName, then fallback
        String title = null;
        Object titleObj = resumeResponse.get("title");
        if (titleObj instanceof String) {
            title = ((String) titleObj).trim();
        }

        if (title == null || title.isEmpty()) {
            Object dataObj = resumeResponse.get("data");
            if (dataObj instanceof Map) {
                Object personalObj = ((Map<?, ?>) dataObj).get("personalInformation");
                if (personalObj instanceof Map) {
                    Object fullName = ((Map<?, ?>) personalObj).get("fullName");
                    if (fullName instanceof String && !((String) fullName).isBlank()) {
                        title = "Resume - " + ((String) fullName).trim();
                    }
                }
            }
        }

        if (title == null || title.isBlank()) {
            title = "Resume for " + user.getFirstName() + " " + user.getLastName();
        }

        Resume resume = new Resume();
        resume.setUser(user);
        resume.setResumeJson(json);
        resume.setTitle(title);

        Resume saved = resumeRepository.save(resume);

        Map<String, Object> resp = Map.of(
                "userId", user.getId(),
                "resumeId", saved.getId(),
                "title", saved.getTitle()
        );

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/list")
        public ResponseEntity<List<Map<String, Object>>> listSavedResumes() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Resume> resumes =
                resumeRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        List<Map<String, Object>> result = resumes.stream().map(r -> {

            Map<String, Object> map = new HashMap<>();

            map.put("resumeId", r.getId());
            map.put("title", r.getTitle());
            map.put("createdAt",
                    r.getCreatedAt() != null
                            ? r.getCreatedAt().toString()
                            : null);

            return map;

        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getResumeById(@PathVariable Long id) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Resume resume = resumeRepository.findById(id).orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Map<String, Object> responseData = objectMapper.readValue(resume.getResumeJson(), new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        return ResponseEntity.ok(responseData);
    }
}
