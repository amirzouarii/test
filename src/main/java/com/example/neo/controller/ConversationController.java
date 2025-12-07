package com.example.neo.controller;

import com.example.neo.Message;
import com.example.neo.User;
import com.example.neo.dto.ChatRequest;
import com.example.neo.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/conversations")
@CrossOrigin(origins = "*")
public class ConversationController {

    private final ConversationService conversationService;

    // Chat avec Gemini (utilisateur authentifié)
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody ChatRequest request,
                                                    Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();

            String geminiReply = conversationService.saveConversationWithGemini(
                    user.getEmail(),
                    request.getMessage()
            );

            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "userMessage", request.getMessage(),
                    "geminiReply", geminiReply
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    // Récupérer ses propres messages
    @GetMapping("/my-messages")
    public ResponseEntity<List<Message>> getMyMessages(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Message> messages = conversationService.getUserMessages(user.getEmail());
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Récupérer ses conversations avec statistiques
    @GetMapping("/my-conversations")
    public ResponseEntity<?> getMyConversations(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Message> messages = conversationService.getUserMessages(user.getEmail());

            return ResponseEntity.ok(Map.of(
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "messages", messages,
                    "totalMessages", messages.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }
}