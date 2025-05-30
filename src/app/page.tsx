"use client";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Button } from "@/components/ui/button";
import TopBar from "./components/TopBar";

export default function Home() {
  const [generators, setGenerators] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <main className="container mx-auto py-8">
      <TopBar />

      <div className="flex py-52 items-center justify-center">
        {generators === true ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12 px-4 md:px-8">
              <Link
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
                href="/towns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 md:h-24 w-16 md:w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-lg md:text-xl font-medium">Cidades</span>
              </Link>

              <Link
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
                href="/npcs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 md:h-24 w-16 md:w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-lg md:text-xl font-medium">NPC's</span>
              </Link>

              <Link
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-not-allowed opacity-50 shadow-md pointer-events-none"
                href="/npcs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 md:h-24 w-16 md:w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-lg md:text-xl font-medium">Item</span>
              </Link>

              <Link
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-not-allowed opacity-50 shadow-md pointer-events-none"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 md:h-24 w-16 md:w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-lg md:text-xl font-medium">
                  Histórias
                </span>
              </Link>

              <Link
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-not-allowed opacity-50 shadow-md pointer-events-none"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 md:h-24 w-16 md:w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-lg md:text-xl font-medium">Locais</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-12 px-8">
              <div
                className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
                onClick={() => setGenerators(!generators)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span className="text-xl font-medium">Geradores</span>
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors  shadow-md opacity-50 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-xl font-medium">Fichas</span>
              </div>

              <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors shadow-md opacity-50 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <span className="text-xl font-medium">Fila</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
