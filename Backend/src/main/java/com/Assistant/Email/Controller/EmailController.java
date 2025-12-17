package com.Assistant.Email.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Assistant.Email.EmailType.EmailRequest;
import com.Assistant.Email.Service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// @CrossOrigin(origins="http://localhost:5173/")
@CrossOrigin(origins="*")
@RequestMapping("/email/api")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<String> GenerateEmail(@RequestBody EmailRequest emailRequest){
        String Response = emailService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(Response);
    }
}
