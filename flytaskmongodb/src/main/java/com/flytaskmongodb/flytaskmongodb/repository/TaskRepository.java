package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends MongoRepository<Tasks, Integer> {
    @Query("{$and: ["
            + "{ $or: ["
            + "{ 'creationDate': { $eq: ?3 } },"
            + "{ 'dueDate': { $eq: ?2 } },"
            + "{ 'title': { $regex: ?0, $options: 'i' } },"
            + "{ 'description': { $regex: ?0, $options: 'i' } }"
            + "]},"
            + "{ 'user.$id': ?4 }, { 'status': ?1 }"
            + "]}")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, Timestamp dueDate, Timestamp creationDate, Integer userId);
}
