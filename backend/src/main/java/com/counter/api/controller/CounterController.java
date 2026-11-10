package com.counter.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * REST controller managing an in-memory thread-safe counter.
 */
@RestController
@RequestMapping("/api/counter")
@CrossOrigin(origins = "*")
public class CounterController {

    private final AtomicInteger counter = new AtomicInteger(0);

    @GetMapping
    public int getCounter() {
        return counter.get();
    }

    @PostMapping("/increment")
    public int increment() {
        return counter.incrementAndGet();
    }

    @PostMapping("/decrement")
    public int decrement() {
        return counter.decrementAndGet();
    }

    @PostMapping("/reset")
    public int reset() {
        counter.set(0);
        return counter.get();
    }
}

