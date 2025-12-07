import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Send, LogOut, MessageCircle, Sparkles, Menu, ArrowLeft } from "lucide-react";

interface Message {
  id?: number;
  userEmail?: string;
  content: string;
  sender: "user" | "gemini";
}

export default function Chat() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Vérifier l'authentification
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Charger les messages existants
  useEffect(() => {
  const fetchMessages = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8080/api/conversations/my-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des messages");
      const rawData = await res.json();
      const mappedMessages: Message[] = rawData.map((m: any) => ({
        id: m.id,
        content: m.content,      // adapter si le backend renvoie un autre champ
        sender: m.sender,        // "user" ou "gemini"
        userEmail: m.userEmail,  // facultatif
      }));
      setMessages(mappedMessages);
    } catch (err) {
      console.error("Erreur fetch messages:", err);
    }
  };

  fetchMessages();
}, [token]);


  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !token) return;

    const userMessage: Message = { content: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/conversations/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      if (data.status === "success") {
        const geminiMessage: Message = { content: data.geminiReply, sender: "gemini" };
        setMessages((prev) => [...prev, geminiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { content: "Erreur: " + data.message, sender: "gemini" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { content: "Erreur lors de la requête.", sender: "gemini" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
         <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Chat with Gemini
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI Assistant Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </header>

      {/* Messages Container - Full Height */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
          <div className="w-full space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Start a Conversation
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Ask me anything! I'm here to help you with questions, ideas, or just a friendly chat.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div className="flex gap-3 max-w-3xl">
                  {msg.sender === "gemini" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`px-5 py-3 rounded-2xl shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1.5 opacity-70">
                      {msg.sender === "user" ? "You" : "Gemini AI"}
                    </p>
                    <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-semibold">U</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-sm shadow-md border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-md">
          <div className="w-full px-4 lg:px-8 py-4 lg:py-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white shadow-sm transition-all"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 lg:px-8 py-3.5 rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                <span className="hidden lg:inline font-medium">Send</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Gemini AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}