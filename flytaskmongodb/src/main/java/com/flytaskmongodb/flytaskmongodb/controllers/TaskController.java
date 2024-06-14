package com.flytaskmongodb.flytaskmongodb.controllers;

import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import com.flytaskmongodb.flytaskmongodb.services.TaskService;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
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
            @RequestParam(required = true) ObjectId userId) {
        return taskService.searchTasksByKeywordAndStatus(keyword, status, userId);
    }

    @PostMapping("/create")
    public ResponseEntity<?> register(@RequestBody @Valid TaskDto task) {
        return taskService.createTask(task);
    }

    @PutMapping("/edit/{taskid}")
    public ResponseEntity<?> update(@PathVariable ObjectId taskid, @RequestBody @Valid EditTaskDTO newTask) {
        return taskService.editTask(taskid, newTask);
    }


    @PutMapping("/todo/{taskid}")
    public ResponseEntity<?> setTaskTodo(@PathVariable ObjectId taskid) {
        return taskService.setTodo(taskid);
    }

    @PutMapping("/done/{taskid}")
    public ResponseEntity<?> setTaskDone(@PathVariable ObjectId taskid) {
        return taskService.setDone(taskid);
    }
    @PutMapping("/doing/{taskid}")
    public ResponseEntity<?> setTaskDoing(@PathVariable ObjectId taskid) {
        return taskService.setDoing(taskid);
    }
    @PutMapping("/upcoming/{taskid}")
    public ResponseEntity<?> setTaskUpconing(@PathVariable ObjectId taskid) {
        return taskService.setUpcoming(taskid);
    }

    @DeleteMapping("/delete/{taskid}")
    public ResponseEntity<?> update(@PathVariable ObjectId taskid) {
        return taskService.deleteTask(taskid);
    }
}
