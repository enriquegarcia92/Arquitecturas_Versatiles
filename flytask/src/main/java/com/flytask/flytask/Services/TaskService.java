package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.TaskDto;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.HashMap;

public interface TaskService {
    public HashMap<String, Object> searchTasksByKeywordAndStatus(String keyword, Integer status, Timestamp dueDate, Timestamp creationDate);
    public HashMap<String, Object> createTask (TaskDto task);
    public HashMap<String, Object> editTask(Integer TaskID , EditTaskDTO Task);
    public HashMap<String, Object> deleteTask(Integer taskId);
}
