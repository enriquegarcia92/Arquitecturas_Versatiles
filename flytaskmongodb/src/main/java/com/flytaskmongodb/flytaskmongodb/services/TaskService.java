package com.flytaskmongodb.flytaskmongodb.services;

import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface TaskService {
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, ObjectId userId);
    public ResponseEntity<HashMap<String, Object>> createTask (TaskDto task);
    public ResponseEntity<HashMap<String, Object>> editTask(ObjectId TaskID , EditTaskDTO Task);
    public ResponseEntity<HashMap<String, Object>> deleteTask(ObjectId taskId);
    public ResponseEntity<HashMap<String, Object>> setState(ObjectId TaskID, String state);
}

