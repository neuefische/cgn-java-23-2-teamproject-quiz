package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.QuizService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
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

    @Test
    @DirtiesContext
    void expectNewQuizInAll_whenAddNewQuiz() throws Exception {

        String expectedList = """
                    [
                        {
                            "question": "Sind Giraffen größer als Hunde?",
                            "answer": "Ja"
                        },
                        
                        {
                         "question": "Sind Hunde schneller als Schnecken?",
                         "answer": "Ja"   
                        },
                        {
                         "question": "Welche Farben haben Zebras?",
                         "answer": "Schwarz-Weiß"   
                        }
                    ]
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/quiz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                         "id": "3",
                         "question": "Welche Farben haben Zebras?",
                         "answer": "Schwarz-Weiß"   
                        }
""")
                )

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

    @Test
    void expectUpdatedQuizInAll_whenUpdateQuiz() throws Exception {

        String expectedList = """
                    [
                        {
                         "question": "Welches Tier hat Streifen?",
                         "answer": "Zebra"   
                        },
                        {
                         "question": "Sind Hunde schneller als Schnecken?",
                         "answer": "Ja"   
                        }
                    ]
                """;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/quiz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                         "id": "1",
                         "question": "Welches Tier hat Streifen?",
                         "answer": "Zebra"   
                        }
""")
                )

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

}