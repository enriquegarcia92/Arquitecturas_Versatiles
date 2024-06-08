package com.flytaskmongodb.flytaskmongodb.services;

import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface TaskService {
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, Integer userId);
    public ResponseEntity<HashMap<String, Object>> createTask (TaskDto task);
    public ResponseEntity<HashMap<String, Object>> editTask(Integer TaskID , EditTaskDTO Task);
    public ResponseEntity<HashMap<String, Object>> deleteTask(Integer taskId);
    public ResponseEntity<HashMap<String, Object>> setTodo(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setDoing(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setDone(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setUpcoming(Integer TaskID);
}

