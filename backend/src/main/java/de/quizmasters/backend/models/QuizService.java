package de.quizmasters.backend.models;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizRepo quizRepo;

    public List<Quiz> getQuizzes() {
        return quizRepo.getQuizzes();
    }

    public Quiz addQuiz(Quiz newQuiz) {
        return quizRepo.addQuiz(newQuiz);
    }

    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        return quizRepo.updateQuiz(id, updatedQuiz);
    }
}
