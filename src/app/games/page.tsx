'use client'

import TopBar from "@/app/components/TopBar";
import {useEffect, useState} from "react";
import {api} from "@/app/services/api";
import {useRouter} from "next/navigation";
import {RPGGames} from "@/app/services/types";

export default function Page() {
    const [games, setGames] = useState<RPGGames[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [playerEmail, setPlayerEmail] = useState('');
    const [players, setPlayers] = useState<string[]>([]);

    // Estados para o dropdown multiselect
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [availablePlayers, setAvailablePlayers] = useState<string[]>([]);

    // Modal de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<RPGGames | null>(null);

    const router = useRouter();

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);
                const result = await api.getGames();
                setGames(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar jogos');
            } finally {
                setLoading(false);
            }
        };
        loadGames();
    }, []);

    function handleAddPlayer() {
        if (playerEmail && !players.includes(playerEmail) && !availablePlayers.includes(playerEmail)) {
            setAvailablePlayers([...availablePlayers, playerEmail]);
            setPlayers([...players, playerEmail]);
            setPlayerEmail('');
        }
    }

    function handlePlayerToggle(email: string) {
        setPlayers(prev => {
            if (prev.includes(email)) {
                return prev.filter(p => p !== email);
            } else {
                return [...prev, email];
            }
        });
    }

    function handleRemovePlayer(email: string) {
        setPlayers(prev => prev.filter(p => p !== email));
    }

    async function handleCreateGame() {
        try {
            setLoading(true);
            await api.createGame({
                name: title,
                description: desc,
                players_emails: players,
            });
            setShowCreate(false);
            setTitle('');
            setDesc('');
            setPlayers([]);
            router.refresh();
        } catch (err) {
            setError('Erro ao criar jogo');
        } finally {
            setLoading(false);
        }
    }

    function openDeleteModal(game: RPGGames) {
        setGameToDelete(game);
        setShowDeleteModal(true);
    }

    function closeDeleteModal() {
        setGameToDelete(null);
        setShowDeleteModal(false);
    }

    async function handleDeleteGame() {
        if (!gameToDelete) return;
        try {
            setLoading(true);
            await api.deleteGame(gameToDelete.id);
            setGames(games.filter(g => g.id !== gameToDelete.id));
            closeDeleteModal();
        } catch (err) {
            setError('Erro ao excluir jogo');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center">Carregando jogos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <div className="text-center text-red-500">Erro: {error}</div>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8">
            <TopBar/>
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Meus Jogos</h1>
                    <p className="text-muted-foreground">Gerencie seus jogos de RPG em andamento</p>
                </div>

                {/* Add New Game Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreate(true)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Criar novo jogo
                    </button>
                </div>

                {/* Card de criação de novo jogo */}
                {showCreate && (
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Novo Jogo</h2>

                            {/* Título */}
                            <div className="mb-4">
                                <input
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Título do jogo"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            {/* Descrição */}
                            <div className="mb-4">
                                <textarea
                                    className="border rounded px-3 py-2 w-full"
                                    placeholder="Descrição"
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                />
                            </div>

                            {/* Input para adicionar novo jogador */}
                            <div className="mb-4 flex gap-2">
                                <input
                                    className="border rounded px-3 py-2 flex-1"
                                    placeholder="Email do jogador"
                                    value={playerEmail}
                                    onChange={e => setPlayerEmail(e.target.value)}
                                />
                                <button
                                    className="bg-accent px-3 py-2 rounded hover:bg-accent/90"
                                    onClick={handleAddPlayer}
                                    type="button"
                                >
                                    Adicionar
                                </button>
                            </div>

                            {/* Lista de jogadores selecionados */}
                            {players.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Jogadores Selecionados:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {players.map((email) => (
                                            <div
                                                key={email}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                            >
                                                <span>{email}</span>
                                                <button
                                                    onClick={() => handleRemovePlayer(email)}
                                                    className="hover:bg-blue-200 rounded-full p-1"
                                                >
                                                    <svg className="h-3 w-3" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botões de ação */}
                            <div className="flex gap-2">
                                <button
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                                    onClick={handleCreateGame}
                                >
                                    Salvar
                                </button>
                                <button
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                    onClick={() => setShowCreate(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de confirmação de exclusão */}
                {showDeleteModal && gameToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40"
                         onClick={() => setShowDeleteModal(false)}>
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full"
                             onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-xl font-bold mb-4">Excluir jogo</h2>
                            <p className="mb-6">Tem certeza que deseja excluir o jogo <span
                                className="font-semibold">{gameToDelete.name}</span>? Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                    onClick={closeDeleteModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    onClick={handleDeleteGame}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Games Grid or Empty State */}
                {games.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Você ainda não tem jogos criados</h3>
                        <p className="text-muted-foreground mb-6">Crie seu primeiro jogo agora!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="relative rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 h-80"
                            >
                                {/* Botão de excluir no canto superior direito */}
                                <button
                                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                    title="Excluir jogo"
                                    onClick={() => openDeleteModal(game)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <div className="p-6">
                                    {/* Game Title */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold leading-none tracking-tight mb-1">
                                            {game.name}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                       <span className="text-muted-foreground">
                                            {game.description.length > 60
                                                ? game.description.slice(0, 60) + '...'
                                                : game.description}
                                        </span>
                                    </div>

                                    {/* Players */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-muted-foreground">Jogadores</span>
                                            <div className="flex items-center">
                                                <span className="text-sm font-bold text-primary">
                                                    {game.players && game.players.length > 0 ? game.players.join(', ') : 'Nenhum'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Criado em</span>
                                            <span className="font-medium">
                                                {new Date(game.createdAt).toLocaleDateString("pt-BR")}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Atualizado em</span>
                                            <span className="font-medium">
                                                {new Date(game.updatedAt).toLocaleDateString("pt-BR")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <a
                                        href={`/games/${game.id}`}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                        Ver Jogo
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