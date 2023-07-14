package de.quizmasters.backend.controllers;

import de.quizmasters.backend.security.QuizUser;
import de.quizmasters.backend.security.QuizUserService;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class QuizUserController {
private final QuizUserService quizUserService;
public QuizUserController(QuizUserService quizUserService){
    this.quizUserService=quizUserService;
}
    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/sign-up")
    public String signUp(@Valid @RequestBody QuizUser quizUser){
    return quizUserService.signUp(quizUser);

    }
}
