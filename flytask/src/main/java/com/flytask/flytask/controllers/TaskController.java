package com.flytask.flytask.controllers;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.RegisterRequest;
import com.flytask.flytask.model.DTO.TaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private  TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody TaskDto task){
        return ResponseEntity.ok(taskService.createTask(task));
    }
}
