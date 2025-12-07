package com.example.neo.service;

import com.example.neo.Message;
import com.example.neo.User;
import com.example.neo.repository.MessageRepository;
import com.example.neo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final GeminiService geminiService;

    @Transactional
    public String saveConversationWithGemini(String email, String userMessage) {
        // Appeler Gemini
        String geminiReply = geminiService.AskGemini(userMessage);

        // Récupérer l'utilisateur par email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Créer les messages
        Message userMsg = new Message();
        userMsg.setText(userMessage);
        userMsg.setTimestamp(System.currentTimeMillis());
        userMsg.setReplies(new ArrayList<>());

        Message geminiMsg = new Message();
        geminiMsg.setText(geminiReply);
        geminiMsg.setTimestamp(System.currentTimeMillis());
        geminiMsg.setReplies(new ArrayList<>());

        // Sauvegarder
        userMsg = messageRepository.save(userMsg);
        geminiMsg = messageRepository.save(geminiMsg);

        // Créer les relations
        userMsg.getReplies().add(geminiMsg);
        userMsg = messageRepository.save(userMsg);

        user.getMessages().add(userMsg);
        userRepository.save(user);

        return geminiReply;
    }

    public List<Message> getUserMessages(String email) {
        return userRepository.findByEmailWithMessages(email)
                .map(User::getMessages)
                .orElse(Collections.emptyList());
    }
}