"use client";
import {Card, CardTitle, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useEffect, useState} from "react";
import {RPGSheetGURPSModel} from "@/app/services/types";
import {api} from "@/app/services/api";
import {CheckCircle, Loader2, XCircle} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import BaseAttribute from "../gurps/BaseAttribute";
import MiniInput from "../gurps/MiniInput";
import SectionContainer from "../gurps/SectionContainer";
import LanguageList from "../gurps/LanguageList";
import AdvantageList from "@/app/components/gurps/AdvantageList";
import CultureList from "@/app/components/gurps/CultureList";
import PericiaList from "@/app/components/gurps/PericiaList";
import WeaponsList from "@/app/components/gurps/WeaponsList";
import RangedWeaponsList from "@/app/components/gurps/RangedWeaponsList";
import ArmorList from "@/app/components/gurps/ArmorList";

export default function GURPSSheet(params: any) {
    const [syncStatus, setSyncStatus] = useState("syncing");
    const [sheet, setSheet] = useState<RPGSheetGURPSModel>({
        aparar: "",
        aparar_mod: "",
        bloqueio: "",
        bloqueio_mod: "",
        bracos: "",
        cabeca: "",
        desvantagens_e_peculiaridades: [],
        maos: "",
        outros: "",
        pernas: "",
        pes: "",
        reputacao: "",
        status: "",
        tronco: "",
        vantagens_e_qualidades: [],
        base_de_carga_leve: "",
        base_de_carga_media: "",
        base_de_carga_muito_pesada: "",
        base_de_carga_nenhuma: "",
        base_de_carga_pesada: "",
        db_x_0_2: "",
        db_x_0_4: "",
        db_x_0_6: "",
        db_x_0_8: "",
        db_x_1: "",
        esquiva: "",
        esquiva_minus_1: "",
        esquiva_minus_2: "",
        esquiva_minus_3: "",
        esquiva_minus_4: "",
        base_de_carga: "",
        dano_gdp: "",
        geb: "",
        nome: "",
        jogador: "",
        total_de_pontos: "",
        altura: "",
        peso: "",
        mod_tamanho: "",
        idade: "",
        pontos_para_gastar: "",
        aparencia: "",
        st: "",
        st_mod: "",
        dx: "",
        dx_mod: "",
        iq: "",
        iq_mod: "",
        ht: "",
        ht_mod: "",
        pv_1: "",
        pv_2: "",
        pv_mod: "",
        vont: "",
        vont_mod: "",
        per: "",
        per_mod: "",
        pf_1: "",
        pf_2: "",
        pf_mod: "",
        deslocamento_basico: "",
        deslocamento_basico_1: "",
        velocidade_basica_1: "",
        velocidade_basica: ""
    });

    const handleChange =
        (field: keyof RPGSheetGURPSModel) =>
            (value: any) => {

                setSheet((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };

    useEffect(() => {
        console.log(sheet)
    }, [sheet]);

    useEffect(() => {
        const loadFromDatabase = async () => {
            const result = await api.getSheet(params.id);
            console.log("SHEET" + result);
            setSheet(result);
        };
        loadFromDatabase();
    }, []);

    useEffect(() => {
        const saveToDatabase = async () => {
            try {
                setSyncStatus("syncing");
                await api.updateSheet(sheet, params.id);
                setSyncStatus("success");
            } catch {
                setSyncStatus("failed");
            }
        };
        const timeout = setTimeout(saveToDatabase, 500);
        return () => clearTimeout(timeout);
    }, [sheet, params.id]);

    const getSyncStatus = () => {
        switch (syncStatus) {
            case "syncing":
                return (
                    <div className="flex items-center justify-center  gap-2 text-blue-500">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span className="text-2xl">Sincronizando...</span>
                    </div>
                );
            case "success":
                return (
                    <div className="flex items-center justify-center  gap-2 text-green-500">
                        <CheckCircle className="h-4 w-4"/>
                        <span className="text-2xl">Salvo</span>
                    </div>
                );
            case "error":
                return (
                    <Alert variant="destructive" className="p-2">
                        <div className="flex items-center justify-center  gap-2">
                            <XCircle className="h-4 w-4"/>
                            <AlertDescription className="text-2xl">
                                Erro ao salvar
                            </AlertDescription>
                        </div>
                    </Alert>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="w-[840] h-[2000] font-rpg">
            <div className="flex justify-center text-4xl">
                {/* DADOS BASICOS */}
                <CardContent className="flex flex-col ">
                    <div className="flex justify-between">
                        <Label>Nome</Label>
                        <Input className="w-40" onChange={(e) => handleChange("nome")(e.target.value)}
                               value={sheet.nome}></Input>
                        <Label>Jogador</Label>
                        <Input className="w-40" onChange={(e) => handleChange("jogador")(e.target.value)}
                               value={sheet.jogador}></Input>
                        <Label>Total de Pontos</Label>
                        <Input className="w-20" onChange={(e) => handleChange("total_de_pontos")(e.target.value)}
                               value={sheet.total_de_pontos}></Input>
                    </div>
                    <div className="flex justify-between">
                        <Label>Altura</Label>
                        <Input className="w-20" onChange={(e) => handleChange("altura")(e.target.value)}
                               value={sheet.altura}/>
                        <Label>Peso</Label>
                        <Input className="w-20" onChange={(e) => handleChange("peso")(e.target.value)}
                               value={sheet.peso}/>
                        <Label>Mod Tamanho</Label>
                        <Input className="w-20" onChange={(e) => handleChange("mod_tamanho")(e.target.value)}
                               value={sheet.mod_tamanho}/>
                        <Label>Idade</Label>
                        <Input className="w-20" onChange={(e) => handleChange("idade")(e.target.value)}
                               value={sheet.idade}/>
                        <Label>Pontos p/ Gastar</Label>
                        <Input className="w-20" onChange={(e) => handleChange("pontos_para_gastar")(e.target.value)}
                               value={sheet.pontos_para_gastar}/>
                    </div>
                    <Label>Aparencia</Label>
                    <Input className="w-full" onChange={(e) => handleChange("aparencia")(e.target.value)}
                           value={sheet.aparencia}/>
                </CardContent>
            </div>
            <div className="flex">
                <CardContent className="flex flex-col w-full gap-5">
                    <SectionContainer title="Atributos">
                        <div className="flex gap-5">
                            <div>
                                <BaseAttribute name="ST"
                                               quantity="1"
                                               modifier={sheet.st_mod}
                                               values={[sheet.st]}
                                               onValueChange={handleChange}
                                               attributeName="st"/>
                                <BaseAttribute name="DX"
                                               quantity="1"
                                               modifier={sheet.dx_mod}
                                               values={[sheet.dx]}
                                               onValueChange={handleChange}
                                               attributeName="dx"/>
                                <BaseAttribute name="IQ"
                                               quantity="1"
                                               modifier={sheet.iq_mod}
                                               values={[sheet.iq]}
                                               onValueChange={handleChange}
                                               attributeName="iq"/>
                                <BaseAttribute name="HT"
                                               quantity="1"
                                               modifier={sheet.ht_mod}
                                               values={[sheet.ht]}
                                               onValueChange={handleChange}
                                               attributeName="ht"/>
                            </div>
                            <div>
                                <BaseAttribute name="PV"
                                               quantity="2"
                                               modifier={sheet.pv_mod}
                                               values={[sheet.pv_1, sheet.pv_2]}
                                               onValueChange={handleChange}
                                               attributeName="pv"/>
                                <BaseAttribute name="VONT"
                                               quantity="1"
                                               modifier={sheet.vont_mod}
                                               values={[sheet.vont]}
                                               onValueChange={handleChange}
                                               attributeName="vont"/>
                                <BaseAttribute name="PER"
                                               quantity="1"
                                               modifier={sheet.per_mod}
                                               values={[sheet.per]}
                                               onValueChange={handleChange}
                                               attributeName="per"/>
                                <BaseAttribute name="PF"
                                               quantity="2"
                                               modifier={sheet.pf_mod}
                                               values={[sheet.pf_1, sheet.pf_2]}
                                               onValueChange={handleChange}
                                               attributeName="pf"/>
                            </div>
                        </div>
                    </SectionContainer>

                    <SectionContainer title="Outros">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <MiniInput
                                    title="BASE DE CARGA"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.base_de_carga}
                                    onValueChange={handleChange}
                                    fieldName="base_de_carga"
                                />
                                <MiniInput
                                    title="DANO GdP"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.dano_gdp}
                                    onValueChange={handleChange}
                                    fieldName="dano_gdp"
                                />
                            </div>
                            <div className="flex  justify-between">
                                <MiniInput
                                    title="VEL. BÁSICA"
                                    size={10}
                                    quantity={1}
                                    mainValue={sheet.velocidade_basica}
                                    miniValues={[sheet.velocidade_basica_1]}
                                    onValueChange={handleChange}
                                    fieldName="velocidade_basica"
                                />
                                <MiniInput
                                    title="DESL. BÁSICO"
                                    size={10}
                                    quantity={1}
                                    mainValue={sheet.deslocamento_basico}
                                    miniValues={[sheet.deslocamento_basico_1]}
                                    onValueChange={handleChange}
                                    fieldName="deslocamento_basico"
                                />
                            </div>
                        </div>
                    </SectionContainer>

                    <SectionContainer title="Outros 2">
                        <div className="flex-col">
                            <div className="flex justify-between">
                                <div>BASE DE CARGA</div>
                                <div>DESLOCAMENTO</div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <MiniInput
                                        title="Nenhuma (0) = BC"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.base_de_carga_nenhuma}
                                        onValueChange={handleChange}
                                        fieldName="base_de_carga_nenhuma"
                                    />
                                    <MiniInput
                                        title="Leve (1) = 2xBC"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.base_de_carga_leve}
                                        onValueChange={handleChange}
                                        fieldName="base_de_carga_leve"
                                    />
                                    <MiniInput
                                        title="Leve (2) = 3xBC"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.base_de_carga_media}
                                        onValueChange={handleChange}
                                        fieldName="base_de_carga_media"
                                    />
                                    <MiniInput
                                        title="Pesada (3) = 6xBC"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.base_de_carga_pesada}
                                        onValueChange={handleChange}
                                        fieldName="base_de_carga_pesada"
                                    />
                                    <MiniInput
                                        title="Mto Pesada (4) = 10xBC"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.base_de_carga_muito_pesada}
                                        onValueChange={handleChange}
                                        fieldName="base_de_carga_muito_pesada"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <MiniInput
                                        title="DBx1"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.db_x_1}
                                        onValueChange={handleChange}
                                        fieldName="db_x_1"
                                    />
                                    <MiniInput
                                        title="DBx0.8"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.db_x_0_8}
                                        onValueChange={handleChange}
                                        fieldName="db_x_0_8"
                                    />
                                    <MiniInput
                                        title="DBx0.6"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.db_x_0_6}
                                        onValueChange={handleChange}
                                        fieldName="db_x_0_6"
                                    />
                                    <MiniInput
                                        title="DBx0.4"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.db_x_0_4}
                                        onValueChange={handleChange}
                                        fieldName="db_x_0_4"
                                    />
                                    <MiniInput
                                        title="DBx0.2"
                                        size={10}
                                        quantity={0}
                                        mainValue={sheet.db_x_0_2}
                                        onValueChange={handleChange}
                                        fieldName="db_x_0_2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">ESQUIVA</div>
                        <div className="flex flex-col">
                            <MiniInput
                                title="Esquiva"
                                size={10}
                                quantity={0}
                                mainValue={sheet.esquiva}
                                onValueChange={handleChange}
                                fieldName="esquiva"
                            />
                            <MiniInput
                                title="Esquiva -1"
                                size={10}
                                quantity={0}
                                mainValue={sheet.esquiva_minus_1}
                                onValueChange={handleChange}
                                fieldName="esquiva_minus_1"
                            />
                            <MiniInput
                                title="Esquiva -2"
                                size={10}
                                quantity={0}
                                mainValue={sheet.esquiva_minus_2}
                                onValueChange={handleChange}
                                fieldName="esquiva_minus_2"
                            />
                            <MiniInput
                                title="Esquiva -3"
                                size={10}
                                quantity={0}
                                mainValue={sheet.esquiva_minus_3}
                                onValueChange={handleChange}
                                fieldName="esquiva_minus_3"
                            />
                            <MiniInput
                                title="Esquiva -4"
                                size={10}
                                quantity={0}
                                mainValue={sheet.esquiva_minus_4}
                                onValueChange={handleChange}
                                fieldName="esquiva_minus_4"
                            />
                        </div>
                    </SectionContainer>
                    <SectionContainer title={"Vantagens e Qualidades"}>
                        <AdvantageList value={sheet.vantagens_e_qualidades}
                                       fieldName="vantagens_e_qualidades"
                                       onValueChange={handleChange}/>
                    </SectionContainer>
                    <SectionContainer title={"Desvantagens e Peculiariadades"}>
                        <AdvantageList value={sheet.desvantagens_e_peculiaridades}
                                       fieldName="desvantagens_e_peculiaridades"
                                       onValueChange={handleChange}/>
                    </SectionContainer>
                </CardContent>
                <CardContent className="flex flex-col w-full gap-5">
                    <SectionContainer title="Linguas">
                        <LanguageList value={sheet.languages}
                                      fieldName="languages"
                                      onValueChange={handleChange}/>
                    </SectionContainer>
                    <div className={"flex"}>
                        <div className="w-6/12">
                            <SectionContainer title="RD">
                                <MiniInput
                                    title="Cabeça"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.cabeca}
                                    onValueChange={handleChange}
                                    fieldName="cabeca"
                                />
                                <MiniInput
                                    title="Tronco"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.tronco}
                                    onValueChange={handleChange}
                                    fieldName="tronco"
                                />
                                <MiniInput
                                    title="Bracos"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.bracos}
                                    onValueChange={handleChange}
                                    fieldName="bracos"
                                />
                                <MiniInput
                                    title="Mãos"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.maos}
                                    onValueChange={handleChange}
                                    fieldName="maos"
                                />
                                <MiniInput
                                    title="Pernas"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.pernas}
                                    onValueChange={handleChange}
                                    fieldName="pernas"
                                />
                                <MiniInput
                                    title="Pés"
                                    size={10}
                                    quantity={0}
                                    mainValue={sheet.pes}
                                    onValueChange={handleChange}
                                    fieldName="pes"
                                />
                            </SectionContainer>
                        </div>
                        <SectionContainer title="Familiaridades Culturais">
                            <CultureList></CultureList>
                        </SectionContainer>
                    </div>
                    <div className="flex w-full gap-5">
                        <div>
                            <SectionContainer title={"Aparar"}>
                                <div className="flex flex-col justify-center items-center">
                                    <input className={'text-center text-2xl items-center w-15 h-13'}
                                           onChange={(e) => handleChange("aparar")(e.target.value)}
                                           value={sheet.aparar}></input>
                                    <input className={'text-center  items-center w-15 h-5'}
                                           onChange={(e) => handleChange("aparar_mod")(e.target.value)}
                                           value={sheet.aparar_mod}></input>
                                </div>
                            </SectionContainer>
                            <SectionContainer title={"Bloqueio"}>
                                <div className="flex flex-col justify-center items-center">
                                    <input className={'text-center text-2xl items-center w-15 h-13'}
                                           onChange={(e) => handleChange("bloqueio")(e.target.value)}
                                           value={sheet.bloqueio}></input>
                                    <input className={'text-center  items-center w-15 h-5'}
                                           onChange={(e) => handleChange("bloqueio_mod")(e.target.value)}
                                           value={sheet.bloqueio_mod}></input>
                                </div>
                            </SectionContainer>
                        </div>
                        <SectionContainer title={"Modificadores de Reação"}>
                            <MiniInput
                                title="Aparência"
                                size={10}
                                quantity={0}
                                mainValue={sheet.aparencia}
                                onValueChange={handleChange}
                                fieldName="aparencia"
                            />
                            <MiniInput
                                title="Status"
                                size={10}
                                quantity={0}
                                mainValue={sheet.status}
                                onValueChange={handleChange}
                                fieldName="status"
                            />
                            <MiniInput
                                title="Reputação"
                                size={10}
                                quantity={0}
                                mainValue={sheet.reputacao}
                                onValueChange={handleChange}
                                fieldName="reputacao"
                            />
                            <MiniInput
                                title="Outros"
                                size={10}
                                quantity={0}
                                mainValue={sheet.outros}
                                onValueChange={handleChange}
                                fieldName="outros"
                            />
                        </SectionContainer>
                    </div>
                    <SectionContainer title={"Perícias"}>
                        <PericiaList></PericiaList>
                    </SectionContainer>

                </CardContent>
            </div>
            <div className={"flex flex-col p-6 gap-5"}>
                <SectionContainer title={"Armas de Combate Corpo-a-Corpo"}>
                    <WeaponsList value={sheet.weapons}
                                 fieldName="weapons"
                                 onValueChange={handleChange}/>

                </SectionContainer>
                <SectionContainer title={"Armas de Combate à Distância"}>
                    <RangedWeaponsList value={sheet.ranged_weapons}
                                       fieldName="ranged_weapons"
                                       onValueChange={handleChange}/>
                </SectionContainer>
                <SectionContainer title={"Armaduras & Posses"}>
                    <ArmorList value={sheet.armor}
                               fieldName="armor"
                               onValueChange={handleChange}/>
                </SectionContainer>
            </div>
        </Card>
    );
}
