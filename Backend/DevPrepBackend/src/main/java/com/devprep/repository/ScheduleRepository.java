package com.devprep.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devprep.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
	
	@Query("SELECT s "
			+ "FROM Schedule s "
			+ "WHERE s.user.userId = :userId "
				+ "AND s.startAt < :endAt "
				+ "AND s.endAt > :startAt "
			+ "ORDER BY s.startAt ASC")
	List<Schedule> findSchedulesByPeriod(
	        @Param("userId") String userId,
	        @Param("startAt") LocalDateTime startAt,
	        @Param("endAt") LocalDateTime endAt
	);
	
	@Query("SELECT s "
			+ "FROM Schedule s "
			+ "WHERE s.user.userId = :userId "
			+ "AND s.scheduleId = :scheduleId")
	Schedule getScheduleDetail(
			@Param("userId") String userId,
			@Param("scheduleId") Long scheduleId);
}
