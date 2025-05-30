"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Check, Edit, Trash, X} from "lucide-react";
import IListProps, {RPGSheetCulture} from "@/app/services/types";

export default function CultureList({onValueChange, value, fieldName}: IListProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [items, setitems] = useState<RPGSheetCulture[]>([]);
    const [newItem, setnewItem] = useState<RPGSheetCulture>({
        name: "",
        pontos: ""
    });

    useEffect(() => {
        if (value && Array.isArray(value)) {
            setitems(value);
        } else {
            setitems([]);
        }
    }, [value]);

    useEffect(() => {
        if (items.length > 0 || value === undefined) {
            onValueChange(fieldName)(items);
        }
    }, [items]);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingItem, seteditingItem] = useState<RPGSheetCulture>({
        name: "",
        pontos: ""
    });

    function addLanguage() {
        if (newItem.name.trim()) {
            setitems([...items, newItem]);
            setnewItem({   name: "",
                pontos: ""});
            setIsAdding(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetCulture, value: string) {
        setnewItem({
            ...newItem,
            [field]: value
        });
    }

    function startEditing(index: number) {
        setEditingIndex(index);
        seteditingItem({...items[index]});
    }

    function saveEdit() {
        if (editingIndex !== null) {
            const updatedLanguages = [...items];
            updatedLanguages[editingIndex] = editingItem;
            setitems(updatedLanguages);
            setEditingIndex(null);
        }
    }

    function handleEditChange(field: keyof RPGSheetCulture, value: string) {
        seteditingItem({
            ...editingItem,
            [field]: value
        });
    }

    return (
        <>
            {items.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-4 font-bold mb-1 text-center">
                        <div>Nome</div>
                        <div>Pontos</div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 mb-1 text-center items-center">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.pontos}
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
                                    <div>{item.name}</div>
                                    <div>{item.pontos}</div>
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
                                                const updatedLanguages = [...items];
                                                updatedLanguages.splice(index, 1);
                                                onValueChange(fieldName)(updatedLanguages);
                                                setitems(updatedLanguages);
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
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="nome"
                            value={newItem.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="pontos"
                            value={newItem.pontos}
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