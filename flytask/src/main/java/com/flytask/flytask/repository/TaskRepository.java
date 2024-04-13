package com.flytask.flytask.repository;

import com.flytask.flytask.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends JpaRepository<Tasks, Integer> {
    @Query("SELECT t FROM Tasks t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "t.dueDate >= :dueDate OR " +
            "t.creationDate >= :creationDate OR " +
            "t.status = :status")
    List<Tasks> searchTasksByKeywordAndStatus(String keyword, Integer status, Timestamp dueDate, Timestamp creationDate);
}

