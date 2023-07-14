package de.quizmasters.backend.models;

import org.springframework.stereotype.Service;

import java.util.UUID;
public class IdService {
    private IdService() {
    }

    public static String uuid(){
        return UUID.randomUUID().toString();
    }
}
