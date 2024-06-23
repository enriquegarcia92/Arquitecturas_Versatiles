package com.flytask.flytask.controllers;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.TaskDto;
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
    public ResponseEntity<?> searchTasksByKeywordAndStatus(
            @RequestParam String keyword,
            @RequestParam Integer status,
            @RequestParam(required = true) Integer userId) {
        return taskService.searchTasksByKeywordAndStatus(keyword, status, userId);
    }
    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody @Valid TaskDto task) {
            return taskService.createTask(task);
    }

    @PutMapping("/edit/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid, @RequestBody @Valid EditTaskDTO newTask) {
        return taskService.editTask(taskid, newTask);
    }

    @PutMapping("/{newStatus}/{taskid}")
    public ResponseEntity<?> setTaskTodo(@PathVariable Integer taskid,@PathVariable String newStatus ) {
        return taskService.setState(taskid,newStatus);
    }

    @DeleteMapping("/delete/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid) {
        return taskService.deleteTask(taskid);
    }
}
