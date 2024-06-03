package com.flytask.flytask.repository;

import com.flytask.flytask.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends JpaRepository<Tasks, Integer> {
    @Query("SELECT t FROM Tasks t JOIN t.user u WHERE " +
            "u.userId = :userId AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "t.status = :status)")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, Integer userId);

}

