"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// 1️⃣ Define el tipo de usuario que se almacenará en el contexto
interface AuthUser {
  email: string;
}

// 2️⃣ Define el tipo del contexto
interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
}

// 3️⃣ Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4️⃣ Crea el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🏗️ Cargar estado desde `localStorage`
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const storedEmail = localStorage.getItem("authEmail");

      if (storedToken && storedEmail) {
        setUser({ email: storedEmail });
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error loading auth state from localStorage:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("authEmail");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔑 Función de login
  const login = useCallback((email: string, receivedToken: string) => {
    try {
      localStorage.setItem("authEmail", email);
      localStorage.setItem("authToken", receivedToken);
      setUser({ email });
      setToken(receivedToken);
    } catch (error) {
      console.error("Error saving auth state to localStorage:", error);
    }
  }, []);

  // 🔒 Función de logout
  const logout = useCallback(() => {
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  }, []);

  const value = { user, token, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 5️⃣ Hook para consumir el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
