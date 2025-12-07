const API_URL = "http://localhost:8080/api";

interface LoginResponse {
  token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

