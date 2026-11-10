package com.counter.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the GCP Counter REST API service.
 */
@SpringBootApplication
public class CounterApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CounterApiApplication.class, args);
    }
}

