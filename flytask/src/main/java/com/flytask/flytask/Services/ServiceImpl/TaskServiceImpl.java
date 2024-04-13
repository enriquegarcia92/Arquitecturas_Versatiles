package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.Services.UserService;
import com.flytask.flytask.model.DTO.EditTaskDTO;
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
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Override
    public HashMap<String, Object> searchTasksByKeywordAndStatus(String keyword, Integer status, Timestamp dueDate, Timestamp creationDate) {
        HashMap<String, Object> response = new HashMap<>();

        try {
            List<Tasks> tasks = taskRepository.searchTasksByKeywordAndStatus(keyword, status,dueDate, creationDate);

            // Add the list of tasks to the response map
            response.put("tasks", tasks);
            // Optionally, you can add additional information to the response map
            response.put("totalTasks", tasks.size());
            response.put("message", "Tasks retrieved successfully");
        } catch (Exception e) {
            // Handle any exceptions that occur during the repository call
            response.put("Error", "An error occurred while retrieving tasks");
            e.printStackTrace(); // Log the exception for debugging purposes
        }

        return response;
    }
    @Override
    public HashMap<String, Object> createTask(TaskDto task) {
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
            response.put("Message", "Task Created Successfully for user " + createdTask.getUser().getName());
            response.put("data", createdTask.getTaskId());
        } catch (Exception e) {
            response.put("Error", "An error occurred while creating the task");
            e.getMessage(); // Log the exception for debugging purposes
        }

        return response;
    }

    @Override
    public HashMap<String, Object> editTask(Integer TaskID , EditTaskDTO Task) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setTitle(Task.getTitle());
                existingTask.setDueDate(Task.getDueDate());
                existingTask.setDescription(Task.getDescription());
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("Message", "Task Updated Successfully");
                response.put("data", updatedTask.getTaskId());
            } else {
                response.put("Error", "Task not found with ID: " + TaskID);
            }
        } catch (Exception e) {
            response.put("Error", "An error occurred while updating the task");
            e.printStackTrace(); // Log the exception for debugging purposes
        }
        return response;
    }

    @Override
    public HashMap<String, Object> deleteTask(Integer taskId) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToDelete = taskRepository.findById(taskId);
            if (taskToDelete.isPresent()) {
                taskRepository.delete(taskToDelete.get());
                response.put("Message", "Task Deleted Successfully");
            } else {
                response.put("Error", "Task not found with ID: " + taskId);
            }
        } catch (Exception e) {
            response.put("Error", "An error occurred while deleting the task");
            e.printStackTrace(); // Log the exception for debugging purposes
        }
        return response;
    }


}
