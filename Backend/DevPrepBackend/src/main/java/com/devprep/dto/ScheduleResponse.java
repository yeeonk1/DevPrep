package com.devprep.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScheduleResponse {

	private String title;
	private String content;
	private LocalDateTime startAt;
	private LocalDateTime endAt;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
