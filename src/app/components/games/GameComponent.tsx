'use client'

import React, {useEffect} from "react";
import {RPGGames} from "@/app/services/types";

export default function GameComponent(params) {
    const [game, setGame] = React.useState<RPGGames>({
        description: "",
        name: ""
    });

    const [isEditing, setIsEditing] = React.useState(false);
    const [editedGame, setEditedGame] = React.useState(game);
    const [playerEmail, setPlayerEmail] = React.useState('');

    useEffect(() => {
        debugger
        const loadData = async () => {
            debugger
            const result = await api.getGame(params.id)
            setGame(result)
        }
        loadData();
    }, [params.id])

    const handleEdit = () => {
        setEditedGame(game);
        setIsEditing(true);
    };

    const handleSave = () => {
        setGame(editedGame);
        setIsEditing(false);
        console.log('Salvando jogo:', editedGame);
    };

    const handleCancel = () => {
        setEditedGame(game);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditedGame(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddPlayer = () => {
        if (playerEmail && !editedGame.players.includes(playerEmail)) {
            setEditedGame(prev => ({
                ...prev,
                players: [...prev.players, playerEmail]
            }));
            setPlayerEmail('');
        }
    };

    const handleRemovePlayer = (email) => {
        setEditedGame(prev => ({
            ...prev,
            players: prev.players.filter(p => p !== email)
        }));
    };

    return (
        <main className="container mx-auto py-8 min-h-screen bg-background">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {isEditing ? 'Editando Jogo' : 'Detalhes do Jogo'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEditing ? 'Faça as alterações necessárias' : 'Visualize e gerencie as informações do jogo'}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mb-6">
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Editar Jogo
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                                Salvar
                            </button>
                            <button
                                onClick={handleCancel}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                {/* Game Details Card */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <div className="space-y-6">
                            {/* ID Field */}
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    ID do Jogo
                                </label>
                                <input
                                    type="text"
                                    value={isEditing ? editedGame.id : game.id}
                                    onChange={(e) => handleInputChange('id', e.target.value)}
                                    disabled={!isEditing}
                                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        isEditing
                                            ? 'border-input bg-background'
                                            : 'border-input bg-muted cursor-not-allowed'
                                    }`}
                                    placeholder="Digite o ID do jogo"
                                />
                            </div>

                            {/* Name Field */}
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    Nome do Jogo
                                </label>
                                <input
                                    type="text"
                                    value={isEditing ? editedGame.name : game.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    disabled={!isEditing}
                                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        isEditing
                                            ? 'border-input bg-background'
                                            : 'border-input bg-muted cursor-not-allowed'
                                    }`}
                                    placeholder="Digite o nome do jogo"
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    Descrição
                                </label>
                                <textarea
                                    value={isEditing ? editedGame.description : game.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    disabled={!isEditing}
                                    rows={4}
                                    className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${
                                        isEditing
                                            ? 'border-input bg-background'
                                            : 'border-input bg-muted cursor-not-allowed'
                                    }`}
                                    placeholder="Digite a descrição do jogo"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    {(isEditing ? editedGame.description : game.description).length} caracteres
                                </p>
                            </div>

                            {/* Players Section */}
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                    Jogadores
                                </label>

                                {/* Add Player Input (only in edit mode) */}
                                {isEditing && (
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="email"
                                            value={playerEmail}
                                            onChange={(e) => setPlayerEmail(e.target.value)}
                                            className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="Email do jogador"
                                        />
                                        <button
                                            onClick={handleAddPlayer}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2"
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                )}

                                {/* Players List */}
                                <div className="space-y-2">
                                    {(isEditing ? editedGame.players : game.players).length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {(isEditing ? editedGame.players : game.players).map((email) => (
                                                <div
                                                    key={email}
                                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                                >
                                                    <span>{email}</span>
                                                    {isEditing && (
                                                        <button
                                                            onClick={() => handleRemovePlayer(email)}
                                                            className="ml-2 hover:bg-primary-foreground/20 rounded-full p-0.5"
                                                        >
                                                            <svg className="h-3 w-3" fill="none" stroke="currentColor"
                                                                 viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">Nenhum jogador adicionado</p>
                                    )}
                                </div>
                            </div>

                            {/* Dates Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                        Criado em
                                    </label>
                                    <div
                                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                                        {new Date(game.createdAt).toLocaleDateString("pt-BR", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                                        Última atualização
                                    </label>
                                    <div
                                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground">
                                        {new Date(game.updatedAt).toLocaleDateString("pt-BR", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center p-6 pt-0">
                        {isEditing ? (
                            <div className="flex items-center text-sm text-muted-foreground">
                                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                </svg>
                                Modo de edição ativo - Lembre-se de salvar suas alterações
                            </div>
                        ) : (
                            <div className="flex items-center text-sm text-muted-foreground">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Clique em "Editar Jogo" para fazer alterações
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}