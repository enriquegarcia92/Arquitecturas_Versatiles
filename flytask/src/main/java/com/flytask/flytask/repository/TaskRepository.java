package com.flytask.flytask.repository;

import com.flytask.flytask.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Tasks, Integer> {
}
