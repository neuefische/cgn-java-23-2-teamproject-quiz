package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.QuizService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class QuizControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    QuizService quizService;


    @Test
    void expectAllQuizzes_whenGetAllQuizzes() throws Exception {

        String expectedList = """
                    [
                        {
                            "question": "Sind Giraffen größer als Hunde?",
                            "answer": "Ja"
                        },
                        
                        {
                         "question": "Sind Hunde schneller als Schnecken?",
                         "answer": "Ja"   
                        }
                    ]
                """;

        mockMvc.perform(MockMvcRequestBuilders.get("/api/quiz"))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

}