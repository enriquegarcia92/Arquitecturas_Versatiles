package com.flytask.flytask.controllers;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.model.DTO.AuthResponse;
import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.RegisterRequest;
import com.flytask.flytask.model.DTO.TaskDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchTasksByKeywordAndStatus(
            @RequestParam String keyword,
            @RequestParam Integer status,
            @RequestParam Timestamp dueDate,
            @RequestParam Timestamp creationDate
    ) {
        HashMap<String, Object> response = taskService.searchTasksByKeywordAndStatus(keyword, status, dueDate, creationDate);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody @Valid TaskDto task) {
        HashMap<String, Object> response = taskService.createTask(task);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PutMapping("/edit/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid, @RequestBody @Valid EditTaskDTO newTask) {
        HashMap<String, Object> response = taskService.editTask(taskid, newTask);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/delete/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid) {
        HashMap<String, Object> response = taskService.deleteTask(taskid);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }
}
