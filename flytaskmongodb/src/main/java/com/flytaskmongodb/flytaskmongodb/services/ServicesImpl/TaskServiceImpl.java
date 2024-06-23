package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;
import com.flytaskmongodb.flytaskmongodb.model.DTO.EditTaskDTO;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskDto;
import com.flytaskmongodb.flytaskmongodb.model.DTO.TaskResponseDTO;
import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import com.flytaskmongodb.flytaskmongodb.repository.TaskRepository;
import com.flytaskmongodb.flytaskmongodb.repository.UserRepository;
import com.flytaskmongodb.flytaskmongodb.services.TaskService;
import lombok.SneakyThrows;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<HashMap<String, Object>> searchTasksByKeywordAndStatus(String keyword, Integer status, ObjectId userId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            List<Tasks> tasks = taskRepository.searchTasksByKeywordAndStatusAndUserId(keyword, status, userId);
            List<TaskResponseDTO> taskResponseDTOs = tasks.stream()
                    .map(TaskResponseDTO::new)
                    .collect(Collectors.toList());
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
                    .user(userRepository.findByuserId(task.getUserId()).getUserId())
                    .build();
            Tasks createdTask = taskRepository.save(newTask);
            response.put("status", "success");
            response.put("message", "Task Created Successfully for user " + createdTask.getUser());
            response.put("data", createdTask.getTaskId().toHexString());
            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            response.put("status", "error");
            response.put("message", errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> editTask(ObjectId TaskID , EditTaskDTO Task) {
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
                response.put("data", updatedTask.getTaskId().toHexString());
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
    public ResponseEntity<HashMap<String, Object>>deleteTask(ObjectId taskId) {
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
    public ResponseEntity<HashMap<String, Object>> setState(ObjectId TaskID, String state) {
        Integer newStatus= 0;
        if(state.equals("todo")){
            newStatus =  0;
        }else if(state.equals("done")){
            newStatus =  1;
        }else if(state.equals("doing")){
            newStatus =  2;
        }else if(state.equals("upcoming")){
            newStatus =  3;
        }
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(newStatus);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("status", "success");
                response.put("message", "Task status Changed");
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
