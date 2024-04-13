package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.Services.UserService;
import com.flytask.flytask.model.DTO.TaskDto;
import com.flytask.flytask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.flytask.flytask.model.Tasks;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;
    @Override
    public HashMap<String, Object> createTask(TaskDto task) {
        HashMap<String, Object> response = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        Timestamp creationDate = Timestamp.valueOf(now);
        Tasks newTask = Tasks.builder()
                .title(task.getTitle())
                .creationDate(creationDate)
                .dueDate(task.getDueDate())
                .description(task.getDescription())
                .status(0)
                .user(userService.getUserbyId(task.getUserId())).build();
        Tasks createdTask = taskRepository.save(newTask);
        response.put("Message", "Task Created Succesfully for user" + createdTask.getUser().getName());
        response.put("data", createdTask.getTaskId());
        return response;
    }
}
