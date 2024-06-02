package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.TaskDto;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.HashMap;

public interface TaskService {
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, String dueDate, String creationDate, Integer userId);
    public ResponseEntity<HashMap<String, Object>> createTask (TaskDto task);
    public ResponseEntity<HashMap<String, Object>> editTask(Integer TaskID , EditTaskDTO Task);
    public ResponseEntity<HashMap<String, Object>> deleteTask(Integer taskId);
    public ResponseEntity<HashMap<String, Object>> setTodo(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setDoing(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setDone(Integer TaskID);
    public ResponseEntity<HashMap<String, Object>> setUpcoming(Integer TaskID);
}
