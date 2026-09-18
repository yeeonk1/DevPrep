package com.devprep.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devprep.dto.ScheduleRequest;
import com.devprep.dto.ScheduleResponse;
import com.devprep.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {

	private final ScheduleService scheduleService;
	
	@GetMapping("/calendar")
	public ResponseEntity<List<ScheduleResponse>> getSchedules(
			@RequestParam("userId") String userId,
			@RequestParam("startAt") LocalDateTime startAt,
			@RequestParam("endAt") LocalDateTime endAt) {
		
		List<ScheduleResponse> schedule = scheduleService.getSchedules(userId, startAt, endAt);
		
		return ResponseEntity.ok(schedule);
	}
	
	@PostMapping("/regist")
	public ResponseEntity<String> registSchedule(
			@RequestParam("userId") String userId,
			@RequestBody ScheduleRequest req) {
		
		scheduleService.regSchedule(userId, req);
		
		return ResponseEntity.ok("일정이 성공적으로 등록되었습니다.");
	}
	
	@PutMapping("/edit")
	public ResponseEntity<String> updateSchedule(
			@RequestParam("scheduleId") Long scheduleId,
			@RequestParam("userId") String userId,
			@RequestBody ScheduleRequest req) {
		
		scheduleService.updateSchedule(userId, req, scheduleId);
		
		return ResponseEntity.ok("일정이 성공적으로 수정되었습니다.");
	}
	
	public String deleteSchedule(
			@RequestParam("scheduleId") Long scheduleId,
			@RequestParam("userId") String userId) {
		
		scheduleService.deleteSchedule(userId, scheduleId);
		
		return "일정이 성공적으로 삭제되었습니다.";
	}
}
