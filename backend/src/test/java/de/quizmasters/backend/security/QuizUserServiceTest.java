package de.quizmasters.backend.security;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class QuizUserServiceTest {
    QuizUserRepo quizUserRepo = mock(QuizUserRepo.class);
    QuizUserService quizUserService = new QuizUserService(quizUserRepo);

    @Test
    void signUp() {
        //GIVEN
        QuizUser newQuizUser=new QuizUser("123", "TestUser", "123456");
        String expectedUserName="TestUser";
        //WHEN
        String actualUserName=quizUserService.signUp(newQuizUser);

        //THEN
        Assertions.assertEquals(expectedUserName, actualUserName);
    }
}