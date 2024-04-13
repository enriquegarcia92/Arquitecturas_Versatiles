package com.flytask.flytask.model.DTO;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotEmpty(message = "name must not be null")
    private String name;
    @NotEmpty(message = "email must not be null")
    private String email;
    @NotEmpty(message = "password must not be null")
    private String password;
    @NotEmpty(message = "confirmation of password must not be null")
    private String confirmPassword;
}
