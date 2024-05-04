package com.flytaskmongodb.flytaskmongodb.model.DTO;

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
public class EditTaskDTO {
    @NotEmpty(message = "title must not bel null")
    private String title;
    @NotEmpty(message = "description must not be null")
    private String description;
    @NotNull(message = "dueDate must not be null")
    private Timestamp dueDate;
}
