package com.flytaskmongodb.flytaskmongodb.model.DTO;

import com.flytaskmongodb.flytaskmongodb.model.Tasks;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {
    private String taskId;
    private String title;
    private String description;
    private Integer status;
    private Date creationDate;
    private Date dueDate;

    public TaskResponseDTO(Tasks task) {
        this.taskId = task.getTaskId().toHexString();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.creationDate = task.getCreationDate();
        this.dueDate = task.getDueDate();
    }
}
