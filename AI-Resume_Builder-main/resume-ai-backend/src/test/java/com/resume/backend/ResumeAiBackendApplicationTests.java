package com.resume.backend;

import com.resume.backend.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class ResumeAiBackendApplicationTests {

	@Autowired
	private ResumeService resumeservice;
	@Test
	void contextLoads() throws IOException {
		resumeservice.generateResumeResponse("I am Ayushmaan singh with two year of java experience");
	}

}
