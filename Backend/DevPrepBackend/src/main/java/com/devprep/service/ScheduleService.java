package com.devprep.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devprep.dto.ScheduleRequest;
import com.devprep.dto.ScheduleResponse;
import com.devprep.entity.Schedule;
import com.devprep.entity.User;
import com.devprep.repository.ScheduleRepository;
import com.devprep.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScheduleService {

	private final ScheduleRepository scheduleRepository;
	private final UserRepository userRepository;
	
	// 일정 조회 (달력)
	@Transactional(readOnly = true)
	public List<ScheduleResponse> getSchedulesByCalendar(String userId, LocalDateTime startAt, LocalDateTime endAt) {
				
		userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

		List<Schedule> schedules = scheduleRepository.findSchedulesByPeriod(userId, startAt, endAt);
		
		return schedules.stream()
				.map(this::toResponse)
				.toList();
	}
	
	// 일정 조회 (오늘/내일 목록)
	@Transactional(readOnly = true)
	public List<ScheduleResponse> getScheduleList(String userId) {
		
		userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		
		LocalDate today = LocalDate.now();
		LocalDateTime startAt = today.atStartOfDay();
		LocalDateTime endAt = today.plusDays(1).atTime(LocalTime.MAX);

		List<Schedule> schedules = scheduleRepository.findSchedulesByPeriod(userId, startAt, endAt);
		
		return schedules.stream()
				.map(this::toResponse)
				.toList();
	}
	
	// 일정 조회 (세부)
	public ScheduleResponse getScheduleDetail(String userId, Long scheduleId) {
		
		User user = userRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		
		Schedule schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정입니다."));
		
		if (!schedule.getUser().getUserId().equals(user.getUserId())) {
			throw new IllegalArgumentException("조회 권한이 없습니다.");
		}
		
		return toResponse(schedule);
	}
	
	// 일정 등록
	@Transactional
	public ScheduleResponse regSchedule(String userId, ScheduleRequest req) {
		
		userRepository.findByUserId(userId)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		
		Schedule schedule = Schedule.builder()
				.title(req.getTitle())
				.content(req.getContent())
				.startAt(req.getStartAt())
				.endAt(req.getEndAt())
				.createdAt(LocalDateTime.now())
				.build();
				
		Schedule saved = scheduleRepository.save(schedule);
		
		return toResponse(saved);
	}
	
	// 일정 수정
	@Transactional
	public ScheduleResponse updateSchedule(String userId, ScheduleRequest req, Long scheduleId) {
		
		Schedule schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정입니다."));
		
		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		
		if (!schedule.getUser().getUserId().equals(user.getUserId())) {
			throw new IllegalArgumentException("수정 권한이 없습니다.");
		}
		
		schedule.setTitle(req.getTitle());
		schedule.setContent(req.getContent());
		schedule.setStartAt(req.getStartAt());
		schedule.setEndAt(req.getEndAt());
		schedule.setUpdatedAt(LocalDateTime.now());
		
		return toResponse(schedule);
	}
	
	// 일정 삭제
	@Transactional
	public void deleteSchedule(String userId, Long scheduleId) {
		
		Schedule schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정입니다."));
				
		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
				
		if (!schedule.getUser().getUserId().equals(user.getUserId())) {
					throw new IllegalArgumentException("삭제 권한이 없습니다.");
		}
		
		scheduleRepository.delete(schedule);
	}
	
	private ScheduleResponse toResponse(Schedule schedule) {
	    return ScheduleResponse.builder()
	            .id(schedule.getId())
	            .title(schedule.getTitle())
	            .content(schedule.getContent())
	            .startAt(schedule.getStartAt())
	            .endAt(schedule.getEndAt())
	            .build();
	}
}
