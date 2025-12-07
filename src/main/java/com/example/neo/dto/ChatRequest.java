package com.example.neo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private String message;  // Plus besoin de userId/userName (récupéré du token)
}

//supprime conversationRequest