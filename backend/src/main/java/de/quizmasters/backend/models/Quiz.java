package de.quizmasters.backend.models;

import lombok.Data;

@Data
public class Quiz {

    private String id;
    private String question;
    private String answer;

    public Quiz(String id, String question, String answer) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}
