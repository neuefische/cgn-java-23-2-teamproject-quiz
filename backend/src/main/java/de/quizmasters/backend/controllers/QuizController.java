package de.quizmasters.backend.controllers;

import de.quizmasters.backend.exception.ErrorMessage;
import de.quizmasters.backend.exception.NoSuchQuizException;
import de.quizmasters.backend.models.Quiz;
import de.quizmasters.backend.models.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    private final QuizService quizService;


    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public List<Quiz> getQuizzes() {
        return quizService.getQuizzes();
    }

    @PostMapping
    public Quiz add(@RequestBody Quiz newQuiz) {
        return quizService.addQuiz(newQuiz);
    }

    @PutMapping("/{id}")
    public Quiz update(@PathVariable String id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz);
    }

    @DeleteMapping("/{id}")
    public List<Quiz> delete(@PathVariable String id) {
        return quizService.deleteQuiz(id);
    }

    @ExceptionHandler({NoSuchElementException.class })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchElementExceptions(NoSuchElementException exception) {
        return new ErrorMessage(exception.getMessage());
    }

    @ExceptionHandler({NoSuchQuizException.class })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchQuizExceptions(NoSuchQuizException exception) {
        return new ErrorMessage(exception.getMessage());
    }

}
