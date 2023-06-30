package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {


    @Test
    void testReturnedId_whenIdServiceUuidIsCalled(){
        //GIVE
        //WHEN
        String actual = IdService.uuid();
        //THEN
        Assertions.assertEquals(String.class, actual.getClass());

    }
}