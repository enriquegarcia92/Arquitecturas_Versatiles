package com.flytaskmongodb.flytaskmongodb.model.DTO;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotEmpty(message = "email must not be null")
    String email;
    @NotEmpty(message = "password must not be null")
    String password;
}
