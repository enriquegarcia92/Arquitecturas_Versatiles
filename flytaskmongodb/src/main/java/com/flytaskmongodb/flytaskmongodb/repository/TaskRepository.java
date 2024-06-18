package com.flytaskmongodb.flytaskmongodb.repository;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface TaskRepository extends MongoRepository<Tasks, ObjectId> {
    @Query("{$and: ["
            + "{ $or: ["
            + "{ 'title': { $regex: ?0, $options: 'i' } },"
            + "{ 'description': { $regex: ?0, $options: 'i' } }"
            + "]},"
            + "{ 'usr_id': ?2 }"
            + "]}")
    List<Tasks> searchTasksByKeywordAndStatusAndUserId(String keyword, Integer status, ObjectId userId);
}
