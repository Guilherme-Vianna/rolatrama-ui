"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Check, Edit, Trash, X} from "lucide-react";
import {RPGSheetGURPSWeapon, RPGSheetListComponentParams} from "@/app/services/types";

export default function WeaponsList({onValueChange, value, fieldName}: RPGSheetListComponentParams) {
    const [isAdding, setIsAdding] = useState(false);
    const [languages, setLanguages] = useState<RPGSheetGURPSWeapon[]>([]);
    const [newLanguage, setNewLanguage] = useState<RPGSheetGURPSWeapon>();

    useEffect(() => {
        if (value && Array.isArray(value)) {
            setLanguages(value);
        } else {
            setLanguages([]);
        }
    }, [value]);

    useEffect(() => {
        if (languages.length > 0 || value === undefined) {
            onValueChange(fieldName)(languages);
        }
    }, [languages]);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingLanguage, setEditingLanguage] = useState<RPGSheetGURPSWeapon>({
        arma: '',
        alcance: "",
        alcance: "",
        aparar: '',
        notas: '',
        custo: '',
        peso: '',
    });

    function addLanguage() {
        if (newLanguage.arma.trim()) {
            setLanguages([...languages, newLanguage]);
            setNewLanguage({
                arma: '',
                alcance: "",
                alcance: "",
                aparar: '',
                notas: '',
                custo: '',
                peso: '',
            });
            setIsAdding(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetGURPSWeapon, value: string) {
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

    function handleEditChange(field: keyof RPGSheetGURPSWeapon, value: string) {
        setEditingLanguage({
            ...editingLanguage,
            [field]: value
        });
    }

    return (
        <>
            {languages.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-9 font-bold mb-1 text-center">
                        <div>Nome</div>
                        <div>Alcance</div>
                        <div>Dano</div>
                        <div>Aparar</div>
                        <div>Notas</div>
                        <div>Custo</div>
                        <div>Peso</div>
                    </div>
                    {languages.map((lang, index) => (
                        <div key={index} className="grid grid-cols-9 mb-1 text-center items-center">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.arma}
                                        onChange={(e) => handleEditChange('arma', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.alcance}
                                        onChange={(e) => handleEditChange('alcance', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.dano}
                                        onChange={(e) => handleEditChange('dano', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.aparar}
                                        onChange={(e) => handleEditChange('aparar', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.notas}
                                        onChange={(e) => handleEditChange('notas', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.custo}
                                        onChange={(e) => handleEditChange('custo', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.peso}
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
                                    <div>{lang.arma}</div>
                                    <div>{lang.alcance}</div>
                                    <div>{lang.alcance}</div>
                                    <div>{lang.aparar}</div>
                                    <div>{lang.notas}</div>
                                    <div>{lang.custo}</div>
                                    <div>{lang.peso}</div>
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
                                                onValueChange(fieldName)(updatedLanguages);
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
                            placeholder="arma"
                            value={newLanguage.arma}
                            onChange={(e) => handleInputChange('arma', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="dano"
                            value={newLanguage.dano}
                            onChange={(e) => handleInputChange('dano', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="alcance"
                            value={newLanguage.alcance}
                            onChange={(e) => handleInputChange('alcance', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="aparar"
                            value={newLanguage.aparar}
                            onChange={(e) => handleInputChange('aparar', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="notas"
                            value={newLanguage.notas}
                            onChange={(e) => handleInputChange('notas', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="custo"
                            value={newLanguage.custo}
                            onChange={(e) => handleInputChange('custo', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="peso"
                            value={newLanguage.peso}
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