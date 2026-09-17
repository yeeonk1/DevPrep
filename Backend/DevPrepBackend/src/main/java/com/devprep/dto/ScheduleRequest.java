package com.devprep.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ScheduleRequest {

	private String title;
	private String content;
	private LocalDateTime startAt;
	private LocalDateTime endAt;
}
