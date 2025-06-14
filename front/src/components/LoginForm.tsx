"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/admins/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Error ${response.status}: Login fallido`
        );
      }

      if (data.token && email) {
        login(email, data.token); // ✅ Guardamos email y token en localStorage
        router.push("/admin/dashboard"); // 🔥 Redirección tras login exitoso
      } else {
        throw new Error(
          "Error en la respuesta del servidor: falta email o token."
        );
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado durante el login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="space-y-6 max-w-md mx-auto p-8 border rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Iniciar Sesión
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
          {error}
        </p>
      )}

      <div>
        <label
          htmlFor="email-login"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo Electrónico
        </label>
        <input
          id="email-login"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500"
          placeholder="tu@ejemplo.com"
          disabled={isLoading}
        />
      </div>

      <div>
        <label
          htmlFor="password-login"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <input
          id="password-login"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500"
          placeholder="********"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className={`w-full py-2 px-4 rounded-md text-white ${
          isLoading || !email || !password
            ? "bg-gray-400"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}
