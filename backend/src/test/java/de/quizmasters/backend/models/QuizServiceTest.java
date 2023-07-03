package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuizServiceTest {

    QuizRepo quizRepo = mock(QuizRepo.class);

    QuizService quizService = new QuizService(quizRepo);

    @Test
    void getsListOfQuizzes_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));
        //WHEN
        when(quizRepo.getQuizzes()).thenReturn(expectedList);
        List<Quiz> actualList = quizService.getQuizzes();
        //THEN
        verify(quizRepo).getQuizzes();
        assertEquals(expectedList, actualList);
    }

    @Test
    void getNewQuiz_whenAddQuizIsCalled() {
        //GIVEN
        Quiz newQuiz = new Quiz("123", "Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        //when(quizRepo.addQuiz(newQuiz)).thenReturn(newQuiz);
        //Quiz actualQuiz = quizService.addQuiz(newQuiz);
        Quiz actualQuiz = quizService.addQuiz(newQuiz);
        //THEN
        //verify(quizRepo).addQuiz(newQuiz);
        //assertEquals(newQuiz, actualQuiz);
        Assertions.assertEquals(newQuiz, actualQuiz);
    }

    @Test
    void updateQuiz_whenUpdateQuizIsCalled() {
        //GIVEN
        Quiz updatedQuiz = new Quiz("123", "Welches Tier hat Streifen?", "Zebra");
        List<Quiz> mockedList = new ArrayList<>(List.of(updatedQuiz));
        //WHEN
        when(quizRepo.getQuizzes()).thenReturn(mockedList);
        Quiz actualQuiz = quizService.updateQuiz("123", updatedQuiz);
        //THEN
        verify(quizRepo,times(3)).getQuizzes();
        Assertions.assertEquals(updatedQuiz, actualQuiz);
    }

    @Test
    void expectNullPointerException_whenUpdateWithNonExistingId() {
        Quiz testQuiz = new Quiz("000", "Welches Tier hat Streifen?", "Zebra");
        Assertions.assertThrows(NullPointerException.class, () -> quizService.updateQuiz("000", testQuiz));
    }

    @Test
    void expectListWithoutQuizToDelete_whenDeleteIsCalled() {
        //GIVEN
        List<Quiz> expectedListDeleted = new ArrayList<>(List.of(
                new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja")));

        List<Quiz> expectedListAll = new ArrayList<>(List.of(
                new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja"),
                new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja")));
        //WHEN
        when(quizRepo.getQuizzes()).thenReturn(expectedListAll);
        List<Quiz> actualList = quizService.deleteQuiz("123");
        //THEN
        Assertions.assertEquals(expectedListDeleted, actualList);
    }

    @Test
    void expectNullPointerException_whenDeleteWithNonExistingId() {
        Assertions.assertThrows(NullPointerException.class, () -> quizService.deleteQuiz("000"));
    }
}