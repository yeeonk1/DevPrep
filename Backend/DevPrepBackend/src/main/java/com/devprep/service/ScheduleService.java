package com.devprep.service;

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
	
	// 일정 등록
	@Transactional
	public ScheduleResponse regSchedule(String userId, ScheduleRequest req) {
		
		User user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		
		Schedule schedule = Schedule.builder()
				.title(req.getTitle())
				.content(req.getContent())
				.startAt(req.getStartAt())
				.endAt(req.getEndAt())
				.build();
				
		Schedule saved = scheduleRepository.save(schedule);
		
		return ScheduleResponse.builder()
				.title(saved.getTitle())
				.content(saved.getContent())
				.startAt(saved.getStartAt())
				.endAt(saved.getEndAt())
				.build();
	}
}
