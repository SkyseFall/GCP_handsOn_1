package com.counter.api.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CounterController.class)
class CounterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void resetCounter() throws Exception {
        mockMvc.perform(post("/api/counter/reset"))
                .andExpect(status().isOk());
    }

    @Test
    void getCounterReturnsZeroInitially() throws Exception {
        mockMvc.perform(get("/api/counter"))
                .andExpect(status().isOk())
                .andExpect(content().string("0"));
    }

    @Test
    void incrementIncreasesCounterByOne() throws Exception {
        mockMvc.perform(post("/api/counter/increment"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));

        mockMvc.perform(get("/api/counter"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    void decrementDecreasesCounterByOne() throws Exception {
        mockMvc.perform(post("/api/counter/increment"))
                .andExpect(status().isOk());
        mockMvc.perform(post("/api/counter/increment"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/counter/decrement"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    void resetSetsCounterBackToZero() throws Exception {
        mockMvc.perform(post("/api/counter/increment"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/counter/reset"))
                .andExpect(status().isOk())
                .andExpect(content().string("0"));
    }
}

