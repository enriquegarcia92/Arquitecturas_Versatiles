package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends MongoRepository<Tasks, Integer> {
    @Query("{$and: ["
            + "{ $or: ["
            + "{ 'title': { $regex: ?0, $options: 'i' } },"
            + "{ 'description': { $regex: ?0, $options: 'i' } }"
            + "]},"
            + "{ 'user.$id': ?2 }, { 'status': ?1 }"
            + "]}")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, Integer userId);
}
