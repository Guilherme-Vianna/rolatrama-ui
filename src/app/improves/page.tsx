"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { api } from "../services/api";

export default function SuggestionsPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await api.createImprove(formData);

      setSuccess("Sugestão enviada com sucesso! Obrigado pela contribuição.");
      setFormData({ title: "", description: "" });
    } catch (error) {
      setError("Erro ao enviar a sugestão. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl border">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lightbulb className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Enviar Sugestão</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tem uma ideia para melhorar nossa plataforma? Compartilhe conosco!
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título da sugestão</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Resuma sua ideia em poucas palavras"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição da sugestão</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva sua sugestão detalhadamente. Como isso melhoraria a experiência dos usuários?"
                required
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="resize-none"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="bg-green-50 border-green-400">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Enviando..." : "Enviar Sugestão"}
          </Button>
        </form>
      </div>
    </div>
  );
}
