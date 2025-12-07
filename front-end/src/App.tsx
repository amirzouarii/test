import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ Import
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import Chat from "./pages/chat";

function App() {
  return (
    <AuthProvider> {/* ✅ Wrapper ajouté */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;