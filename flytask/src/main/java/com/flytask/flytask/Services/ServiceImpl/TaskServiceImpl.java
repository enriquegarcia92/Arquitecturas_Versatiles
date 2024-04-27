package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.TaskService;
import com.flytask.flytask.Services.UserService;
import com.flytask.flytask.model.DTO.EditTaskDTO;
import com.flytask.flytask.model.DTO.TaskDto;
import com.flytask.flytask.repository.TaskRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.flytask.flytask.model.Tasks;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.sql.Timestamp;
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
    public HashMap<String, Object> searchTasksByKeywordAndStatus(String keyword, Integer status, String dueDate, String creationDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        HashMap<String, Object> response = new HashMap<>();
        Date parsedDueDate = (Date) dateFormat.parse(dueDate);
        Date parsedcreationDate = (Date) dateFormat.parse(creationDate);

        Timestamp parsedDueDateTimeStamp = new Timestamp(parsedDueDate.getTime());
        Timestamp parsedCreationDateTimestamp = new Timestamp(parsedcreationDate.getTime());

        try {
            List<Tasks> tasks = taskRepository.searchTasksByKeywordAndStatus(keyword, status,parsedDueDateTimeStamp, parsedCreationDateTimestamp);

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

    @Override
    public HashMap<String, Object> setTodo(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(0);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("Message", "Task Changed to TODO");
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
    public HashMap<String, Object> setDoing(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(1);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("Message", "Task Changed to DOING");
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
    public HashMap<String, Object> setDone(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(2);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("Message", "Task Changed to DONE");
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
    public HashMap<String, Object> setUpcoming(Integer TaskID) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Tasks> taskToEdit = taskRepository.findById(TaskID);
            if (taskToEdit.isPresent()) {
                Tasks existingTask = taskToEdit.get();
                existingTask.setStatus(3);
                Tasks updatedTask = taskRepository.save(existingTask);
                response.put("Message", "Task Changed to Upcoming");
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

}
