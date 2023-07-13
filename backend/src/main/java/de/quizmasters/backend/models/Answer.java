package de.quizmasters.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Answer {
    @NotBlank
    @Size(max=256)
    private String answerText;
    private boolean rightAnswer;
}
