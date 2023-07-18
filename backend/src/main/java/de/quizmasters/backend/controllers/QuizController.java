package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.DtoQuiz;
import de.quizmasters.backend.exception.ErrorMessage;
import de.quizmasters.backend.exception.NoSuchQuizException;
import de.quizmasters.backend.models.Quiz;
import de.quizmasters.backend.models.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Quiz add(@Valid @RequestBody DtoQuiz newDtoQuiz) {
        Quiz newQuiz = new Quiz("NoId", newDtoQuiz.getQuestion(), newDtoQuiz.getAnswers());
        return quizService.addQuiz(newQuiz);
    }

    @PutMapping("/{id}")
    public Quiz update(@PathVariable String id, @Valid @RequestBody DtoQuiz updatedDtoQuiz) {
        Quiz updatedQuiz = new Quiz(id, updatedDtoQuiz.getQuestion(), updatedDtoQuiz.getAnswers());
        return quizService.updateQuiz(id, updatedQuiz);
    }

    @DeleteMapping("/{id}")
    public List<Quiz> delete(@PathVariable String id) {
        return quizService.deleteQuiz(id);
    }

    @ExceptionHandler({NoSuchQuizException.class })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchQuizExceptions(NoSuchQuizException exception) {
        return new ErrorMessage(exception.getMessage());
    }

}
