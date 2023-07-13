package de.quizmasters.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Answer {
    @NotEmpty
    @NotNull
    @NotBlank
    @Size(max=256)
    private String answerText;
    @NotNull
    private boolean rightAnswer;
}
