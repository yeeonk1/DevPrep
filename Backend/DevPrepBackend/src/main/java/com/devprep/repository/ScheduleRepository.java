package com.devprep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devprep.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{

	// 일정 조회
	List<Schedule> findByUser_UserId(String userId);
}
