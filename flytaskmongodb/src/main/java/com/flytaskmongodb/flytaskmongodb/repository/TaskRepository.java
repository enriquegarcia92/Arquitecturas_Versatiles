package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends MongoRepository<Tasks, Integer> {
    List<Tasks> findByTitleContainingIgnoreCaseOrDueDateGreaterThanEqualOrCreationDateGreaterThanEqualOrStatus(String keyword,Integer status, Timestamp dueDate, Timestamp creationDate);
}
