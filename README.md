ChatBot AI with Gemini - Full Stack Application
A modern full-stack chat application powered by Google's Gemini AI, built with React (TypeScript) frontend and Spring Boot backend, using Neo4j for data persistence.
📋 Table of Contents

Features
Tech Stack
Prerequisites
Backend Setup
Frontend Setup
Neo4j Setup
Environment Variables
Running the Application
Testing the Endpoints
Troubleshooting

✨ Features

🤖 Real-time chat with Gemini AI
🔐 JWT-based authentication
💾 Persistent conversation history
🎨 Modern, responsive UI with Tailwind CSS
📱 Mobile-friendly design
🔄 Message history management
🚀 Real-time message updates

🛠 Tech Stack
Frontend:

React 18 with TypeScript
Vite
Tailwind CSS
React Router DOM
Lucide React (icons)

Backend:

Spring Boot 3.x
Spring Security with JWT
Neo4j Database
Google Gemini AI API
Lombok

Neo4j


Torun the front-end:

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Run the development server:

npm run dev

Database Schema
The application automatically creates these node types:
cypher// User Node
(:User {
  id: Long,
  name: String,
  email: String,
  password: String (hashed)
})

// Message Node
(:Message {
  id: Long,
  content: String,
  sender: String,
  timestamp: DateTime,
  userEmail: String
})

// Relationships
(:User)-[:SENT]->(:Message)
