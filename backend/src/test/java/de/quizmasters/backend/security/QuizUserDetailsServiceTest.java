package de.quizmasters.backend.security;

import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;


class QuizUserDetailsServiceTest {
    QuizUserRepo quizUserRepo = mock(QuizUserRepo.class);

    QuizUserDetailsService quizUserDetailsService = new QuizUserDetailsService(quizUserRepo);

    @Test
    void loadUserByUsername() {
        String givenUserName = "hans";
        QuizUser expectedUser = new QuizUser("123", "hans", "hans1");
        when(quizUserRepo.findByUsername(givenUserName)).thenReturn(Optional.of(expectedUser));
        UserDetails actualUser = quizUserDetailsService.loadUserByUsername(givenUserName);
        verify(quizUserRepo).findByUsername(givenUserName);
        Assertions.assertEquals(givenUserName, actualUser.getUsername());
    }

    @Test
    void expectUsernameNotFoundException_whenFindByUsername() {
        Assertions.assertThrows(UsernameNotFoundException.class, () -> quizUserDetailsService.loadUserByUsername("fritz"));
    }
}
