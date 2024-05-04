package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends MongoRepository<Tasks, Integer> {
    @Query("SELECT t FROM Tasks t WHERE " +
            "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "t.dueDate >= :dueDate OR " +
            "t.creationDate >= :creationDate OR " +
            "t.status = :status")
    List<Tasks> searchTasksByKeywordAndStatus(String keyword, Integer status, Timestamp dueDate, Timestamp creationDate);
}
