"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {RPGSheetGURPSVantagemQualidade} from "@/app/services/types";
import {Check, Edit, Trash, X} from "lucide-react";
import {Label} from "@radix-ui/react-label";

export default function CultureList() {
    const [isAdding, setIsAdding] = useState(false);
    const [languages, setLanguages] = useState<RPGSheetGURPSVantagemQualidade[]>([]);
    const [newLanguage, setNewLanguage] = useState<RPGSheetGURPSVantagemQualidade>({
        name: '',
        pontos: ''
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingLanguage, setEditingLanguage] = useState<RPGSheetGURPSVantagemQualidade>({
        name: '',
        pontos: ''
    });

    function addLanguage() {
        if (newLanguage.name.trim()) {
            setLanguages([...languages, newLanguage]);
            setNewLanguage({
                name: '',
                pontos: ''
            });
            setIsAdding(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetGURPSVantagemQualidade, value: string) {
        setNewLanguage({
            ...newLanguage,
            [field]: value
        });
    }

    function startEditing(index: number) {
        setEditingIndex(index);
        setEditingLanguage({...languages[index]});
    }

    function saveEdit() {
        if (editingIndex !== null) {
            const updatedLanguages = [...languages];
            updatedLanguages[editingIndex] = editingLanguage;
            setLanguages(updatedLanguages);
            setEditingIndex(null);
        }
    }

    function handleEditChange(field: keyof RPGSheetGURPSVantagemQualidade, value: string) {
        setEditingLanguage({
            ...editingLanguage,
            [field]: value
        });
    }

    return (
        <>
            <Label>NT</Label>
            <div className="flex w-full gap-1">
                <input className={'w-full border-1'}/>
                <input className={'w-1/6 border-x-1'}/>
            </div>
            {languages.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-4 font-bold mb-1">
                        <div>Nome</div>
                        <div>Pontos</div>
                    </div>
                    {languages.map((lang, index) => (
                        <div key={index} className="grid grid-cols-4 mb-1 text-center items-center">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.pontos}
                                        onChange={(e) => handleEditChange('pontos', e.target.value)}
                                    />
                                    <div>
                                        <Check
                                            className="cursor-pointer mx-auto"
                                            onClick={saveEdit}
                                        />
                                    </div>
                                    <div>
                                        <X
                                            className="cursor-pointer mx-auto"
                                            onClick={() => setEditingIndex(null)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>{lang.name}</div>
                                    <div>{lang.pontos}</div>
                                    <div>
                                        <Edit
                                            className="cursor-pointer mx-auto"
                                            onClick={() => startEditing(index)}
                                        />
                                    </div>
                                    <div>
                                        <Trash
                                            className="cursor-pointer mx-auto"
                                            onClick={() => {
                                                const updatedLanguages = [...languages];
                                                updatedLanguages.splice(index, 1);
                                                setLanguages(updatedLanguages);
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isAdding ? (
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 gap-2">
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="Nome"
                            value={newLanguage.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="Pontos"
                            value={newLanguage.pontos}
                            onChange={(e) => handleInputChange('pontos', e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button onClick={() => setIsAdding(false)}>Cancelar</Button>
                        <Button onClick={addLanguage}>Salvar</Button>
                    </div>
                </div>
            ) : (
                <Button onClick={() => setIsAdding(true)}>Adicionar</Button>
            )}
        </>
    );
}