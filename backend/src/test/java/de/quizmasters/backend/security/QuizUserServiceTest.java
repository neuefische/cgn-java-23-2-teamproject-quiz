package de.quizmasters.backend.security;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;

class QuizUserServiceTest {
    QuizUserRepo quizUserRepo = mock(QuizUserRepo.class);
    QuizUserService quizUserService = new QuizUserService(quizUserRepo);

    @Test
    void signUp() {
        //GIVEN
        DtoQuizUser newQuizUser=new DtoQuizUser("123", "TestUser", "123456");
        String expectedUserName="TestUser";
        //WHEN
        String actualUserName=quizUserService.signUp(newQuizUser);
        //THEN
        Assertions.assertEquals(expectedUserName, actualUserName);
    }
}
