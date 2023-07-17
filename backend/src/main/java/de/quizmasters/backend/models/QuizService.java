package de.quizmasters.backend.models;

import de.quizmasters.backend.exception.NoSuchQuizException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizRepo quizRepo;

    public List<Quiz> getQuizzes() {
        return quizRepo.findAll();
    }

    public Quiz addQuiz(Quiz newQuiz) {
        newQuiz.setId(IdService.uuid());
        quizRepo.insert(newQuiz);
        return newQuiz;
    }

    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        if (!quizRepo.existsById(id)) {
            throw new NoSuchQuizException("Quiz Id " + id + " not found.");
        }
        quizRepo.save(updatedQuiz);
        return updatedQuiz;
    }

    public List<Quiz> deleteQuiz(String idToDelete) {

        if (!quizRepo.existsById(idToDelete)) {
            throw new NoSuchQuizException("Quiz not found.");
        }
        quizRepo.deleteById(idToDelete);
        return getQuizzes();
    }
}
