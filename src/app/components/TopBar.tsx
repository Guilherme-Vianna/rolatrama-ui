"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  return (
    <div className="flex justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Minhas Criações</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink
                className="w-full px-4 py-2 hover:bg-muted rounded"
                href="/mytowns"
              >
                Cidades
              </NavigationMenuLink>
              <NavigationMenuLink className="w-full px-4 py-2 hover:bg-muted rounded">
                Locais
              </NavigationMenuLink>
              <NavigationMenuLink
                className="w-full px-4 py-2 hover:bg-muted rounded"
                href="/mynpcs"
              >
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
  );
}
