package com.flytaskmongodb.flytaskmongodb.controllers;

import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import com.flytaskmongodb.flytaskmongodb.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchTasksByKeywordAndStatus(
            @RequestParam String keyword,
            @RequestParam Integer status,
            @RequestParam String dueDate,
            @RequestParam String creationDate,
            @RequestParam(required = true) Integer userId
    ) {
        HashMap<String, Object> response = taskService.searchTasksByKeywordAndStatus(keyword, status, dueDate, creationDate, userId);
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


    @PutMapping("/todo/{taskid}")
    public ResponseEntity<?> setTaskTodo(@PathVariable Integer taskid) {
        HashMap<String, Object> response = taskService.setTodo(taskid);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }

    @PutMapping("/done/{taskid}")
    public ResponseEntity<?> setTaskDone(@PathVariable Integer taskid) {
        HashMap<String, Object> response = taskService.setDone(taskid);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }
    @PutMapping("/doing/{taskid}")
    public ResponseEntity<?> setTaskDoing(@PathVariable Integer taskid) {
        HashMap<String, Object> response = taskService.setDoing(taskid);
        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }
    @PutMapping("/upcoming/{taskid}")
    public ResponseEntity<?> setTaskUpconing(@PathVariable Integer taskid) {
        HashMap<String, Object> response = taskService.setUpcoming(taskid);
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
