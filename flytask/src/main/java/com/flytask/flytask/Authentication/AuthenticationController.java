package com.flytask.flytask.Authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @PostMapping("/login")
    public String Login(){
        return "Login logic";
    }
    @PostMapping("/register")
    public String Register(){
        return "register logic";
    }
}
