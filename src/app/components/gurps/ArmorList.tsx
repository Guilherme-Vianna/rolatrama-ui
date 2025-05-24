"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Check, Edit, Trash, X} from "lucide-react";
import {RPGSheetGURPSArmor} from "@/app/services/types";

export default function ArmorList({onValueChange, value, fieldName}) {
    const [isAdding, setIsAdding] = useState(false);
    const [items, setitems] = useState<RPGSheetGURPSArmor[]>([]);
    const [newItem, setnewItem] = useState<RPGSheetGURPSArmor>({});

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
    const [editingItem, seteditingItem] = useState<RPGSheetGURPSArmor>({});

    function addLanguage() {
        if (newItem.item.trim()) {
            setitems([...items, newItem]);
            setnewItem({});
            setIsAdding(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetGURPSArmor, value: string) {
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

    function handleEditChange(field: keyof RPGSheetGURPSArmor, value: string) {
        seteditingItem({
            ...editingItem,
            [field]: value
        });
    }

    return (
        <>
            {items.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-6 font-bold mb-1 text-center">
                        <div>Item</div>
                        <div>Posicao</div>
                        <div>Custo</div>
                        <div>Peso</div>
                    </div>
                    {items.map((items, index) => (
                        <div key={index} className="grid grid-cols-6 mb-1 text-center items-center">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.item}
                                        onChange={(e) => handleEditChange('item', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.posicao}
                                        onChange={(e) => handleEditChange('posicao', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.custo}
                                        onChange={(e) => handleEditChange('custo', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingItem.peso}
                                        onChange={(e) => handleEditChange('peso', e.target.value)}
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
                                    <div>{items.item}</div>
                                    <div>{items.posicao}</div>
                                    <div>{items.custo}</div>
                                    <div>{items.peso}</div>
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
                    <div className="grid grid-cols-6 gap-2">
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="item"
                            value={newItem.item}
                            onChange={(e) => handleInputChange('item', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="posicao"
                            value={newItem.posicao}
                            onChange={(e) => handleInputChange('posicao', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="custo"
                            value={newItem.custo}
                            onChange={(e) => handleInputChange('custo', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="peso"
                            value={newItem.peso}
                            onChange={(e) => handleInputChange('peso', e.target.value)}
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