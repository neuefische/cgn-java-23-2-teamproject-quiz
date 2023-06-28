package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class QuizRepoTest {

    QuizRepo quizRepo = new QuizRepo();

    @Test
    void getList_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz("1", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("2", "Sind Hunde schneller als Schnecken?", "Ja");

        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));

        //WHEN
        List<Quiz> actualList = quizRepo.getAllQuizzes();
        //THEN
        Assertions.assertEquals(expectedList, actualList);

    }
    @Test
    void getNewQuizInList_whenAddQuizIsCalled(){
        //GIVEN
        Quiz testQuiz= new Quiz("3", "Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        List<Quiz> actualList=quizRepo.addQuiz(testQuiz);
        //THEN
        Assertions.assertTrue(actualList.contains(testQuiz));
    }

}