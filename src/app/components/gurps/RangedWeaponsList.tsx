"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Check, Edit, Trash, X} from "lucide-react";
import {RPGSheetGURPSRangedWeapon, RPGSheetGURPSWeapon} from "@/app/services/types";

export default function RangedWeaponsList({onValueChange, value, fieldName}) {
    const [isAdding, setIsAdding] = useState(false);
    const [languages, setLanguages] = useState<RPGSheetGURPSRangedWeapon[]>([]);
    const [newLanguage, setNewLanguage] = useState<RPGSheetGURPSRangedWeapon>({});

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
    const [editingLanguage, setEditingLanguage] = useState<RPGSheetGURPSRangedWeapon>({
        arma: '',
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
                aparar: '',
                notas: '',
                custo: '',
                peso: '',
            });
            setIsAdding(false);
        }
    }

    function handleInputChange(field: keyof RPGSheetGURPSRangedWeapon, value: string) {
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

    function handleEditChange(field: keyof RPGSheetGURPSRangedWeapon, value: string) {
        setEditingLanguage({
            ...editingLanguage,
            [field]: value
        });
    }

    return (
        <>
            {languages.length > 0 && (
                <div className="mb-4">
                    <div className="grid grid-cols-15 font-bold text-center mb-1">
                        <div>Arma</div>
                        <div>Dano</div>
                        <div>Prec</div>
                        <div>Distancia</div>
                        <div>CdT</div>
                        <div>Tiros</div>
                        <div>ST</div>
                        <div>Magnitude</div>
                        <div>RCO</div>
                        <div>CL</div>
                        <div>Notas</div>
                        <div>Custo</div>
                        <div>Peso</div>
                    </div>
                    {languages.map((lang, index) => (
                        <div key={index} className="grid grid-cols-15 mb-1 text-center items-center">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.arma}
                                        onChange={(e) => handleEditChange('arma', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.dano}
                                        onChange={(e) => handleEditChange('dano', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.prec}
                                        onChange={(e) => handleEditChange('prec', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.distancia}
                                        onChange={(e) => handleEditChange('distancia', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.cdT}
                                        onChange={(e) => handleEditChange('cdT', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.tiros}
                                        onChange={(e) => handleEditChange('tiros', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.st}
                                        onChange={(e) => handleEditChange('st', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.magnitude}
                                        onChange={(e) => handleEditChange('magnitude', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.rco}
                                        onChange={(e) => handleEditChange('rco', e.target.value)}
                                    />
                                    <input
                                        className="border border-gray-300 w-full text-center p-1"
                                        value={editingLanguage.cl}
                                        onChange={(e) => handleEditChange('cl', e.target.value)}
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
                                    <div>{lang.dano}</div>
                                    <div>{lang.prec}</div>
                                    <div>{lang.distancia}</div>
                                    <div>{lang.cdT}</div>
                                    <div>{lang.tiros}</div>
                                    <div>{lang.st}</div>
                                    <div>{lang.magnitude}</div>
                                    <div>{lang.rco}</div>
                                    <div>{lang.cl}</div>
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
                    <div className="grid grid-cols-15 gap-1">
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
                            placeholder="prec"
                            value={newLanguage.prec}
                            onChange={(e) => handleInputChange('prec', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="distancia"
                            value={newLanguage.distancia}
                            onChange={(e) => handleInputChange('distancia', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="cdT"
                            value={newLanguage.cdT}
                            onChange={(e) => handleInputChange('cdT', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="tiros"
                            value={newLanguage.tiros}
                            onChange={(e) => handleInputChange('tiros', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="st"
                            value={newLanguage.st}
                            onChange={(e) => handleInputChange('st', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="magnitude"
                            value={newLanguage.magnitude}
                            onChange={(e) => handleInputChange('magnitude', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="rco"
                            value={newLanguage.rco}
                            onChange={(e) => handleInputChange('rco', e.target.value)}
                        />
                        <input
                            className="border border-gray-300 w-full text-center p-1"
                            placeholder="cl"
                            value={newLanguage.cl}
                            onChange={(e) => handleInputChange('cl', e.target.value)}
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