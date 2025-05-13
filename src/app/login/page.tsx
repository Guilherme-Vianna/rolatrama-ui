"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (error) {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl border">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Acesse sua conta para continuar
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <Button
            type="submit"
            variant="outline"
            className="w-full border-black text-black bg-white hover:bg-gray-100"
            disabled={isLoading}
            size="lg"
            onClick={() => router.push("/")}
          >
            Continuar sem criar conta
          </Button>

          <div className="text-center text-sm mt-2">
            <span className="text-muted-foreground">Não tem uma conta?</span>{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
