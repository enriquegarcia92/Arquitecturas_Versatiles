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
    public ResponseEntity<?> searchTasksByKeywordAndStatus(
            @RequestParam String keyword,
            @RequestParam Integer status,
            @RequestParam String dueDate,
            @RequestParam String creationDate,
            @RequestParam(required = true) Integer userId) {
        return taskService.searchTasksByKeywordAndStatus(keyword, status, dueDate, creationDate, userId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody @Valid TaskDto task) {
        return taskService.createTask(task);
    }

    @PutMapping("/edit/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid, @RequestBody @Valid EditTaskDTO newTask) {
        return taskService.editTask(taskid, newTask);
    }


    @PutMapping("/todo/{taskid}")
    public ResponseEntity<?> setTaskTodo(@PathVariable Integer taskid) {
        return taskService.setTodo(taskid);
    }

    @PutMapping("/done/{taskid}")
    public ResponseEntity<?> setTaskDone(@PathVariable Integer taskid) {
        return taskService.setDone(taskid);
    }
    @PutMapping("/doing/{taskid}")
    public ResponseEntity<?> setTaskDoing(@PathVariable Integer taskid) {
        return taskService.setDoing(taskid);
    }
    @PutMapping("/upcoming/{taskid}")
    public ResponseEntity<?> setTaskUpconing(@PathVariable Integer taskid) {
        return taskService.setUpcoming(taskid);
    }

    @DeleteMapping("/delete/{taskid}")
    public ResponseEntity<?> update(@PathVariable Integer taskid) {
        return taskService.deleteTask(taskid);
    }
}
