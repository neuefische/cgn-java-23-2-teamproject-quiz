package de.quizmasters.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("users")
public record QuizUser(
        @Id
        String id,
        @NotBlank
        String username,
        @NotBlank
        String password
) {
}
