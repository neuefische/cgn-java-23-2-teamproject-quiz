package de.quizmasters.backend.models;

import lombok.Data;

import java.util.UUID;

@Data
public class Quiz {

    String id;
    String question;
    String answer;

    public Quiz(String question, String answer) {
        this.id = UUID.randomUUID().toString().substring(1,4);
        this.question = question;
        this.answer = answer;
    }

}

