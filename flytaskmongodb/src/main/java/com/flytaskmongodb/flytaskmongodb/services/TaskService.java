package com.flytaskmongodb.flytaskmongodb.services;

import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;

import java.util.HashMap;

public interface TaskService {
    public HashMap<String, Object> searchTasksByKeywordAndStatus(String keyword, Integer status, String dueDate, String creationDate);
    public HashMap<String, Object> createTask (TaskDto task);
    public HashMap<String, Object> editTask(Integer TaskID , EditTaskDTO Task);
    public HashMap<String, Object> deleteTask(Integer taskId);
    public HashMap<String, Object> setTodo(Integer TaskID);
    public HashMap<String, Object> setDoing(Integer TaskID);
    public HashMap<String, Object> setDone(Integer TaskID);
    public HashMap<String, Object> setUpcoming(Integer TaskID);
}

