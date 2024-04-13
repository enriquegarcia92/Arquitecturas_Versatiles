package com.flytask.flytask.Services;

import com.flytask.flytask.model.DTO.TaskDto;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface TaskService {
    public HashMap<String, Object> createTask (TaskDto task);
}
