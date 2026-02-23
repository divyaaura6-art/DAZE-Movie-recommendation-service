package com.select.daze.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // Marks this class as a REST controller
public class HelloController {

    @GetMapping("/hello")  // Maps GET requests on /hello to this method
    public String sayHello() {
        return "Hello, Daze App!";
    }
}
 