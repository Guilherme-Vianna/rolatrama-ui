'use client'

import TopBar from "@/app/components/TopBar";
import {useEffect, useState} from "react";
import {api} from "@/app/services/api";
import {RPGSheetGURPSModel, RPGSheetGURPSModelList} from "@/app/services/types";
import {useRouter} from "next/navigation";

export default function Page() {
    const [sheets, setSheets] = useState<RPGSheetGURPSModelList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadSheets = async () => {
            try {
                setLoading(true);
                const result = await api.getSheets();
                setSheets(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load sheets');
            } finally {
                setLoading(false);
            }
        };

        loadSheets();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center">Loading characters...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    function handleCreateNew() {
        const createSheet = async () => {
            const result = await api.createSheet()
            router.push(`/sheets/${result.id}`)
        }
        createSheet();
    }

    return (
        <main className="container mx-auto py-8">
            <TopBar></TopBar>
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">RPG Character Sheets</h1>
                    <p className="text-muted-foreground">Manage your GURPS characters</p>
                </div>

                {/* Add New Sheet Button */}
                <div className="mb-6">
                    <button
                        onClick={() => handleCreateNew()}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Create New Character
                    </button>
                </div>

                {/* Sheets Grid or Empty State */}
                {sheets.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Characters Yet</h3>
                        <p className="text-muted-foreground mb-6">Create your first RPG character to get started!</p>
                        <button
                            onClick={() => handleCreateNew()}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                            </svg>
                            Create Character
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sheets.map((sheet) => (
                            <div
                                key={sheet.id}
                                className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="p-6">
                                    {/* Character Name */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold leading-none tracking-tight mb-1">
                                            {sheet.data.nome}
                                        </h3>
                                    </div>

                                    {/* Total Points */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-sm font-medium text-muted-foreground">Total Points</span>
                                            <div className="flex items-center">
                                                <span
                                                    className="text-2xl font-bold text-primary">{sheet.data.total_de_pontos || 0}</span>
                                                <span className="text-sm text-muted-foreground ml-1">pts</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Created</span>
                                            <span className="font-medium">
                        {new Date(sheet.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Last Updated</span>
                                            <span className="font-medium">
                        {new Date(sheet.updatedAt).toLocaleDateString("pt-BR")}
                      </span>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <a
                                        href={`/sheets/${sheet.id}`}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                        View Character
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}