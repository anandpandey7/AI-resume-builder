package com.resume.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resume.backend.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
	List<Resume> findByUserIdOrderByCreatedAtDesc(Long userId);

}
