package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;
import com.flytaskmongodb.flytaskmongodb.exceptions.TaskNotFoundException;
import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import com.flytaskmongodb.flytaskmongodb.repository.TaskRepository;
import com.flytaskmongodb.flytaskmongodb.services.SequenceGeneratorService;
import com.flytaskmongodb.flytaskmongodb.services.TaskService;
import com.flytaskmongodb.flytaskmongodb.services.UserService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @SneakyThrows
    @Override
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, String dueDate, String creationDate, Integer userId) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        HashMap<String, Object> response = new HashMap<>();
        Date parsedDueDate = (Date) dateFormat.parse(dueDate);
        Date parsedcreationDate = (Date) dateFormat.parse(creationDate);

        Timestamp parsedDueDateTimeStamp = new Timestamp(parsedDueDate.getTime());
        Timestamp parsedCreationDateTimestamp = new Timestamp(parsedcreationDate.getTime());

        try {
            List<Tasks> tasks = taskRepository.searchTasksByKeywordAndStatusAndUserId(keyword, status,parsedDueDateTimeStamp, parsedCreationDateTimestamp,userId);
            response.put("status", "success");
            response.put("message", "Tasks retrieved successfully");
            response.put("data", tasks);
            response.put("totalTasks", tasks.size());
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }
    @Override
    public ResponseEntity<HashMap<String, Object>> createTask(TaskDto task) {
        HashMap<String, Object> response = new HashMap<>();

        try {
            LocalDateTime now = LocalDateTime.now();
            Timestamp creationDate = Timestamp.valueOf(now);
            Tasks newTask = Tasks.builder()
                    .title(task.getTitle())
                    .creationDate(creationDate)
                    .dueDate(task.getDueDate())
                    .description(task.getDescription())
                    .status(0)
                    .user(userService.getUserbyId(task.getUserId()))
                    .build();
            Tasks createdTask = taskRepository.save(newTask);
            response.put("status", "success");
            response.put("message", "Task Created Successfully for user " + createdTask.getUser().getName());
            response.put("data", createdTask.getTaskId());
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> editTask(Integer TaskID , EditTaskDTO Task) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setTitle(Task.getTitle());
                existingTask.setDueDate(Task.getDueDate());
                existingTask.setDescription(Task.getDescription());
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task Updated Successfully");
                response.put("data", updatedTask.getTaskId());
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>>deleteTask(Integer taskId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToDelete = taskRepository.findById(taskId);
            if (taskToDelete.isPresent()) {
                taskRepository.delete(taskToDelete.get());
                response.put("status", "success");
                response.put("message", "Task Deleted Successfully");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + taskId);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> setTodo(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(0);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task Changed to TODO");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> setDoing(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(1);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("Message", "Task Changed to DOING");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> setDone(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(2);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task Changed to DONE");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> setUpcoming(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(3);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task Changed to Upcoming");
                return ResponseEntity.status(200).body(response);
            } else {
                response.put("status", "error");
                response.put("message", "Task not found with ID: " + TaskID);
                return ResponseEntity.status(500).body(response);
            }
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

}
