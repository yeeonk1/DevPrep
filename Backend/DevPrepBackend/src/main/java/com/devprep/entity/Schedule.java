package com.devprep.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String content;
	
	@Column(nullable = false)
	private LocalDateTime startAt;
	
	@Column(nullable = false)
	private LocalDateTime endAt;
	
	@Column(nullable = true)
	private LocalDateTime createdAt;
	
	@Column(nullable = true)
	private LocalDateTime updatedAt;
}
