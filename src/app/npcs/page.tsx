"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  Briefcase,
  Calendar,
  Cloud,
  Dice5,
  DollarSign,
  Heart,
  Loader2,
  MapPin,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { Npc } from "../services/types";
import { api } from "../services/api";
import TopBar from "../components/TopBar";

export default function Home() {
  const [npcs, setNpcs] = useState<Npc[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function requestNewNpc() {
    setIsLoading(true);
    const request = async () => {
      try {
        const response = await api.generateNewNpc();
        setNpcs((prevCities) => [...prevCities, response]);
      } catch (error) {
        console.error("Erro ao gerar cidade:", error);
      } finally {
        setIsLoading(false);
      }
    };
    request();
  }

  function removeCity(cityId: number) {
    setNpcs((prevCities) => prevCities.filter((city) => city.id !== cityId));
  }

  useEffect(() => {
    console.log(npcs);
  }, [npcs]);

  return (
    <main className="container mx-auto py-8 ">
      <TopBar />

      <h1 className="text-3xl font-bold text-center mb-8">Gerador de NPC's</h1>

      <div className="grid gap-8 md:grid-cols-[350px_1fr]">
        {/* Painel de controle */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Painel de Configuração</CardTitle>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={requestNewNpc}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Dice5 className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Gerando..." : "Aleatória"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Lista de cidades */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Seus NPC's</h2>

          {npcs.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma cidade foi gerada ainda!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {npcs.map((npc) => (
                <Card key={npc.id} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{npc.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <span className="font-medium">Raça:</span> {npc.race}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeNpc(npc.id)}
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {/* Idade */}
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Idade</p>
                          <p className="text-sm text-muted-foreground">
                            {npc.age}
                          </p>
                        </div>
                      </div>

                      {/* Ocupação */}
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Ocupação</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {npc.ocupation}
                          </p>
                        </div>
                      </div>

                      {/* História */}
                      <div className="flex items-start gap-2">
                        <Book className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">História</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {npc.history}
                          </p>
                        </div>
                      </div>

                      {/* Descrição */}
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Descrição</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {npc.description}
                          </p>
                        </div>
                      </div>

                      {/* Interesses */}
                      <div className="flex items-start gap-2">
                        <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Interesses</p>
                          <p className="text-sm text-muted-foreground">
                            {npc.interest}
                          </p>
                        </div>
                      </div>

                      {/* Data de criação */}
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        Criado em:{" "}
                        {new Date(npc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
