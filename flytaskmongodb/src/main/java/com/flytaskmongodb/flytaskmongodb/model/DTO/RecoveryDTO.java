package com.flytaskmongodb.flytaskmongodb.model.DTO;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RecoveryDTO {
    @NotEmpty(message = "New password is required")
    private String newPassword;
    @NotEmpty(message = "Password Confirmation is requred")
    private String passwordConfirmation;
    @NotEmpty(message = "Token for recovery is requried")
    private String token;
}
