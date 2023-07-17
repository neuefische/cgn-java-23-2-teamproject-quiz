package de.quizmasters.backend.security;

import de.quizmasters.backend.models.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizUserService {
    private final QuizUserRepo quizUserRepo;
    private final PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public String signUp(DtoQuizUser quizUser) {
        String hashedPassword = encoder.encode(quizUser.password());
        QuizUser newQuizUser = new QuizUser(IdService.uuid(), quizUser.username(), hashedPassword);
        quizUserRepo.insert(newQuizUser);
        return newQuizUser.username();
    }
}