package com.devprep.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devprep.entity.Schedule;
import com.devprep.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserId(String userId);
}
