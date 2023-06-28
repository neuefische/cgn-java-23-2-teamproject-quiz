package de.quizmasters.backend.models;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizRepo quizRepo;

    public List<Quiz> getAllQuizzesService(){
        return quizRepo.getAllQuizzes();
    }
}
