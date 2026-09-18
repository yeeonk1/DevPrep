package com.devprep.service;

import java.time.LocalDateTime;
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
	
	// 일정 조회
	@Transactional(readOnly = true)
	public List<ScheduleResponse> getSchedules(String userId, LocalDateTime startAt, LocalDateTime endAt) {
				
		userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

		List<Schedule> schedules = scheduleRepository.findSchedulesByPeriod(userId, startAt, endAt);
		
		return schedules.stream().map(schedule -> ScheduleResponse.builder()
				.id(schedule.getId())
				.title(schedule.getTitle())
				.content(schedule.getContent())
				.startAt(schedule.getStartAt())
				.endAt(schedule.getEndAt())
				.build())
			.toList();
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
		
		return ScheduleResponse.builder()
				.id(schedule.getId())
				.title(saved.getTitle())
				.content(saved.getContent())
				.startAt(saved.getStartAt())
				.endAt(saved.getEndAt())
				.createdAt(saved.getCreatedAt())
				.build();
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
		
		return ScheduleResponse.builder()
				.id(schedule.getId())
				.title(schedule.getTitle())
				.content(schedule.getContent())
				.startAt(schedule.getStartAt())
				.endAt(schedule.getEndAt())
				.build();
	}
	
	// 일정 삭제
	@Transactional
	public String deleteSchedule(String userId, Long scheduleId) {
		
		Schedule schedule = scheduleRepository.findById(scheduleId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정입니다."));
				
		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
				
		if (!schedule.getUser().getUserId().equals(user.getUserId())) {
					throw new IllegalArgumentException("삭제 권한이 없습니다.");
		}
		
		scheduleRepository.delete(schedule);
		
		return "";
	}
}
