"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function TopBar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  // Se não estiver autenticado, mostra botões de login/registro
  if (!isAuthenticated) {
    return (
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push("/login")}>
          Entrar
        </Button>
        <Button onClick={() => router.push("/register")}>Criar Conta</Button>
      </div>
    );
  }

  // Se estiver autenticado, mostra o menu completo
  return (
    <div className="flex justify-end items-center gap-4">
      {/* Saudação ao usuário */}
      <span className="text-sm text-muted-foreground">Olá, {user?.name}</span>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Minhas Criações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col p-2 w-48">
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/sheets")}
                >
                  Minhas Fichas
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/mytowns")}
                >
                  Cidades
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/locations")}
                >
                  Locais
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/mynpcs")}
                >
                  NPC's
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/quests")}
                >
                  Quests
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Perfil</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col p-2 w-48">
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/settings")}
                >
                  Configurações
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/create-team")}
                >
                  Criar Time
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => router.push("/theme")}
                >
                  Tema
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="w-full px-4 py-2 hover:bg-muted rounded cursor-pointer text-red-600"
                  onClick={logout}
                >
                  Sair
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
