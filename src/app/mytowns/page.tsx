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
  Cloud,
  Dice5,
  DollarSign,
  Loader2,
  MapPin,
  Shield,
  Trash2,
} from "lucide-react";
import { Town } from "../services/types";
import { api } from "../services/api";
import TopBar from "../components/TopBar";

export default function Home() {
  const [cities, setCities] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function loadCities() {
    const request = async () => {
      try {
        setIsLoading(true);
        const result = await api.getAllTowns();
        console.log(result);
        setCities(result);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      } finally {
        setIsLoading(false);
      }
    };
    request();
  }

  useEffect(() => {
    loadCities();
  }, []);

  // Renderização condicional
  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de loading
  }
  return (
    <main className="container mx-auto py-8 ">
      <TopBar />
      <h1 className="text-3xl font-bold text-center mb-8">Minhas Cidades</h1>

      <div className="grid gap-8">
        {/* Lista de cidades */}
        <div className="space-y-6">
          {cities.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma cidade foi gerada ainda!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {cities.map((city) => (
                <Card key={city.id} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{city.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <span className="font-medium">Tamanho:</span>{" "}
                          {city.size}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {/* Clima */}
                      <div className="flex items-start gap-2">
                        <Cloud className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Clima</p>
                          <p className="text-sm text-muted-foreground">
                            {city.whether}
                          </p>
                        </div>
                      </div>

                      {/* Localização */}
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Localização</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {city.locationDescription}
                          </p>
                        </div>
                      </div>

                      {/* História */}
                      <div className="flex items-start gap-2">
                        <Book className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">História</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {city.history}
                          </p>
                        </div>
                      </div>

                      {/* Economia */}
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Economia</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {city.economy}
                          </p>
                        </div>
                      </div>

                      {/* Criminalidade */}
                      <div className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Criminalidade</p>
                          <p className="text-sm text-muted-foreground">
                            {city.criminality}
                          </p>
                        </div>
                      </div>

                      {/* Operacoes */}
                      <div className="flex flex-col sm:flex-row justify-center gap-5 w-full">
                        <Button className="w-full sm:w-1/2">
                          Gerar Localizações
                        </Button>
                        <Button className="w-full sm:w-1/2">Gerar NPC's</Button>
                      </div>

                      {/* Data de criação */}
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        Criado em:{" "}
                        {new Date(city.createdAt).toLocaleDateString()}
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
