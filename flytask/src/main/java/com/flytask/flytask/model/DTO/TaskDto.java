package com.flytask.flytask.model.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    @NotEmpty(message = "title must not be null")
    private String title;
    @NotEmpty(message = "description must not be null")
    private String description;
    @NotNull(message = "due date must not be null")
    private Timestamp dueDate;
    @NotNull(message = "user identification must not be null")
    private Integer userId;
}
