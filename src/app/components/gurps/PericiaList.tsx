"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {RPGSheetGURPSPericia} from "@/app/services/types";
import {Edit, Plus, Trash} from "lucide-react";

export default function PericiaList() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [pericias, setPericias] = useState<RPGSheetGURPSPericia[]>([]);
    const [newPericia, setNewPericia] = useState<RPGSheetGURPSPericia>({
        name: '',
        pontos: '',
        nh: '',
        nh_relativo: ''
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingPericia, setEditingPericia] = useState<RPGSheetGURPSPericia>({
        name: '',
        pontos: '',
        nh: '',
        nh_relativo: ''
    });

    function addPericia() {
        if (newPericia.name.trim()) {
            setPericias([...pericias, newPericia]);
            setNewPericia({
                name: '',
                pontos: '',
                nh: '',
                nh_relativo: ''
            });
            setIsCreateModalOpen(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetGURPSPericia, value: string) {
        setNewPericia({
            ...newPericia,
            [field]: value
        });
    }

    function startEditing(index: number) {
        setEditingIndex(index);
        setEditingPericia({...pericias[index]});
        setIsEditModalOpen(true);
    }

    function saveEdit() {
        if (editingIndex !== null) {
            const updatedPericias = [...pericias];
            updatedPericias[editingIndex] = editingPericia;
            setPericias(updatedPericias);
            setIsEditModalOpen(false);
        }
    }

    function handleEditChange(field: keyof RPGSheetGURPSPericia, value: string) {
        setEditingPericia({
            ...editingPericia,
            [field]: value
        });
    }

    function deletePericia(index: number) {
        const updatedPericias = [...pericias];
        updatedPericias.splice(index, 1);
        setPericias(updatedPericias);
    }

    return (
        <div className="w-full">
            {pericias.length > 0 && (
                <div className="mb-4">
                    <div className="flex font-bold mb-2 text-sm">
                        <div className="flex-1">Nome</div>
                        <div className="w-16 text-center">NH</div>
                        <div className="w-24 text-center">NH Relativo</div>
                        <div className="w-16 text-center">Pontos</div>
                        <div className="w-20 text-center">Ações</div>
                    </div>

                    {pericias.map((pericia, index) => (
                        <div key={index} className="flex items-center mb-2 text-sm border-b pb-1">
                            <div className="flex-1">{pericia.name}</div>
                            <div className="w-16 text-center">{pericia.nh}</div>
                            <div className="w-24 text-center">{pericia.nh_relativo}</div>
                            <div className="w-16 text-center">{pericia.pontos}</div>
                            <div className="w-20 flex justify-center space-x-2">
                                <Edit
                                    className="cursor-pointer w-4 h-4"
                                    onClick={() => startEditing(index)}
                                />
                                <Trash
                                    className="cursor-pointer w-4 h-4"
                                    onClick={() => deletePericia(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Button onClick={() => setIsCreateModalOpen(true)}><Plus></Plus></Button>

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white  shadow-2xl border-1 p-4 rounded-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Adicionar Perícia</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <label className="text-sm mb-1">Nome</label>
                                <input
                                    className="border border-gray-300 rounded p-2"
                                    value={newPericia.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-sm mb-1">NH</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={newPericia.nh}
                                        onChange={(e) => handleInputChange('nh', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm mb-1">NH Relativo</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={newPericia.nh_relativo}
                                        onChange={(e) => handleInputChange('nh_relativo', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm mb-1">Pontos</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={newPericia.pontos}
                                        onChange={(e) => handleInputChange('pontos', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button onClick={addPericia}>Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white  shadow-2xl border-1 p-4 rounded-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Editar Perícia</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col">
                                <label className="text-sm mb-1">Nome</label>
                                <input
                                    className="border border-gray-300 rounded p-2"
                                    value={editingPericia.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-sm mb-1">NH</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={editingPericia.nh}
                                        onChange={(e) => handleEditChange('nh', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm mb-1">NH Relativo</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={editingPericia.nh_relativo}
                                        onChange={(e) => handleEditChange('nh_relativo', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm mb-1">Pontos</label>
                                    <input
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={editingPericia.pontos}
                                        onChange={(e) => handleEditChange('pontos', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button onClick={saveEdit}>Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}