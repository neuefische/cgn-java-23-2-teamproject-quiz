package de.quizmasters.backend.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@AllArgsConstructor
@Service
public class QuizUserDetailsService implements UserDetailsService {
    private final QuizUserRepo quizUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        QuizUser quizUser = quizUserRepo.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username: " + username + " not found!"));
        return new User(quizUser.username(), quizUser.password(), Collections.emptyList());
    }
}
