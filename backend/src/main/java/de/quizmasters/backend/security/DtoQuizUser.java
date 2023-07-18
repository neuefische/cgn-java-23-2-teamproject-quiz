package de.quizmasters.backend.security;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;

public record DtoQuizUser (
    @Id
    String id,
    @NotBlank
    String username,
    @NotBlank
    String password
){}
