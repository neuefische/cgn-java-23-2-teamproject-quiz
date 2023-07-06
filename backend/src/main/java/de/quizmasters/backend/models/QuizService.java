package de.quizmasters.backend.models;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
            throw new NoSuchElementException();
        }
        quizRepo.save(updatedQuiz);
        return updatedQuiz;
    }

    public List<Quiz> deleteQuiz(String idToDelete) {

        if (!quizRepo.existsById(idToDelete)) {
            throw new NoSuchElementException();
        }
        quizRepo.deleteById(idToDelete);
        return getQuizzes();
    }
}
