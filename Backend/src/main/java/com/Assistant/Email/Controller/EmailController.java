package com.Assistant.Email.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Assistant.Email.EmailType.EmailRequest;
import com.Assistant.Email.Service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// @CrossOrigin(origins="http://localhost:5173/")
@CrossOrigin(origins = "*")
@RequestMapping("/email/api")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<String> GenerateEmail(@RequestHeader(value = "X-EXT-KEY", required = false) String extKey,
            @RequestBody EmailRequest emailRequest) {

        // for key validation
        if (!"b00faiih".equals(extKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Invalid Extension Key");
        }

        String Response = emailService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(Response);
    }

    @GetMapping("/email")
    public ResponseEntity<String> Home() {
        return ResponseEntity.ok("YOU ARE ON HOME PAGE...");
    }
}
