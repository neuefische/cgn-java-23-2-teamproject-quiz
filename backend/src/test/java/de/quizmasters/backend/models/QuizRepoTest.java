package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class QuizRepoTest {

    QuizRepo quizRepo = new QuizRepo();
    IdService idService = mock(IdService.class);
    @Test
    void getList_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz("123","Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz( "456","Sind Hunde schneller als Schnecken?", "Ja");

        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));

        //WHEN

        List<Quiz> actualList = quizRepo.getAllQuizzes();
        //THEN
        Assertions.assertEquals(expectedList, actualList);

    }
    @Test
    void getNewQuizInList_whenAddQuizIsCalled(){
        //GIVEN
        Quiz testQuiz= new Quiz("Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        List<Quiz> actualList=quizRepo.addQuiz(testQuiz);
        //THEN
        Assertions.assertTrue(actualList.contains(testQuiz));
    }

    @Test
    void updateQuiz_whenEditQuiz(){
        //GIVEN
        Quiz testQuiz= new Quiz("Welches Tier hat Streifen?", "Zebra");
        //WHEN
        Quiz actual=quizRepo.updateQuiz(testQuiz.getId(),testQuiz);
        //THEN
        Assertions.assertEquals(testQuiz, actual);
    }

}