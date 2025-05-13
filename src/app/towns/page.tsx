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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Town } from "../services/types";
import { api } from "../services/api";

export default function Home() {
  const [cities, setCities] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function requestNewCity() {
    setIsLoading(true);
    const request = async () => {
      try {
        const response = await api.generateNewTown();
        setCities((prevCities) => [...prevCities, response]);
      } catch (error) {
        console.error("Erro ao gerar cidade:", error);
      } finally {
        setIsLoading(false);
      }
    };
    request();
  }

  function removeCity(cityId: number) {
    setCities((prevCities) => prevCities.filter((city) => city.id !== cityId));
  }

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return (
    <main className="container mx-auto py-8 ">
      <div className="flex justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Minhas Criações</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Cidades
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Locais
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  NPC's
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Quests
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Perfil</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Configurações
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Criar Time
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Tema
                </NavigationMenuLink>
                <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                  Sair
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        Gerador de Cidades de RPG
      </h1>

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
                onClick={requestNewCity}
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
          <h2 className="text-2xl font-bold">Suas Cidades</h2>

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
                      <Button
                        variant="ghost"
                        onClick={() => removeCity(city.id)}
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
