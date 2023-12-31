package de.quizmasters.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class QuizUserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void getAnonymousUser_whenEndpointIsCalled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "anonymousUser"));
    }

    @Test
    @WithMockUser(username = "hans")
    void getUsername_whenEndpointIsCalled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "hans"));
    }

    @Test
    @WithMockUser(username = "hans")
    void getUsername_whenLoggingIn() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "hans"));
    }

    @Test
    void getUsername_whenSignUp() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/sign-up")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                {
                                "username": "Test",
                                "password": "Test1"
                                }
                                            """)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(
                        "Test"));
    }

    @Test
    void getBadRequest_whenInvalidSignUp() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/sign-up")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                {
                                "username": "Test",
                                "password": "   "
                                }
                                            """)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
