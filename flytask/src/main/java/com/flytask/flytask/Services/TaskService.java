package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.TaskDto;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.HashMap;

public interface TaskService {
    public HashMap<String, Object> searchTasksByKeywordAndStatus(String keyword, Integer status, String dueDate, String creationDate, Integer userId);
    public HashMap<String, Object> createTask (TaskDto task);
    public HashMap<String, Object> editTask(Integer TaskID , EditTaskDTO Task);
    public HashMap<String, Object> deleteTask(Integer taskId);
    public HashMap<String, Object> setTodo(Integer TaskID);
    public HashMap<String, Object> setDoing(Integer TaskID);
    public HashMap<String, Object> setDone(Integer TaskID);
    public HashMap<String, Object> setUpcoming(Integer TaskID);
}
