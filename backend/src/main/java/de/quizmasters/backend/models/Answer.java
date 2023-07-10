package de.quizmasters.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Answer {
    private String answerText;
    private boolean rightAnswer;
}
